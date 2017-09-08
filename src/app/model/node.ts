export class Node {
	id: number;
	data: string;
	parent: number|null;
	children?: Node[];

	constructor(data:string,parent:number) {
		this.data = data;
		this.children = [];
	}
}