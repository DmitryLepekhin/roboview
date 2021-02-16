import {Injectable} from '@angular/core';
import {ViewBlock, ViewStep} from '@app/core/structs';
import {ViewportScroller} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DocNavigationService {

  source: ViewBlock;
  destination: ViewBlock;

  constructor(
    private viewportScroller: ViewportScroller
  ) { }

  jumpToHeader(source: ViewBlock, destination: ViewStep): void {
    this.destination = undefined;
    this.viewportScroller.scrollToAnchor('' + destination.id);
  }

  jumpToHeaderById(id: number): void {
    this.destination = undefined;
    this.viewportScroller.scrollToAnchor('' + id);
  }

  jumpToNode(destination: ViewBlock): void {
    this.destination = destination;
    if (this.destination.parent) {
      this.viewportScroller.scrollToAnchor('' + destination.parent);
    }
  }

  jumpToReference(refId: number): void {
    this.viewportScroller.scrollToAnchor('' + refId);
  }
}
