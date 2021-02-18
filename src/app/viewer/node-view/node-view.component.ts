import {AfterViewInit, Component, Input} from '@angular/core';
import {StepType, ViewBlock, ViewStep} from '@app/core/structs';
import {DocNavigationService} from '@app/core/services/doc-navigation.service';
import {Drawing} from '@app/core/d3/drawing';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.scss']
})
export class NodeViewComponent implements AfterViewInit {

  readonly COLUMN_INDEXES = [0, 1, 2, 3, 4];

  @Input()
  level: ViewBlock;

  drawing: Drawing;

  highlightedId: number;

  constructor(
    public docNavigationService: DocNavigationService
  ) { }

  getLevelPath(): string {
    return this.level.path;
  }

  getRowIndexes(): number[] {
    const size = Math.ceil(this.level.steps.length / this.getColumnIndexes().length);
    return [...Array(size).keys()];
  }

  getColumnIndexes(): number[] {
    return this.COLUMN_INDEXES;
  }

  getRobot(row: number, col: number): ViewStep {
    const index = row * this.getColumnIndexes().length + col;
    return this.level.steps[index];
  }

  jumpToHeader(robot: ViewStep): void {
    this.docNavigationService.jumpToHeader(this.level, robot);
  }

  jumpToNode(): void {
    this.docNavigationService.jumpToNode(this.level);
  }

  getIconName(type: StepType): string {
    switch (type) {
      case StepType.ROBOT:
        return 'android';
      case StepType.ASSIGN:
      case StepType.ASSIGN_VARIABLE:
        // return 'drag_handle';
        return '';
      case StepType.FOR_EACH_LOOP:
      case StepType.LOOP:
        return 'autorenew';
      case StepType.GUARDED_CHOICE:
        return 'mediation';
      case StepType.BRANCH:
      case StepType.GUARDED_BRANCH:
        return 'account_tree';
      case StepType.TRY_CATCH:
      case StepType.TRY:
        // return 'call_split';
        return 'paragliding';
      case StepType.CATCH_BRANCH:
        return 'call_missed_outgoing';
      case StepType.RETURN:
      case StepType.RETURN_VALUE:
        // return 'keyboard_return';
        return '';
      case StepType.MAIN_BLOCK:
        return 'subject';
      case StepType.FINAL_BLOCK:
        return 'grading';
      case StepType.SNIPPET:
        return 'text_snippet';
      case StepType.DO_NOTHING:
        return 'self_improvement';
      default:
        return 'bug';
    }
  }

  private draw(): void {
    const id = 'svg' + this.level.id;
    this.drawing = new Drawing('#' + id, this.docNavigationService, this.level);
    this.drawing.draw();
  }

  highlightStep(stepId: number, on: boolean): void {
    this.drawing.highlightStep(stepId, on);
    this.highlightedId = on ? stepId : null;
  }

  ngAfterViewInit(): void {
    this.draw();
  }

}
