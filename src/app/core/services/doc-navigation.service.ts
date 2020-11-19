import { Injectable } from '@angular/core';
import {RobotNode} from '@app/core/structs';
import {ViewportScroller} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DocNavigationService {

  source: RobotNode;
  destination: RobotNode;

  constructor(
    private viewportScroller: ViewportScroller
  ) { }

  jumpToHeader(source: RobotNode, destination: RobotNode): void {
    this.destination = destination;
    this.viewportScroller.scrollToAnchor('' + destination.id);
  }

  jumpToNode(destination: RobotNode): void {
    this.destination = destination;
    if (this.destination.parent) {
      this.viewportScroller.scrollToAnchor('' + destination.parent.id);
    }
  }
}
