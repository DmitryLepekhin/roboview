/**
 * RL2 RL2Robot data structure
 */
export class RL2Robot {
  componentType: string;
  type: StepType;
  name: string;
  comment: string;
  contents?: RL2Robot[];
  id?: id; // for RL2 id is generated automatically
  // links?: Link[];
  parent?: RL2Robot; // back reference to the parent, it is generated
}

/**
 * RL1 RL2Robot representation consists of a set of blocks,
 * each block corresponds to a linear sequence of steps.
 * Steps like Branch or Loop contains links to other branches.
 *
 */
class ViewDescription {
  componentType: string;
  type: StepType;
  name: string;
  comment: string;
  id: id;
}
export class ViewBlock extends ViewDescription {
  steps: ViewStep[];
  path?: string; // path to root for RL2 robots
  parent?: number; // for RL2 ViewBlock has not more than one parent, it is possible to generate a link to the parent step
  endId?: number; // id of the step after the block
  refs?: Link[];
}
export class ViewStep extends ViewDescription {
  links?: Link[];
//  refs?: ViewStep[]; // array of steps that reference to this step
  hasChildren: boolean;
  blockId?: number;
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
  FINAL_BLOCK = 'Final block',

  BRANCH = 'Branch Point',
  JOINT_POINT = 'Joint point',

  SNIPPET = 'Snippet',
  DO_NOTHING = 'Do Nothing'
}

export enum BlockType {
  BODY = 'Body'
}


// RL1 data structures

export type id = number;

export class Step {
  id: id;
  stepType: StepType;
  stepName?: string;
  comment?: string;
  snippetName?: string;
  links: number[];
}

export class Branch {
  id: id;
  startId: id;
  endId: id;
  index: number;
  steps: Step[];
}

export class Block {
  id: id;
  blockType: BlockType;
  blockName: string;
  branches: Branch[];
}

export class RL1Robot {
  comment: string;
  blocks: Block[];
}

export function isRL1(object): boolean {
  return object.hasOwnProperty('blocks');
}

export class Link {
  id: number;
  name?: string;
}
