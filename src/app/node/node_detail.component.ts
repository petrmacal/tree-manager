import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Node } from '../model/node';

import { TreeService } from '../tree.service';

@Component({
	selector: 'node-detail',
	template: `
	<div *ngIf="node">
		<h2>Selected node with <strong>id {{node.id}}</strong> details:</h2>
		<span></span>
		<input [(ngModel)]="node.data" type="text" placeholder="Enter data">
		<button (click)="save()">Save</button>
		<button (click)="delete()">Delete node</button>
  	</div>
	`
})

export class NodeCompontent {
	@Input() node: Node;
	@Output() deleteNode:EventEmitter<Node> = new EventEmitter<Node>();
	@Output() saveNode:EventEmitter<any> = new EventEmitter<any>();

	constructor(private treeService: TreeService) { }
 
	delete(node:Node):void {
		this.deleteNode.emit(this.node);
	}

	save():void {
		this.treeService.update(this.node);
		this.saveNode.emit(true);
	}

}