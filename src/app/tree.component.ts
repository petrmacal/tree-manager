import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Tree } from './model/tree';
import { Node } from './model/node';
import { TreeService } from './tree.service';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})

export class TreeComponent implements OnInit {
	constructor(private treeService:TreeService, private router: Router) { }
	tree: Tree;
  	nodes: Node[];
  	selectedNode: Node;

	add(pid: number, data: string): void {
	  if(this.nodes.length !== 0 && !this.contains(pid)) {
	  	alert('This ID does not exists');
	  	return;
	  }
	  if (pid == null) { pid = null; }
	  this.treeService.create(pid,data)
	    .then(
	    	(node) => this.nodes.push(node)
	    );
	}

	contains(id:number):boolean {
		for(let n of this.nodes) {
			if(id==n.id) return true;
		}
		return false;
	}

	deleteNode(node: Node):void {
	  this.treeService
	      .delete(node)
	      .then(() => {
	        this.nodes = this.nodes.filter(n => n !== node);
	        if (this.selectedNode === node) { this.selectedNode = null; }
	   });
	}

	saveNode(event:boolean) {
		if(event === true) this.selectedNode = null;
	}

  	onSelect(node: Node):void {
  		this.selectedNode = node;
  	}

  	getNodes():void {
  		this.treeService.getNodes().then(nodes => this.nodes = nodes);
  	}

  	ngOnInit():void {
  		this.tree = {root: null, nodes: []};
  		this.getNodes();
  		console.log(this.tree);

  	}

}