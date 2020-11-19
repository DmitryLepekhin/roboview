import {Robot} from '@app/core/structs/robot';

let counter = 0;

export class RobotNode extends Robot {
  id: number; // some unique id
  elements: RobotNode[];
  parent: RobotNode;
}

/**
 * Recursively build a tree of RobotNodes
 *
 * @param element the Robot that will be wrapped to RobotNode, it is starting point to next recursive invocations.
 * @param parentLevel the parent RobotNode if exists
 */
export function createTreeOfRobotNodes(element: Robot, parentLevel?: RobotNode): RobotNode {
  if (!parentLevel) {
    counter = 0;
  }

  const result: RobotNode = {...element, elements: [], id: counter++, parent: parentLevel};

  if (element.contents) {
    result.elements = [...element.contents.map(robot => createTreeOfRobotNodes(robot, result))];
  } else {
    result.elements = [];
  }
  return result;
}

export function getPath(node: RobotNode): string {
  if (!node) {
    return '';
  }
  const path = [];
  for (let nodeParent: RobotNode = node; nodeParent; nodeParent = nodeParent.parent) {
    path.push(nodeParent.name);
  }
  const result = path.reverse().reduce( (left, right) => left + ' / ' + right );
  return result;
}
