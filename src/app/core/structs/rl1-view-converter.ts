import {Branch, Link, RL1Robot, Step, StepType, ViewBlock, ViewStep} from '@app/core/structs/robot';

/**
 * Convert RL2 robot read from json to an array of ViewBlocks for visual representation
 */
export function convertRL1View(rl1Robot: RL1Robot): ViewBlock[] {
  const result: ViewBlock[] = [];
  // all branches in the initial json file
  const branches: Branch[] = flatMap(rl1Robot.blocks.map(block => block.branches));
  // map: step id -> block id, it will be used for backward links creation
  const allStepsBlocks = {};
  branches.forEach(branch => {
    const viewBlock: ViewBlock = createViewBlock(branch);
    branch.steps.forEach(step => {
      const viewStep: ViewStep = createViewStep(step);
      viewBlock.steps.push(viewStep);
      // maintain a map: step id -> block id
      allStepsBlocks['' + viewStep.id] = viewBlock.id;
    });
    result.push(viewBlock);
  });

  // add reference to other branch in form of an additional step if needed
  result.filter(block => block.endId > 0).filter(block => !lastStepIsBranch(block)).forEach(block => {
    const link = new Link();
    link.id = allStepsBlocks['' + block.endId];
    const jointStep = new ViewStep();
    jointStep.blockId = block.id;
    jointStep.id = -1;
    jointStep.componentType = 'Joint point';
    jointStep.type = StepType.JOINT_POINT;
    jointStep.name = 'continue @' + link.id;
    jointStep.comment = '';
    jointStep.links = [link];
    block.steps.push(jointStep);

    // add backward links
    const parentBlock: ViewBlock = result.filter(b => b.id === allStepsBlocks['' + block.endId])[0];
    if (parentBlock) {
      const backLink = new Link();
      backLink.id = block.id;
      parentBlock.refs.push(backLink);
    }
  });

  return result;
}


function createViewBlock(branch: Branch): ViewBlock {
  const viewBlock: ViewBlock = {
    componentType: 'branch',
    type: StepType.ROBOT,
    name: branch.id + '',
    comment: '',
    id: branch.id,
    steps: [],
    endId: branch.endId,
    refs: []
  };
  return viewBlock;
}

function createViewStep(step: Step): ViewStep {
  const viewStep: ViewStep = {
    componentType: 'step',
    type: step.stepType,
    name: step.snippetName || step.stepName,
    comment: step.comment || '',
    id: step.id,
    links: [],
    hasChildren: false,
  };
  step.links?.forEach(link => viewStep.links.push({id: link}));
  viewStep.hasChildren = viewStep.links?.length > 0;
  return viewStep;
}

/**
 * Returns true if the last step in the ViewBlock contains references to other branches.
 * It is useful for branches that have endId > 0 (a reference to other branch)
 * and the last step already contains the reference. In this case it is not necessary to
 * visualize the reference additionally.
 */
function lastStepIsBranch(block: ViewBlock): boolean {
  if (block.steps.length > 0) {
    const step = block.steps[block.steps.length - 1];
    return step.links && step.links.length > 0;
  }
  return false;
}

function flatMap<T>(arrayOfArrays: T[][]): T[] {
  return arrayOfArrays.reduce((acc, val) => acc.concat(val), []);
}

