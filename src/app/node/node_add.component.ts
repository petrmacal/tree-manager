import { Component, Input } from '@angular/core';

import { TreeService } from '../tree.service';
import { TreeComponent } from '../tree.component';


@Component({
	selector: 'node-add',
	template: `
		<form>
			<input type="number" placeholder="Enter parent ID" #pid>
			<input type="text" placeholder="Enter some data" #data>
			<button (click)="add(pid.value,data.value)">Add node</button>
		</form>
	`
})

export class NodeAddComponent {

	@Input() node:Node;

	constructor(private treeService:TreeService) {}
	add(pid: number, data: string): void {
	  if (!pid) { return; }
	  this.treeService.create(pid,data)
	    .then(
	    	(node) => this.treeService.getNodes()
	    );
	}	
}