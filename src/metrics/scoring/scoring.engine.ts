import { KEYWORDS, SCORING_LIMITS, ANTI_GAMING } from './scoring.spec';
import { CreateMetricsDto } from '../dto/create-metrics.dto';

export function ruleBasedScore(
  solutionText: string,
  problemContext: string,
): CreateMetricsDto {
  const text = `${solutionText} ${problemContext}`.toLowerCase();
  const length = solutionText.length;

  let maslaha = 10;
  let adalah = 10;
  let ihsan = 10;
  let amanah = 10;
  let dhararPrevention = 0;

  const countHits = (words: string[]) =>
    words.filter((w) => text.includes(w)).length;

  maslaha += countHits(KEYWORDS.maslaha) * 3;
  adalah += countHits(KEYWORDS.adalah) * 3;
  ihsan += countHits(KEYWORDS.ihsan) * 3;
  amanah += countHits(KEYWORDS.amanah) * 3;
  dhararPrevention -= countHits(KEYWORDS.harm) * 5;

  // 🔒 Anti-gaming rules
  if (length < ANTI_GAMING.MIN_LENGTH) {
    ihsan = Math.min(ihsan, ANTI_GAMING.SHORT_TEXT_IHSAN_CAP);
  }

  // Only penalize if solution is risky but doesn't acknowledge it
  if (
    text.includes('force') ||
    text.includes('mandatory') ||
    text.includes('ban')
  ) {
    // Authoritarian solution without mentioning harm
    if (!KEYWORDS.harm.some((w) => text.includes(w))) {
      dhararPrevention -= 15; // Now it makes sense
    }
  }

  // 🔐 Hard caps
  maslaha = clamp(maslaha, 0, SCORING_LIMITS.MAX);
  adalah = clamp(adalah, 0, SCORING_LIMITS.MAX);
  ihsan = clamp(ihsan, 0, SCORING_LIMITS.MAX);
  amanah = clamp(amanah, 0, SCORING_LIMITS.MAX);
  dhararPrevention = clamp(dhararPrevention, SCORING_LIMITS.DHARAR_MIN, 0);

  return {
    maslaha,
    adalah,
    ihsan,
    amanah,
    dhararPrevention,
    aiExplanation: 'Scored using ThinkMesh ethical ruleset v1.0',
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
