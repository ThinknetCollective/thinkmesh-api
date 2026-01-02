import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IslamicMetrics } from './entities/islamic-metrics.entity';
import { CreateMetricsDto } from './dto/create-metrics.dto';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
interface MetricsResponse {
  maslaha?: number;
  adalah?: number;
  ihsan?: number;
  amanah?: number;
  dhararPrevention?: number;
  aiExplanation?: string;
}

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);
  private openaiApiKey: string;

  constructor(
    @InjectRepository(IslamicMetrics)
    private metricsRepository: Repository<IslamicMetrics>,
    private configService: ConfigService,
  ) {
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
  }

  /**
   * Calculate Islamic metrics for a solution using AI
   */
  async calculateMetrics(
    solutionText: string,
    problemContext: string,
  ): Promise<CreateMetricsDto> {
    if (!this.openaiApiKey) {
      this.logger.warn('OpenAI API key not configured, using fallback scoring');
      return this.fallbackScoring(solutionText, problemContext);
    }

    try {
      const metrics = await this.aiScoring(solutionText, problemContext);
      return metrics;
    } catch (error) {
      this.logger.error('AI scoring failed, using fallback:', error);
      return this.fallbackScoring(solutionText, problemContext);
    }
  }

  /**
   * AI-powered Islamic metrics scoring using GPT-4
   */
  private async aiScoring(
    solutionText: string,
    problemContext: string,
  ): Promise<CreateMetricsDto> {
    const prompt = `
As an Islamic ethics expert, evaluate this solution using Islamic principles.

PROBLEM: ${problemContext}
SOLUTION: ${solutionText}

Rate each metric (be strict but fair):

1. MASLAHA (Public Benefit): 0-25 points
   - Does it benefit society?
   - How many people does it help?
   - Is the benefit clear and measurable?

2. ADALAH (Justice/Fairness): 0-25 points
   - Is it fair to all parties?
   - Does it reduce inequality?
   - Does it promote justice?

3. IHSAN (Excellence): 0-25 points
   - Is it well-thought-out?
   - Is it innovative?
   - Does it go beyond minimum requirements?

4. AMANAH (Trustworthiness): 0-25 points
   - Is it honest and transparent?
   - Can we trust it will work?
   - Are there any deceptive elements?

5. DHARAR (Harm Prevention): -50 to 0 points
   - Could it cause harm?
   - What are the risks?
   - Are there unintended consequences?
   - (Give negative points for potential harm)

Return ONLY valid JSON (no markdown, no explanation):
{
  "maslaha": 0-25,
  "adalah": 0-25,
  "ihsan": 0-25,
  "amanah": 0-25,
  "dhararPrevention": -50 to 0,
  "aiExplanation": "2-3 sentences explaining the overall assessment"
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are an Islamic ethics expert who evaluates solutions using Islamic principles. Always return valid JSON.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });
    const data = (await response.json()) as OpenAIResponse;
    const content: string = data.choices[0]?.message?.content || '{}';

    // Clean up response
    const cleanContent: string = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const metrics = JSON.parse(cleanContent) as MetricsResponse;

    return {
      maslaha: Math.min(25, Math.max(0, metrics.maslaha ?? 0)),
      adalah: Math.min(25, Math.max(0, metrics.adalah ?? 0)),
      ihsan: Math.min(25, Math.max(0, metrics.ihsan ?? 0)),
      amanah: Math.min(25, Math.max(0, metrics.amanah ?? 0)),
      dhararPrevention: Math.min(
        0,
        Math.max(-50, metrics.dhararPrevention ?? 0),
      ),
      aiExplanation: metrics.aiExplanation ?? 'AI scoring completed',
    };
  }
  /**
   * Fallback scoring when AI is unavailable
   */
  private fallbackScoring(
    solutionText: string,
    problemContext: string,
  ): CreateMetricsDto {
    const text = `${solutionText} ${problemContext}`.toLowerCase();

    // Simple keyword-based scoring
    let maslaha = 10;
    let adalah = 10;
    let ihsan = 10;
    let amanah = 10;
    let dhararPrevention = 0;

    // Positive keywords for each metric
    const benefitWords = [
      'help',
      'benefit',
      'improve',
      'support',
      'assist',
      'people',
    ];
    const justiceWords = ['fair', 'equal', 'justice', 'equitable', 'inclusive'];
    const excellenceWords = [
      'innovative',
      'excellent',
      'quality',
      'best',
      'optimize',
    ];
    const trustWords = [
      'transparent',
      'honest',
      'reliable',
      'proven',
      'tested',
    ];
    const harmWords = [
      'risk',
      'danger',
      'harm',
      'damage',
      'negative',
      'problem',
    ];

    // Count keyword matches
    benefitWords.forEach((word) => {
      if (text.includes(word)) maslaha += 3;
    });
    justiceWords.forEach((word) => {
      if (text.includes(word)) adalah += 3;
    });
    excellenceWords.forEach((word) => {
      if (text.includes(word)) ihsan += 3;
    });
    trustWords.forEach((word) => {
      if (text.includes(word)) amanah += 3;
    });
    harmWords.forEach((word) => {
      if (text.includes(word)) dhararPrevention -= 5;
    });

    // Cap values
    maslaha = Math.min(25, maslaha);
    adalah = Math.min(25, adalah);
    ihsan = Math.min(25, ihsan);
    amanah = Math.min(25, amanah);
    dhararPrevention = Math.max(-50, dhararPrevention);

    return {
      maslaha,
      adalah,
      ihsan,
      amanah,
      dhararPrevention,
      aiExplanation: 'Scored using fallback keyword-based algorithm',
    };
  }

  /**
   * Create and save Islamic metrics
   */
  async create(createMetricsDto: CreateMetricsDto): Promise<IslamicMetrics> {
    // Calculate overall score
    const overallScore =
      createMetricsDto.maslaha +
      createMetricsDto.adalah +
      createMetricsDto.ihsan +
      createMetricsDto.amanah +
      createMetricsDto.dhararPrevention;

    const metrics = this.metricsRepository.create({
      ...createMetricsDto,
      overallScore,
    });

    return this.metricsRepository.save(metrics);
  }

  /**
   * Get metrics by ID
   */
  async findOne(id: number): Promise<IslamicMetrics | null> {
    return this.metricsRepository.findOne({ where: { id } });
  }

  /**
   * Calculate overall score
   */
  calculateOverallScore(metrics: CreateMetricsDto): number {
    return (
      metrics.maslaha +
      metrics.adalah +
      metrics.ihsan +
      metrics.amanah +
      metrics.dhararPrevention
    );
  }
}
