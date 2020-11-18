import { Component, OnInit } from '@angular/core';
import {CacheService} from '../core/services/cache.service';
import {Robot} from '../core/structs/robot';
import {Level} from '@app/core/structs';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  robot: Robot;

  levels: Level[] = [];

  constructor(
    private cache: CacheService
  ) {
    this.robot = cache.robot;
    this.test();
    this.createLevels(
      this.createFirstLevel(this.robot)
    );
  }

  ngOnInit(): void {
  }

  test(): void {
    if (!this.robot) {
      const testRobot = '{"componentType": "doc group", "type": "robot", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "my assign step", "comment": "this assigns nothing right now"}, {"componentType": "doc group", "type": "Loop", "name": "Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inaloop", "comment": ""}]}, {"componentType": "doc group", "type": "While Loop", "name": "While Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inawhile", "comment": ""}]}, {"componentType": "doc fork", "type": "Guarded Choice", "name": "Oh my guard", "comment": "", "contents": [{"componentType": "doc branch", "type": "Guarded branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}, {"componentType": "doc group", "type": "For Each Loop", "name": "For Each Loop", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "inaforeach", "comment": ""}]}]}, {"componentType": "doc branch", "type": "Guarded branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}, {"componentType": "doc step", "type": "Assign", "name": "Assign", "comment": ""}]}]}, {"componentType": "doc fork", "type": "Try-Catch", "name": "Try-Catch", "comment": "", "contents": [{"componentType": "doc step", "type": "Main block", "name": "main", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "try assign", "comment": ""}]}, {"componentType": "doc step", "type": "Final block", "name": "finally", "comment": "", "contents": [{"componentType": "doc step", "type": "Assign", "name": "final assign", "comment": ""}]}, {"componentType": "doc branch", "type": "Catch branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "catchy assign 2", "comment": ""}, {"componentType": "doc step", "type": "Assign", "name": "catchy assign 3", "comment": ""}]}, {"componentType": "doc branch", "type": "Catch branch", "name": "<no name for now>", "comment": "<no comment for now>", "contents": [{"componentType": "doc step", "type": "Assign", "name": "catchy assign 4", "comment": ""}]}]}, {"componentType": "doc step", "type": "Return", "name": "my return step", "comment": "this step returns the result of the robot"}]}';
      this.robot = JSON.parse(testRobot);
    }
  }

  private createLevels(parentLevel: Level): void {
    this.levels.push(parentLevel);
    if (!parentLevel.elements) {
      return;
    }
    parentLevel.elements.forEach(element => {
      const level = this.createLevel(element, parentLevel);
      this.createLevels(level);
    });
  }

  private createLevel(element: Robot, parentLevel?: Level): Level {
    const result = new Level();
    if (parentLevel) {
      result.path = [...parentLevel.path, element.name];
    } else {
      result.path = [element.name];
    }
    if (element.contents) {
      result.elements = [...element.contents];
    } else {
      result.elements = [];
    }
    return result;
  }

  private createFirstLevel(element: Robot): Level {
    const result = new Level();
    result.path = [element.name];
    result.elements = [...element.contents];
    return result;
  }

  hasElements(level: Level): boolean {
    return level.elements.length > 0;
  }
}
