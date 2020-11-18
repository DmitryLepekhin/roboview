import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
import { NodeViewComponent } from './node-view/node-view.component';
import {SharedModule} from '@app/shared/shared.module';
import { NodesLevelComponent } from './nodes-level/nodes-level.component';


@NgModule({
  declarations: [ViewerComponent, NodeViewComponent, NodesLevelComponent],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    SharedModule
  ]
})
export class ViewerModule { }
