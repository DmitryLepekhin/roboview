import {Component, Input, OnInit} from '@angular/core';
import {Level} from '@app/core/structs';

@Component({
  selector: 'app-nodes-level',
  templateUrl: './nodes-level.component.html',
  styleUrls: ['./nodes-level.component.scss']
})
export class NodesLevelComponent {

  @Input()
  level: Level;

  constructor() { }

  getLevelPath(): string {
    return this.level.path.reduce((x, y) => x + ' / ' + y);
  }
}
