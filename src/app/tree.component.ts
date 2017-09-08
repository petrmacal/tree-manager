import { Component, OnInit, OnChanges, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Tree } from './model/tree';
import { Node } from './model/node';
import { TreeService } from './tree.service';

import { Queue } from 'typescript-collections';

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
  	actualTraverse:Array<Node[]> = [];

  	/* Select from traverseDFS or traverseBFS */
  	private traversalMode = this.traverseDFS;
  	public traversalModeName = "DFS"; 

  	traverseDFS(callback = null): void {
  		let depth = 0;
	    (function recurse(currentNode, depth) {
	        for (var i = 0, length = currentNode.children.length; i < length; i++) {
	            recurse(currentNode.children[i],depth+1);
	        }
	 		
	        (!callback || callback(currentNode, depth));
	    })(this.tree.root,0);
  	}

  	traverseBFS(callback = null): void {
	    var queue = new Queue<[Node,number]>();
	     
	    queue.enqueue([this.tree.root,0]);
	 
	    let currentTree = queue.dequeue();

	    while(currentTree){
	        for (var i = 0, length = currentTree[0].children.length; i < length; i++) {
	            queue.enqueue([currentTree[0].children[i],currentTree[1]+1]);
	        }

	        !callback || callback(currentTree[0], currentTree[1]);

	        currentTree = queue.dequeue();
	    }
  	}

	add(pid: number, data: string): void {
		let node = null,
		    parent = null,
		    callback = (node => {
		        if (node.id == pid) {
		            parent = node;
		        }
		    });
		  

		this.contains(callback, this.traversalMode);

		if (parent) {
		  	this.treeService.create(pid,data)
		    	.then(
		    		(node) => { 
		    			//this.nodes.push(node),
		    			this.actualTraverse = [[]];
		    			parent.children.push(node),
		    			node.parent = parent.id; 
		    			this.contains((node,depth) => {
		    				this.actualTraverse[depth] || (this.actualTraverse[depth] = []);
		    				this.actualTraverse[depth].push(node); 
		    			}, this.traversalMode);
		    		}
		    );
			
		} else {
			alert('There is no parent node with specified id');
		}
	}

	contains(callback, traverse) {
		traverse.call(this, callback);
	}

	deleteNode(data):void {

		let id = data.id, 
			pid = data.pid,
			tree = this,
	    	parent = null,
	    	index,
	    nodeToRemove;

		let callback = (node => {
		        if (node.id == pid) {
		            parent = node;
		        }
		});
	 
	    this.contains(callback, this.traversalMode);
	 
	    if (parent) {
	        index = this.getIndex(id, parent.children);
	 
	        if (index === undefined) {
	            alert('Node to remove does not exist.');
	        } else {

	        	nodeToRemove = parent.children.splice(index, 1)[0];
	        	this.treeService
				  .delete(nodeToRemove)
				  .then(() => {
				  	this.actualTraverse = [[]];
				  	nodeToRemove.children.forEach(((n) => { 
				  		n.parent = pid,
				  		parent.children.push(n); 				  		
				  	}),this);	
	    			this.contains((node,depth) => {
	    				this.actualTraverse[depth] || (this.actualTraverse[depth] = []);
	    				this.actualTraverse[depth].push(node); 
	    			}, this.traversalMode);				  	
				    this.nodes = this.nodes.filter(n => n !== nodeToRemove);
				    if (this.selectedNode === nodeToRemove) { this.selectedNode = null; }
				});
	        }
	    } else {
	        alert('Parent does not exist.');
	    }

	}

	switchTraversalMode() {
		this.actualTraverse = [[]];

		this.traversalModeName = (this.traversalModeName === 'DFS' ? 'BFS' : 'DFS'),
		this.traversalMode = (this.traversalModeName === 'DFS' ? this.traverseBFS : this.traverseDFS);

		this.contains((node,depth) => {
			this.actualTraverse[depth] || (this.actualTraverse[depth] = []);
			this.actualTraverse[depth].push(node); 
		}, this.traversalMode);	

	}

	saveNode(event:boolean) {
		if(event === true) this.selectedNode = null;
	}

  	onSelect(node: Node):void {
  		this.selectedNode = node;
  	}

  	getNodes():void {
  		this.treeService.getNodes().then(nodes => { 
  			this.nodes = nodes, 
  			this.tree.root = this.selectedNode = this.nodes[0];
  			//this.contains(node => { this.actualTraverse[0] || (this.actualTraverse[0] = []), this.actualTraverse[0].push(node); }, this.traversalMode);
  		});
  	}

  	ngOnInit():void {
  		this.tree = {root: null};
  		this.getNodes();
  	}

  	private getIndex(id, arr):number {
  		for(let i = 0; i < arr.length; i++) {
  			if(arr[i].id == id) return i;
  		}
  		return undefined;
  	}

}