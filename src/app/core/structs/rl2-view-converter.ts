import {RL2Robot, ViewBlock} from '@app/core/structs/robot';

/**
 * Converter from RL2 robot to an array of ViewBlocks
 */
export function convertRL2View(robot: RL2Robot): ViewBlock[] {
  const result: ViewBlock[] = [];
  let counter = 1;
  // generate id to each robot
  bfs(robot, r => {
    if (r) {
      r.id = counter++;
    }
  });
  // generate reference to a parent
  bfs(robot, r => {
    if (r) {
      r.contents?.forEach(child => child.parent = r);
    }
  });
  // convert to ViewBlocks
  bfs(robot, r => {
    if (r) {
      // create a new ViewBlock
      const viewBlock: ViewBlock = {...r, id: r.id, steps: [], path: generatePath(r), parent: r.parent?.id};
      if (r.contents) {
        viewBlock.steps = r.contents.map(rb => ({...rb, id: rb.id, hasChildren: rb.contents?.length > 0}));
      }
      result.push(viewBlock);
    }
  });
  return result;
}

/**
 * Path from this node (robot) to the root of the tree in a form: "root / node_name/ ... / node_name / node_name".
 */
function generatePath(robot: RL2Robot): string {
  const path = [];
  for (let nodeParent: RL2Robot = robot; nodeParent; nodeParent = nodeParent.parent) {
    path.push(nodeParent.name);
  }
  return  path.reverse().reduce( (left, right) => left + ' / ' + right );
}

export function bfs(robot: RL2Robot, func?: (r: RL2Robot) => void): void {
  const queue: RL2Robot[] = [];
  queue.push(robot);
  while (queue.length > 0) {
    const blockRobot = queue.shift();
    blockRobot.contents?.forEach(r => queue.push(r));
    func.apply(null, [blockRobot]);
  }
}
