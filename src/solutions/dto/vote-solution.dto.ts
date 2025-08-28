import { IsNotEmpty, IsEnum } from 'class-validator';

export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export class VoteSolutionDto {
  @IsNotEmpty()
  @IsEnum(VoteType)
  vote: VoteType;
}
