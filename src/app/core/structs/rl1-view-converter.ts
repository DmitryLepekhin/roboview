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
  const allBlocksMap = {};
  branches.forEach(branch => {
    const viewBlock: ViewBlock = createViewBlock(branch);
    branch.steps.forEach(step => {
      const viewStep: ViewStep = createViewStep(step);
      viewBlock.steps.push(viewStep);
      // maintain a map: step id -> block id
      allStepsBlocks['' + viewStep.id] = viewBlock.id;
    });
    result.push(viewBlock);
    allBlocksMap['' + viewBlock.id] = viewBlock;
  });

  // add references to other branches
  result.forEach(block => {

    // collect array of id of blocks that are referenced by this block, it can be links from the block steps or endId
    let outgoingBranchIds = flatMap(block.steps.map(step => step.links)).map(link => link.id).filter(id => id > 0);

    if (block.endId > 0) {
      // addLinkByEndId(block);
      outgoingBranchIds.push(allStepsBlocks['' + block.endId]);
    }

    // remove duplicates
    outgoingBranchIds = [...new Set(outgoingBranchIds)];

    outgoingBranchIds.map(id => allBlocksMap['' + id]).filter(parentBlock => !!parentBlock).forEach(parentBlock => {
        const backLink = new Link();
        backLink.id = block.id;
        parentBlock.refs.push(backLink);
    });

    // add outgoing reference by block.endId to this block also
    // the block.endId be transformed to an additional link for the last step in this branch
    if (block.endId > 0 && block.steps.length) {
      // block.endId points to a step, we need block id here
      const nextBlockId = allStepsBlocks['' + block.endId];
      // the step that will acquire a new link:
      const lastStep = block.steps[block.steps.length - 1];
      const alreadyHasTheLink = lastStep.links.some(link => link.id === nextBlockId);
      if (!alreadyHasTheLink) {
        const newLink = new Link();
        newLink.id = nextBlockId;
        lastStep.links.push(newLink);
      }
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

function flatMap<T>(arrayOfArrays: T[][]): T[] {
  return arrayOfArrays.reduce((acc, val) => acc.concat(val), []);
}

