import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TreeComponent } from './tree.component';
import { NodeCompontent } from './node/node_detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/tree', pathMatch: 'full' },
  { path: 'tree', component: TreeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}