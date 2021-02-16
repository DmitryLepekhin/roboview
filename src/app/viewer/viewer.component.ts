import {Component} from '@angular/core';
import {isRL1, RL1Robot, RL2Robot, ViewBlock} from '../core/structs/robot';
import {convertRL1View} from '@app/core/structs';
import {Router} from '@angular/router';
import {convertRL2View} from '@app/core/structs/rl2-view-converter';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {

  robot: RL2Robot | RL1Robot;

  levels: ViewBlock[] = [];

  constructor(
    private router: Router
  ) {
    this.robot = this.router.getCurrentNavigation().extras.state as RL2Robot;
    this.demo();
    this.buildTree();
  }

  hasElements(level: ViewBlock): boolean {
    return level.steps.length > 0;
  }

  private buildTree(): void {
    if (!this.robot) {
      this.router.navigate(['/']);
    }
    if (!isRL1(this.robot)) {
      this.levels = convertRL2View(this.robot as RL2Robot);
    } else {
      this.levels = convertRL1View(this.robot as RL1Robot);
    }
  }

  private demo(): void {
    if (!this.robot) {
      // const testRobot = '{"componentType": "doc group", "type": "robot", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "my assign step", "comment": "this assigns nothing right now"}, {"componentType": "doc group", "type": "Loop", "name": "Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inaloop", "comment": ""}]}, {"componentType": "doc group", "type": "While Loop", "name": "While Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inawhile", "comment": ""}]}, {"componentType": "doc fork", "type": "Guarded Choice", "name": "Oh my guard", "comment": "", "contents": [{"componentType": "doc branch", "type": "Guarded branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}, {"componentType": "doc group", "type": "For Each Loop", "name": "For Each Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inaforeach", "comment": ""}]}]}, {"componentType": "doc branch", "type": "Guarded branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}, {"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}]}]}, {"componentType": "doc fork", "type": "Try-Catch", "name": "Try-Catch", "comment": "", "contents": [{"componentType": "doc step", "type": "Main block", "name": "main", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "try assign", "comment": ""}]}, {"componentType": "doc step", "type": "Final block", "name": "finally", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "final assign", "comment": ""}]}, {"componentType": "doc branch", "type": "Catch branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "catchy assign 2", "comment": ""}, {"componentType": "doc step", "type": "Assign", "name": "catchy assign 3", "comment": ""}]}, {"componentType": "doc branch", "type": "Catch branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "catchy assign 4", "comment": ""}]}]}, {"componentType": "doc step", "type": "Return", "name": "my return step", "comment": "this step returns the result of the robot"}]}';
      const testRobot = '{"comment": "null", "blocks": [{"blockType": "Body", "id": "0", "blockName": "Body", "branches": [{"id": "1", "startId": "", "endId": "8", "index": "0", "steps": [{"stepType": "Snippet", "id": "2", "stepName": "Snippet", "comment": "null", "snippetName": "LoadHelp"}, {"stepType": "Do Nothing", "id": "3", "stepName": "CLICK HERE FIRST", "comment": "null"}, {"stepType": "Branch Point", "id": "4", "stepName": "Branch Point", "comment": "null", "links": ["7", "6", "5"]}]}, {"id": "7", "startId": "4", "endId": "", "index": "2", "steps": [{"stepType": "Do Nothing", "id": "8", "stepName": "I am executed first.", "comment": "null"}, {"id": "9", "stepType": "End"}]}, {"id": "6", "startId": "4", "endId": "12", "index": "1", "steps": [{"stepType": "Do Nothing", "id": "10", "stepName": "I am executed second.", "comment": "null"}]}, {"id": "11", "startId": "10", "endId": "", "index": "0", "steps": [{"stepType": "Do Nothing", "id": "12", "stepName": "I am executed third and fifth.", "comment": "null"}, {"id": "13", "stepType": "End"}]}, {"id": "5", "startId": "4", "endId": "12", "index": "0", "steps": [{"stepType": "Do Nothing", "id": "14", "stepName": "I am executed fourth.", "comment": "null"}]}]}]}';
      const result: RL2Robot = JSON.parse(testRobot) as RL2Robot;
      this.robot = result;
    }
  }

}
