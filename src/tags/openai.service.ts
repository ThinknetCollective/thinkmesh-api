import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);
  private openai: OpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
    } else {
      this.logger.warn(
        'OpenAI API key not found. Tag suggestions will use fallback method.',
      );
    }
  }

  async suggestTags(title: string, description: string): Promise<string[]> {
    if (!this.openai) {
      return this.getFallbackTags(title, description);
    }

    try {
      const prompt = `
        Given this problem/issue title and description, suggest 5-8 relevant tags that would help categorize and make it discoverable:
        
        Title: "${title}"
        Description: "${description}"
        
        Please provide tags that are:
        1. Relevant to the content
        2. Commonly used in tech/problem-solving contexts
        3. Specific enough to be useful for filtering
        4. General enough to be reusable
        
        Return only the tags as a comma-separated list, no explanations:
      `;

      const completion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content?.trim();
      if (response) {
        return response
          .split(',')
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag.length > 0 && tag.length <= 30)
          .slice(0, 8); // Limit to 8 tags
      }
    } catch (error) {
      this.logger.error('OpenAI API error:', error);
    }

    return this.getFallbackTags(title, description);
  }

  private getFallbackTags(title: string, description: string): string[] {
    const text = `${title} ${description}`.toLowerCase();
    const fallbackTags: string[] = [];

    // Technology-related keywords
    const techKeywords = {
      web: ['web', 'website', 'browser', 'frontend', 'backend'],
      mobile: ['mobile', 'app', 'android', 'ios', 'smartphone'],
      ai: [
        'ai',
        'artificial intelligence',
        'machine learning',
        'neural',
        'deep learning',
      ],
      data: ['data', 'database', 'analytics', 'big data', 'statistics'],
      cloud: ['cloud', 'aws', 'azure', 'docker', 'kubernetes'],
      security: ['security', 'encryption', 'authentication', 'cybersecurity'],
      api: ['api', 'rest', 'graphql', 'microservices'],
      javascript: ['javascript', 'js', 'node', 'react', 'vue'],
      python: ['python', 'django', 'flask', 'pandas'],
      performance: ['performance', 'optimization', 'speed', 'efficiency'],
    };

    // Problem categories
    const categoryKeywords = {
      environment: [
        'climate',
        'environment',
        'sustainability',
        'green',
        'carbon',
      ],
      healthcare: ['health', 'medical', 'wellness', 'disease', 'treatment'],
      education: ['education', 'learning', 'teaching', 'school', 'university'],
      finance: ['finance', 'money', 'payment', 'banking', 'investment'],
      social: ['social', 'community', 'society', 'people', 'collaboration'],
      governance: ['government', 'policy', 'law', 'regulation', 'public'],
    };

    // Check for technology tags
    for (const [tag, keywords] of Object.entries(techKeywords)) {
      if (keywords.some((keyword) => text.includes(keyword))) {
        fallbackTags.push(tag);
      }
    }

    // Check for category tags
    for (const [tag, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => text.includes(keyword))) {
        fallbackTags.push(tag);
      }
    }

    // Add some general tags based on common words
    if (
      text.includes('problem') ||
      text.includes('issue') ||
      text.includes('challenge')
    ) {
      fallbackTags.push('problem-solving');
    }
    if (
      text.includes('solution') ||
      text.includes('fix') ||
      text.includes('resolve')
    ) {
      fallbackTags.push('solution');
    }
    if (
      text.includes('new') ||
      text.includes('innovation') ||
      text.includes('creative')
    ) {
      fallbackTags.push('innovation');
    }

    // Ensure we have at least a few tags
    if (fallbackTags.length === 0) {
      fallbackTags.push('general', 'discussion');
    }

    return fallbackTags.slice(0, 6); // Limit to 6 tags for fallback
  }
}
