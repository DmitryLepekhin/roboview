import {ViewStep} from '@app/core/structs';
import {Point} from '@app/core/d3/point';
import {DrawEdge} from '@app/core/d3/draw-edge';

export class DrawStep {

  private groupElement;
  private circle;

  public id;

  cx = 25;
  cy = 25;
  r = 20;
  fontSize = this.r * 0.75;
  textLength = 2 * this.r * 0.5;
  gap = this.r * 2 + 25;
  text;

  public highlightCallback = (id: number) => {};

  constructor(public viewStep: ViewStep,
              private order: number = 0,
              private scale = 1) {
    this.gap *= scale;

    this.cx += this.gap * order;
    this.cx *= scale;

    this.cy *= scale;

    this.r *= scale;
    this.fontSize *= scale;
    this.textLength *= scale;
    this.text = '' + viewStep.id;

    this.id = viewStep.id;
  }

  public draw(svg): void {
    this.groupElement = svg.append('g');

    this.circle = this.groupElement.append('circle')
      .attr('cx', this.cx)
      .attr('cy', this.cy)
      .attr('r', this.r)
      .attr('stroke', 'black')
      .attr('fill', 'white')
    ;

    this.groupElement
      .on('mouseover', () => this.highlight(true))
      .on('mouseout', () => this.highlight(false))
      .on('mouseup', () => {
        console.log('jump to description');
        this.circle.attr('stroke-width', '1px');
      })
      .on('mousedown', () => this.circle.attr('stroke-width', '2px'));

    this.groupElement.append('text')
      .attr('dy', this.cy + this.fontSize / 4)
      .attr('dx', this.cx - this.r * 0.75)
      .attr('dx', this.cx - this.textLength / 2)
      .attr('font-size', this.fontSize)
      .attr('font-weight', 'bold')
      .attr('font-family', 'monospace')
      .attr('textLength', this.textLength)
      .attr('lengthAdjust', 'spacingAndGlyphs')
      .text(this.text);

  }

  public getLeftPoint(): Point {
    return new Point(this.cx - this.r, this.cy);
  }

  public getRightPoint(): Point {
    return new Point(this.cx + this.r, this.cy);
  }

  public getBottomPoint(): Point {
    return new Point(this.cx, this.cy + this.r);
  }

  public connectTo(step: DrawStep): DrawEdge {
    return new DrawEdge(this.getRightPoint(), step.getLeftPoint());
  }

  public move(distanceX: number, distanceY: number): void {
    this.cx += distanceX * this.scale;
    this.cy += distanceY * this.scale;
  }

  public highlight(on: boolean): void {
    const color = on ? 'lightgrey' : 'white';
    this.circle.attr('fill', color);
    if (this.highlightCallback) {
      this.highlightCallback(on ? this.id : null);
    }
  }
}
