import {Point} from '@app/core/d3/point';

export class DrawRef {

  height = 25;
  width = 25;
  fontSize = 20 * 0.75;
  textLength = 2 * 20 * 0.5;

  /**
   * height of a Ref of the specified depth
   */
  static getHeight(depth: number): number {
    if (depth === 0) {
      return 0;
    }
    const height = 25;
    const fontSize = 20 * 0.75;
    return height * depth + fontSize / 2;
  }

  constructor(private point: Point, private depth: number, private jump, private text) {
    this.textLength = text.length * 20 * 0.5;
  }

  public draw(svg): void {

    /**
     *   point
     *     |
     *     |
     *   point2 --> point3
     */
    const point2 = new Point(this.point.x, this.point.y + this.height * this.depth);
    const point3 = new Point(this.point.x + 25, this.point.y + this.height * this.depth);

    const groupElement = svg.append('g');

    const text = groupElement.append('text')
      .attr('dy', point3.y)
      .attr('dx', point3.x)
      .attr('font-size', this.fontSize)
      // .attr('font-weight', 'bold')
      // .attr('font-family', 'monospace')
      .attr('textLength', this.textLength)
      .attr('lengthAdjust', 'spacingAndGlyphs')
      // .attr('style', 'text-decoration: underline;')
      .attr('style', 'stroke: black; stroke-width: 1;')
      .text(this.text);

    groupElement.append('line')
      .attr('x1', this.point.x)
      .attr('y1', this.point.y)
      .attr('x2', point2.x)
      .attr('y2', point2.y)
      .attr('stroke-width', 1)
      .attr('stroke', 'black');

    groupElement.append('svg:defs').append('svg:marker')
      .attr('id', 'triangle')
      .attr('refX', 6)
      .attr('refY', 6)
      .attr('markerWidth', 30)
      .attr('markerHeight', 30)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 12 6 0 12 3 6')
      .style('fill', 'black');

    groupElement.append('line')
      .attr('x1', point2.x)
      .attr('y1', point2.y - this.fontSize / 2 + 5)
      .attr('x2', point3.x - 5)
      .attr('y2', point3.y - this.fontSize / 2 + 5)
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('marker-end', 'url(#triangle)');

    text
      .on('mouseover', () => text.attr('style', 'stroke: red; stroke-width: 1;'))
      .on('mouseout', () => text.attr('style', 'stroke: black; stroke-width: 1;'))
      .on('mouseup', () => {
        console.log('jump to description');
        text.attr('style', 'stroke: black; stroke-width: 1;');
        this.jump();
      });
  }

}
