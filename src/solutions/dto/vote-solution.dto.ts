import { IsIn } from 'class-validator';

export class VoteSolutionDto {
  @IsIn(['upvote', 'downvote'])
  voteType: 'upvote' | 'downvote';
}
