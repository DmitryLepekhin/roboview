import {Component, Input} from '@angular/core';
import {StepType, ViewBlock, ViewStep} from '@app/core/structs';
import {DocNavigationService} from '@app/core/services/doc-navigation.service';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.scss']
})
export class NodeViewComponent {

  readonly COLUMN_INDEXES = [0, 1, 2, 3, 4];

  @Input()
  level: ViewBlock;

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
        return 'drag_handle';
      case StepType.FOR_EACH_LOOP:
      case StepType.LOOP:
        return 'autorenew';
      case StepType.GUARDED_CHOICE:
        return 'mediation';
      case StepType.GUARDED_BRANCH:
        return 'account_tree';
      case StepType.TRY_CATCH:
        return 'call_split';
      case StepType.CATCH_BRANCH:
        return 'call_missed_outgoing';
      case StepType.RETURN:
        return 'keyboard_return';
      case StepType.MAIN_BLOCK:
        return 'subject';
      case StepType.FINAL_BLOCK:
        return 'grading';
      default:
        return 'bug';
    }
  }

  getSelectedItemClass(id: number): string {
    const highlightedNode = this.docNavigationService.destination;
    if (highlightedNode && highlightedNode.id === id) {
      return 'selected-item-color';
    }
    return '';
  }
}
