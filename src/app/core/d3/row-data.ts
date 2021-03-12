import {DrawStep} from '@app/core/d3/draw-step';

// It is a helper class for drawing steps in several rows.
// The class keeps the previously drawn node
// and height of the row outgoing links.
// The next node can calculate its position based on the information.
export class RowData {

  private node0: DrawStep;
  set node(value: DrawStep) {
    this.node0 = value;
    if (value.viewStep.links) {
      this.outLinksCount = Math.max(this.outLinksCount, value.viewStep.links.length);
    }
  }
  get node(): DrawStep {
    return this.node0;
  }

  public outLinksCount = 0;

  public reset(): void {
    // this.node0 = undefined;
    this.outLinksCount = 0;
  }
}
