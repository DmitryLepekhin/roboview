import {Point} from '@app/core/d3/point';

export class DrawEdge {

  constructor(private startPoint: Point, private endPoint: Point) {
  }

  public draw(svg): void {
    svg.append('svg:defs').append('svg:marker')
      .attr('id', 'triangle')
      .attr('refX', 6)
      .attr('refY', 6)
      .attr('markerWidth', 30)
      .attr('markerHeight', 30)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 12 6 0 12 3 6')
      .style('fill', 'black');
    svg.append('line')
      .attr('x1', this.startPoint.x)
      .attr('y1', this.startPoint.y)
      .attr('x2', this.endPoint.x - 5)
      .attr('y2', this.endPoint.y)
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('marker-end', 'url(#triangle)');
  }
}
