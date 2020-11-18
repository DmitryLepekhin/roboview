/**
 * RL2 Robot data structure
 */
export class Robot {
  componentType: string;
  type: 'robot' | 'Assign' | 'Loop' | 'Guarded Choice' | 'Guarded branch' | 'Try-Catch' | 'Catch branch' | 'Return';
  name: string;
  comment: string;
  contents?: Robot[];
}
