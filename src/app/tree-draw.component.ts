import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Tree } from './model/tree';
import { Node } from './model/node';

@Component({
  selector: 'tree',
  template: `

  	<h3 *ngIf="depth==0">Rendered tree</h3>
  	<div *ngFor="let nodes of actualTraverse" class="tree depth-{{depth}}">
  			<div class="tree-col" *ngFor="let node of nodes">
  				ID:{{node.id}} [{{node.parent}}] <strong>{{node.data}}</strong> <sup (click)=delete(node.id,node.parent)>[x]</sup>
  			</div>
  	</div>

  `,
  styles: [`
  	.tree {
      width: 100%;display: -webkit-box;display: -moz-box;display: box;-moz-box-orient: horizontal;box-orient: horizontal;-webkit-box-orient: horizontal;
  	}

  	.tree-col {
        width: auto;border: solid 1px black;text-align: center;-webkit-box-flex: 1;-moz-box-flex: 1;box-flex: 1;
  	}

    sup {
      cursor: pointer;
    }
  `]
})

export class TreeDrawComponent {

	@Input() actualTraverse: Array<Node[]>;
	@Input() depth: number;

  @Output() deleteNode:EventEmitter<object> = new EventEmitter<object>();

  delete(id:number, pid:number):void {
    this.deleteNode.emit({id:id, pid:pid});
  }

}

