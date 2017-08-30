import { Component, Output, EventEmitter } from '@angular/core';

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
	@Output() updateTree: EventEmitter<any> = new EventEmitter(); 
	constructor(private treeService:TreeService) {}
	add(pid: number, data: string): void {
	  if (!pid) { return; }
	  this.treeService.create(pid,data)
	    .then(
	    	(node) => this.treeService.getNodes()
	    );
	}	
}