/**
 * RL2 Robot data structure
 */
export class Robot {
  componentType: string;
  type: StepType;
  name: string;
  comment: string;
  contents?: Robot[];
}

export enum StepType {
  ROBOT= 'robot',
  ASSIGN = 'Assign',
  LOOP = 'Loop',
  GUARDED_CHOICE = 'Guarded Choice',
  GUARDED_BRANCH = 'Guarded branch',
  TRY_CATCH = 'Try-Catch',
  CATCH_BRANCH = 'Catch branch',
  RETURN = 'Return',
  FOR_EACH_LOOP = 'For Each Loop',
  MAIN_BLOCK = 'Main block',
  FINAL_BLOCK = 'Final block'
}
