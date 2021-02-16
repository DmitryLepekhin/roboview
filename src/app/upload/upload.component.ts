import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {isRL1, RL1Robot, RL2Robot} from '@app/core/structs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  fileName = '';

  @ViewChild('file', {static: true}) fileField: ElementRef<HTMLInputElement>;

  filenameControl: FormControl = new FormControl('');

  formGroup: FormGroup;

  robot: RL2Robot | RL1Robot;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      filenameControl: null
    });
  }

  clear(): void {
    this.fileField.nativeElement.value = null;
    this.fileName = null;
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      this.filenameControl.setValue(this.fileName);

      const file = event.target.files[0];

      const that = this;
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        const contents: string = evt.target.result as string;
        const object = JSON.parse(contents);
        if (isRL1(object)) {
          that.robot = object as RL1Robot;
        } else {
          that.robot = object as RL2Robot;
        }
      };
    }
  }

  navigate(): void {
    this.router.navigate(['viewer'], {state: this.robot});
  }

}
