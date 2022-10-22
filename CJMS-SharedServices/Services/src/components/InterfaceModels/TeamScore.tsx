export interface ITeamScoresheet {
  // Header data
  // team_id: string;
  // team_number: string;
  tournament_id: string;
  round: number;

  // Answers
  answers: {
    id: string;
    answer: string;
  }[];
  private_comment: string;
  public_comment: string;
}

export type ITeamScoreGet = {
  compete_id: string;
  user_id: string;
  round: number;

  answers: {
    id: string;
    answer: string;
  }[];

  public_comment: string;
  private_comment: string;
  timestamp: Date;
}

export interface ITeamScore {
  // TMS Specific data
  gp: string;
  referee: string;
  no_show: boolean;
  score: number;

  // Generalized Scoresheet
  valid_scoresheet: boolean;
  scoresheet: ITeamScoresheet;
}

export function initITeamScore(instance?:ITeamScore) {
  const defaults:ITeamScore = {
    gp: '',
    referee: '',
    no_show: false,
    score: 0,

    valid_scoresheet: false,
    scoresheet: {
      // team_id: '',
      tournament_id: '',
      round: 0,

      answers: [],
      private_comment: '',
      public_comment: ''
    }
  }

  return {
    ...defaults,
    ...instance
  }
}