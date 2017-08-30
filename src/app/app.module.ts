import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree.component';
import { TreeService } from './tree.service';
import { NodeCompontent } from './node/node_detail.component';
import { NodeAddComponent } from './node/node_add.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    NodeCompontent,
    NodeAddComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'tree',
        component: TreeComponent
      },
    ]),
    InMemoryWebApiModule.forRoot(InMemoryDataService)    
  ],
  providers: [TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
