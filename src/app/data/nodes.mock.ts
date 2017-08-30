import { Node } from '../model/node';

export const NODES:Node[] = [
	{id: 1, data: 'Root', parent: null},
	{id: 2, data: 'Node 1', parent: 1},
	{id: 3, data: 'Node 2', parent: 1},
	{id: 4, data: 'Node 3', parent: 1},
	{id: 5, data: 'Node 4', parent: 3},
	{id: 6, data: 'Node 5', parent: 3},
	{id: 7, data: 'Node 6', parent: 6},
	{id: 8, data: 'Node 7', parent: 7},
	{id: 9, data: 'Node 8', parent: 2},
	{id: 10, data: 'Node 9', parent: 9},
	{id: 11, data: 'Node 10', parent: 9},
	{id: 12, data: 'Node 11', parent: 11}
];