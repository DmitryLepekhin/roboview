import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,

  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
];

@NgModule({
  declarations: [],
  exports: [
    ...modules
  ],
  imports: [
    CommonModule,
    ...modules
  ]
})
export class SharedModule { }
