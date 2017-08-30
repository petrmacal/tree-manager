import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Tree } from './model/tree';
import { Node } from './model/node';

@Injectable()
export class TreeService {

	private apiUrl = 'api/nodes';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http:Http) {};

	update(node: Node): Promise<Node> {
	  return this.http
	    .put(this.apiUrl + '/' + node.id, JSON.stringify(node), {headers: this.headers})
	    .toPromise()
	    .then(() => node)
	    .catch(this.handleError);
	}

	create(pid: number, data: string): Promise<Node> {
		return this.http
			.post(this.apiUrl, JSON.stringify({parent: pid, data: data}), {headers: this.headers})
			.toPromise()
			.then(response => response.json().data as Node)
			.catch(this.handleError);
	}

	delete(node: Node): Promise<void> {
		return this.http
			.delete(this.apiUrl + '/' + node.id, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	getNodes(): Promise<Node[]> {
		return this.http.get(this.apiUrl)
			.toPromise()
			.then(response => response.json().data as Node[])
			.catch(this.handleError);
	}

	getNode(id:number): Promise<Node> {
		return this.http.get(this.apiUrl + '/' + id)
			.toPromise()
			.then(response => response.json().data as Node)
			.catch(this.handleError);
	}	

	private handleError(error: any):Promise<any> {
		return Promise.reject(error.message || error);
	}
}
