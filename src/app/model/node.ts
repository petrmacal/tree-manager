export class Node {
	id: number;
	data: string;
	parent: number|null;
	children?: [Node];
}