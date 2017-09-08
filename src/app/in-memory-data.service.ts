import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const nodes = [
			{id: 1, parent: null, data: 'Root', children: []}
		];

		return {nodes};
	}
}