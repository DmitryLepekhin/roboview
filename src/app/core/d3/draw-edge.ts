import {Point} from '@app/core/d3/point';

export class DrawEdge {

  // steps should be drawn giving space for dots ... ->
  static getLeftPadding(): number {
    const distanceBetweenDots = 15;
    const dotsCount = 3;
    const edgeLength = 30;
    const dotRadius = 3;
    const dotsLength = (dotsCount - 1) * distanceBetweenDots + dotsCount * dotRadius * 2;
    return dotsLength + edgeLength;
  }

  constructor(private startPoint: Point, private endPoint: Point) {
  }

  public draw(svg): void {
    if (this.startPoint.y === this.endPoint.y) {
      // draw the edge for points on the same level
      this.drawEdge(svg, this.startPoint.x, this.startPoint.y, this.endPoint.x - 5, this.endPoint.y);
    } else {
      // the points are on different levels,
      // the edge will be split into two

      // the edge "from"
      this.drawEdge(svg, this.startPoint.x, this.startPoint.y, this.startPoint.x + 30, this.startPoint.y);
      this.drawDots(svg, this.startPoint.x + 30 + 15, this.startPoint.y);

      // the edge "to"
      // this edge with dots will take this length:
      const dotsLength = 2 * 15 + 10;
      const edgeLength = 30 + 5;
      this.drawDots(svg, this.endPoint.x - dotsLength - edgeLength, this.endPoint.y);
      this.drawEdge(svg, this.endPoint.x - edgeLength, this.endPoint.y, this.endPoint.x - 5, this.endPoint.y);
    }
  }

  private drawEdge(svg, x1, y1, x2, y2): void {
    svg.append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('marker-end', 'url(#triangle)');
  }

  private drawDots(svg, x, y): void {
    const radius = 3;
    for (let i = 0; i < 3; i++) {
      svg.append('circle')
        .attr('cx', x + 15 * i)
        .attr('cy', y)
        .attr('r', radius)
        .attr('stroke', 'black')
        .attr('fill', 'black');
    }
  }

}
