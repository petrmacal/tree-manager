import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Tree } from './model/tree';
import { Node } from './model/node';
import { TreeService } from './tree.service';

@Component({
  selector: 'tree-container',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})

export class TreeComponent implements OnInit {
	constructor(private treeService:TreeService, private router: Router) { }
	tree: Tree;
  	nodes: Node[];
  	selectedNode: Node;

  	traverseNodes():void {

  		let _nodes = this.nodes;

		for(let i = _nodes.length-1; i >= 0; i--) {
			// If the node is already traversed, skip it
			if(_nodes[i].traversed) continue;

			let pid = null;
			if(_nodes[i].parent !== null) pid = _nodes[i].parent;
			
			if(pid !== null) {
				_nodes[this.getIndex(pid,_nodes)].children.push(_nodes[i]);
			}

			_nodes[i].traversed = true;
		}

		console.log(_nodes);

  	}

	add(pid: number, data: string): void {
	  if(this.nodes.length !== 0 && !this.contains(pid)) {
	  	alert('This ID does not exists');
	  	return;
	  }
	  if (pid == null) { pid = null; }
	  this.treeService.create(pid,data)
	    .then(
	    	(node) => { this.nodes.push(node); this.traverseNodes(); }
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
		  	// Move childs of selected node to its parent node
		  	node.children.forEach(((n) => n.parent = this.selectedNode.parent),this);
		    this.nodes = this.nodes.filter(n => n !== node);
		    if(node.parent !== null && this.nodes[node.parent]) {
		    	let _index = this.getIndex(node.id,this.nodes[node.parent].children);
		  		this.nodes[node.parent].children.splice(_index,1);
		    }
		    if (this.selectedNode === node) { this.selectedNode = null; }

		    this.traverseNodes();
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

  	private getIndex(id, arr):number {
  		for(let i = 0; i < arr.length; i++) {
  			if(arr[i].id == id) return i;
  		}
  	}

}