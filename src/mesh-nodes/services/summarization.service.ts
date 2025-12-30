import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MeshNode } from '../entities/mesh-node.entity';

@Injectable()
export class SummarizationService {
  private readonly logger = new Logger(SummarizationService.name);
  private openaiApiKey: string;

  constructor(
    @InjectRepository(MeshNode)
    private meshNodeRepository: Repository<MeshNode>,
    private configService: ConfigService,
  ) {
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
  }

  async summarizeTexts(texts: string[]): Promise<string> {
    if (!this.openaiApiKey) {
      this.logger.warn(
        'OpenAI API key not configured, using fallback summarization',
      );
      return this.fallbackSummarization(texts);
    }

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful assistant that summarizes discussion solutions. Create concise, actionable summaries that capture key points and solutions.',
              },
              {
                role: 'user',
                content: `Please summarize these discussion solutions:\n\n${texts.join('\n\n---\n\n')}`,
              },
            ],
            max_tokens: 500,
            temperature: 0.3,
          }),
        },
      );

      const data = await response.json();
      return (
        data.choices[0]?.message?.content || this.fallbackSummarization(texts)
      );
    } catch (error) {
      this.logger.error('OpenAI summarization failed:', error);
      return this.fallbackSummarization(texts);
    }
  }

  private fallbackSummarization(texts: string[]): string {
    const combinedText = texts.join(' ');
    const sentences = combinedText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 10);

    // Simple extractive summarization - take first few sentences and key phrases
    const summary = sentences.slice(0, 3).join('. ') + '.';
    return summary.length > 20
      ? summary
      : 'Multiple solutions discussed in this thread.';
  }

  async createSummaryForNode(
    nodeId: number,
    solutionTexts: string[],
  ): Promise<string> {
    const summary = await this.summarizeTexts(solutionTexts);

    await this.meshNodeRepository.update(nodeId, {
      summary,
    });

    return summary;
  }

  @Cron(CronExpression.EVERY_3_HOURS)
  async updateAllSummaries() {
    this.logger.log('Starting scheduled summary updates...');

    const nodes = await this.meshNodeRepository.find();

    for (const node of nodes) {
      try {
        if (
          node.solutions &&
          Array.isArray(node.solutions) &&
          node.solutions.length > 0
        ) {
          // If solutions are entities, extract their content/text property
          const solutionTexts = node.solutions.map(
            (s: any) => s.content || s.text || s.toString(),
          );
          if (solutionTexts.length > 0) {
            await this.createSummaryForNode(node.id, solutionTexts);
            this.logger.log(`Updated summary for node ${node.id}`);
          }
        }
      } catch (error) {
        this.logger.error(
          `Failed to update summary for node ${node.id}:`,
          error,
        );
      }
    }

    this.logger.log('Completed scheduled summary updates');
  }

  async getSummary(nodeId: number): Promise<string | null> {
    const node = await this.meshNodeRepository.findOne({
      where: { id: nodeId },
    });
    return node?.summary || null;
  }
}
