import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CacheService} from '../core/services/cache.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  fileContent;

  fileName = '';

  @ViewChild('file', {static: true}) fileField: ElementRef<HTMLInputElement>;

  filenameControl: FormControl = new FormControl('');

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cache: CacheService,
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
        const obj = JSON.parse(contents);
        that.cache.robot = obj;
      };
    }
  }

  navigate(): void {
    this.router.navigate(['viewer']);
  }

}
