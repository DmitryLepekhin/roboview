import {Point} from '@app/core/d3/point';

export class DrawInRef {

  static readonly Defaults = {
    height: 25,
    width: 25,
    fontSize: 20 * 0.75,
    // let's put the text length is 10 characters ("branch 123")
    textLength: 10 * 20 * 0.5,
    gap: 10,
  };

  height     = DrawInRef.Defaults.height;
  width      = DrawInRef.Defaults.width;
  fontSize   = DrawInRef.Defaults.fontSize;
  textLength = DrawInRef.Defaults.textLength;
  gap        = DrawInRef.Defaults.gap;

  public static getWidth(): number {
    return DrawInRef.Defaults.textLength + DrawInRef.Defaults.width + 4 * DrawInRef.Defaults.gap;
  }

  public static getHeight(depth: number): number {
    return DrawInRef.Defaults.height * depth;
  }

  constructor(private point: Point, private depth: number, private jump, private text) {
    this.textLength = text.length * 20 * 0.5;
  }

  public draw(svg): void {

    /**
     *   point2 -- point3
     *               |
     *               |
     *             point4 --> point
     */

    const point4 = new Point(this.point.x - this.width / 2 - this.gap, this.point.y);
    const point3 = new Point(point4.x, point4.y - this.height * this.depth);
    const point2 = new Point(point3.x - this.width / 2 - this.gap, point3.y);
    const pointText = new Point(point2.x - this.textLength + 1 * this.gap, point2.y + this.fontSize * 0.25);

    const groupElement = svg.append('g');

    const text = groupElement.append('text')
      .attr('dy', pointText.y)
      .attr('dx', pointText.x)
      .attr('font-size', this.fontSize)
      .attr('textLength', this.textLength)
      .attr('lengthAdjust', 'spacingAndGlyphs')
      .attr('style', 'stroke: black; stroke-width: 1;')
      .text(this.text);

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

    // point4 -> point
    groupElement.append('line')
      .attr('x1', point4.x)
      .attr('y1', point4.y)
      .attr('x2', this.point.x - this.gap)
      .attr('y2', this.point.y)
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('marker-end', 'url(#triangle)');

    // point3 - point4
    groupElement.append('line')
      .attr('x1', point4.x)
      .attr('y1', point4.y)
      .attr('x2', point3.x)
      .attr('y2', point3.y)
      .attr('stroke-width', 1)
      .attr('stroke', 'black');

    // point2 - point3
    groupElement.append('line')
      .attr('x1', point2.x + 1.5 * this.gap)
      .attr('y1', point2.y)
      .attr('x2', point3.x)
      .attr('y2', point3.y)
      .attr('stroke-width', 1)
      .attr('stroke', 'black');

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
