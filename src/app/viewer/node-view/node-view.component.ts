import {Component, Input, OnInit} from '@angular/core';
import {Robot} from '@app/core/structs';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.scss']
})
export class NodeViewComponent implements OnInit {

  @Input()
  robot: Robot;

  constructor() {
    this.test();
  }

  ngOnInit(): void {
    this.test();
  }

  getIconName(): string {
    return 'adb';
  }

  test(): void {
    if (!this.robot) {
      const testRobot = '{"componentType": "doc group", "type": "robot", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "my assign step", "comment": "this assigns nothing right now"}, {"componentType": "doc group", "type": "Loop", "name": "Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inaloop", "comment": ""}]}, {"componentType": "doc group", "type": "While Loop", "name": "While Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inawhile", "comment": ""}]}, {"componentType": "doc fork", "type": "Guarded Choice", "name": "Oh my guard", "comment": "", "contents": [{"componentType": "doc branch", "type": "Guarded branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}, {"componentType": "doc group", "type": "For Each Loop", "name": "For Each Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inaforeach", "comment": ""}]}]}, {"componentType": "doc branch", "type": "Guarded branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}, {"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}]}]}, {"componentType": "doc fork", "type": "Try-Catch", "name": "Try-Catch", "comment": "", "contents": [{"componentType": "doc step", "type": "Main block", "name": "main", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "try assign", "comment": ""}]}, {"componentType": "doc step", "type": "Final block", "name": "finally", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "final assign", "comment": ""}]}, {"componentType": "doc branch", "type": "Catch branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "catchy assign 2", "comment": ""}, {"componentType": "doc step", "type": "Assign", "name": "catchy assign 3", "comment": ""}]}, {"componentType": "doc branch", "type": "Catch branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "catchy assign 4", "comment": ""}]}]}, {"componentType": "doc step", "type": "Return", "name": "my return step", "comment": "this step returns the result of the robot"}]}';
      this.robot = JSON.parse(testRobot);
    }
  }
}