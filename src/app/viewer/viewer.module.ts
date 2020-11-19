import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
import {SharedModule} from '@app/shared/shared.module';
import { NodeViewComponent } from './node-view/node-view.component';


@NgModule({
  declarations: [ViewerComponent, NodeViewComponent],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    SharedModule
  ]
})
export class ViewerModule { }
