import * as d3 from 'd3';
import {DrawStep} from '@app/core/d3/draw-step';
import {Link, ViewBlock, ViewStep} from '@app/core/structs';
import {DocNavigationService} from '@app/core/services/doc-navigation.service';
import {DrawRef} from '@app/core/d3/draw-ref';
import {DrawEdge} from '@app/core/d3/draw-edge';
import {DrawInRef} from '@app/core/d3/draw-in-ref';
import {Point} from '@app/core/d3/point';
import {RowData} from '@app/core/d3/row-data';

export class Drawing {

  /**
   * existing 'svg' tag in html template
   */
  static readonly TAG = 'svg';

  /**
   * the 'svg' element
   */
  private readonly svg;

  /**
   * robot steps
   */
  private nodes: DrawStep[] = [];

  private edges: DrawEdge[] = [];
  private outgoingRefs: DrawRef[] = [];
  private incomingRefs: DrawInRef[] = [];

  public highlightedStepId;

  // saving previously appended node helps to position the next node
  private rowData = new RowData();

  constructor(private tag = Drawing.TAG, private docNavigationService: DocNavigationService, private level: ViewBlock) {
    this.svg = d3.select(tag);
    // layout

    // get height of the incoming refs
    const depthIn = level.refs.length;
    const shiftY = DrawInRef.getHeight(depthIn);
    // const shiftX = depthIn === 0 ? DrawEdge.getLeftPadding() : Math.max(DrawInRef.getWidth(), DrawEdge.getLeftPadding());
    const shiftX = Math.max(DrawInRef.getWidth(), DrawEdge.getLeftPadding());

    this.level.steps.forEach(step => this.appendNode(step));
    this.nodes.forEach(node => node.move(shiftX, shiftY));

    // it is important to do after the nodes move
    this.appendOutgoingRefs();

    this.connectNodes();

    const leftPoint = this.nodes[0].getLeftPoint();
    this.appendIncomingRefs(this.level.refs, leftPoint);


    this.svg.style('height', this.getHeight() + 'px');
  }

  // the outer svg must accommodate all these drawn parts
  // the height can be calculated:
  // get the bottom point of the last node
  // and add height of outgoing links
  private getHeight(): number {
    const bottomY = this.rowData.node.cy;
    const linksHeight = DrawRef.getHeight(this.rowData.outLinksCount + 1);
    return bottomY + linksHeight;
  }

  public draw(): void {
    this.nodes.forEach(node => node.draw(this.svg));
    this.edges.forEach(edge => edge.draw(this.svg));

    this.outgoingRefs.forEach(ref => ref.draw(this.svg));
    this.incomingRefs.forEach(ref => ref.draw(this.svg));

    // estimate height of the svg
    const height = (this.outgoingRefs.length + this.incomingRefs.length + 1 + 2) * DrawInRef.Defaults.height;
    this.svg.attr('height', height);
  }

  appendNode(viewStep: ViewStep): DrawStep {
    const drawStep: DrawStep = new DrawStep(viewStep, this.rowData);
    drawStep.highlightCallback = (id) => this.highlightedStepId = id;
    this.nodes.push(drawStep);

    this.rowData.node = drawStep;

    return drawStep;
  }

  appendOutgoingRefs(): void {
    this.nodes.forEach(node => {
      for (let i = 0; i < node.viewStep.links?.length; i++) {
        const ref = new DrawRef(
          node.getBottomPoint(),
          i + 1,
          () => this.docNavigationService.jumpToHeaderById(node.viewStep.links[i].id),
          '@branch ' + node.viewStep.links[i].id
        );
        this.outgoingRefs.push(ref);
      }
    });
  }

  connectNodes(): void {
    this.nodes.reduce((a, b) => {
      this.edges.push( a.connectTo(b) );
      return b;
    } );
  }

  appendIncomingRefs(links: Link[], point: Point): void {
    // here we need to know LeftPoint of the first step, to connect to;
    links.forEach((link, index) => {
      const ref: DrawInRef = new DrawInRef(point,
        index + 1,
        () => this.docNavigationService.jumpToHeaderById(link.id),
        '@branch ' + link.id);
      this.incomingRefs.push(ref);
    });
  }

  highlightStep(stepId: number, on: boolean): void {
    this.nodes.filter(node => node.id === stepId).forEach(node => node.highlight(on));
  }
}
