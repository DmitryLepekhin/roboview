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
      // const testRobot = '{"comment": "null", "blocks": [{"blockType": "Body", "id": "0", "blockName": "Body", "branches": [{"id": "1", "startId": "", "endId": "8", "index": "0", "steps": [{"stepType": "Snippet", "id": "2", "stepName": "Snippet", "comment": "null", "snippetName": "LoadHelp"}, {"stepType": "Do Nothing", "id": "3", "stepName": "CLICK HERE FIRST", "comment": "null"}, {"stepType": "Branch Point", "id": "4", "stepName": "Branch Point", "comment": "null", "links": ["7", "6", "5"]}]}, {"id": "7", "startId": "4", "endId": "", "index": "2", "steps": [{"stepType": "Do Nothing", "id": "8", "stepName": "I am executed first.", "comment": "null"}, {"id": "9", "stepType": "End"}]}, {"id": "6", "startId": "4", "endId": "12", "index": "1", "steps": [{"stepType": "Do Nothing", "id": "10", "stepName": "I am executed second.", "comment": "null"}]}, {"id": "11", "startId": "10", "endId": "", "index": "0", "steps": [{"stepType": "Do Nothing", "id": "12", "stepName": "I am executed third and fifth.", "comment": "null"}, {"id": "13", "stepType": "End"}]}, {"id": "5", "startId": "4", "endId": "12", "index": "0", "steps": [{"stepType": "Do Nothing", "id": "14", "stepName": "I am executed fourth.", "comment": "null"}]}]}]}';
      const testRobot = '{"comment": "null", "blocks": [{"blockType": "Body", "id": "0", "blockName": "Body", "branches": [{"id": "1", "startId": "", "endId": "8", "index": "0", "steps": [{"stepType": "Snippet", "id": "2", "stepName": "Snippet", "comment": "null", "snippetName": "LoadHelp"}, {"stepType": "Do Nothing", "id": "3", "stepName": "CLICK HERE FIRST", "comment": "null"}, {"stepType": "Branch Point", "id": "4", "stepName": "Branch Point", "comment": "null", "links": ["7", "6", "5"]}]}, {"id": "7", "startId": "4", "endId": "", "index": "2", "steps": [{"stepType": "Do Nothing", "id": "8", "stepName": "I am executed first.", "comment": "null"}, {"id": "9", "stepType": "End"}]}, {"id": "6", "startId": "4", "endId": "12", "index": "1", "steps": [{"stepType": "Do Nothing", "id": "10", "stepName": "I am executed second.", "comment": "null"}]}, {"id": "11", "startId": "10", "endId": "", "index": "0", "steps": [{"stepType": "Do Nothing", "id": "12", "stepName": "I am executed third and fifth.", "comment": "null"}, {"id": "13", "stepType": "End"}]}, {"id": "5", "startId": "4", "endId": "12", "index": "0", "steps": [{"stepType": "Do Nothing", "id": "14", "stepName": "I am executed fourth.", "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Arcu cursus vitae congue mauris rhoncus aenean vel. Semper feugiat nibh sed pulvinar proin. Integer malesuada nunc vel risus commodo. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Mauris augue neque gravida in fermentum et sollicitudin. Neque egestas congue quisque egestas diam in arcu. Nullam vehicula ipsum a arcu cursus. Consectetur purus ut faucibus pulvinar. Facilisis mauris sit amet massa vitae tortor condimentum. In arcu cursus euismod quis viverra.' +
        'Morbi non arcu risus quis varius quam quisque id diam. Neque laoreet suspendisse interdum consectetur libero id faucibus. At ultrices mi tempus imperdiet nulla malesuada. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. Mauris pharetra et ultrices neque ornare aenean euismod. Praesent elementum facilisis leo vel fringilla est ullamcorper. Arcu non sodales neque sodales. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Ut sem nulla pharetra diam sit amet. Sem viverra aliquet eget sit amet tellus cras adipiscing. Sit amet consectetur adipiscing elit. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Morbi quis commodo odio aenean. Mi bibendum neque egestas congue quisque. Mi bibendum neque egestas congue quisque egestas diam in arcu. Metus aliquam eleifend mi in nulla' +
        'Felis imperdiet proin fermentum leo vel orci porta non. Et netus et malesuada fames ac turpis. Convallis convallis tellus id interdum velit. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Elit pellentesque habitant morbi tristique. Ut tellus elementum sagittis vitae et leo duis. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Amet facilisis magna etiam tempor orci eu. Sit amet facilisis magna etiam tempor orci eu. Cursus risus at ultrices mi tempus imperdiet. Lacus sed turpis tincidunt id aliquet risus. Id neque aliquam vestibulum morbi blandit cursus risus. Sodales ut eu sem integer vitae justo eget magna. Duis convallis convallis tellus id interdum. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Consequat interdum varius sit amet mattis. Non blandit massa enim nec dui nunc mattis. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Mattis rhoncus urna neque viverra.' +
        'Blandit turpis cursus in hac. Auctor urna nunc id cursus metus aliquam eleifend mi. Enim sit amet venenatis urna cursus. Lectus quam id leo in. Libero id faucibus nisl tincidunt. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Sed elementum tempus egestas sed sed. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Amet purus gravida quis blandit turpis cursus in. Vitae nunc sed velit dignissim sodales ut eu. Lobortis scelerisque fermentum dui faucibus in ornare. Eget mauris pharetra et ultrices neque ornare aenean euismod. Placerat duis ultricies lacus sed. Mauris augue neque gravida in fermentum et sollicitudin ac. Eu facilisis sed odio morbi quis commodo odio.' +
        'Leo urna molestie at elementum eu. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Donec pretium vulputate sapien nec sagittis. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Nulla malesuada pellentesque elit eget gravida. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Non consectetur a erat nam at. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Ac placerat vestibulum lectus mauris ultrices eros in cursus."}]}]}]}';
      const result: RL2Robot = JSON.parse(testRobot) as RL2Robot;
      this.robot = result;
    }
  }

}
