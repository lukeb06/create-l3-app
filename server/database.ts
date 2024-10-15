import { hash } from 'bun';
import { Database } from 'bun:sqlite';

const db = new Database('database.db');

const sql = (query: TemplateStringsArray, ...args: any[]) => {
	let queryString = '';
	let queryArr = Array.from(query);

	while (queryArr.length > 0 || args.length > 0) {
		queryString += (queryArr.shift() || '') + (args.shift() || '');
	}

	return db.query(queryString);
};

class Column {
	name: string;
	type: string;
	nullable: boolean;
	id: string;

	constructor(name: string, type: string, identifier: string, nullable: boolean = false) {
		this.name = name;
		this.type = type;
		this.nullable = nullable;
		this.id = identifier;
	}

	toString() {
		return `${this.name} ${this.type}${this.nullable ? '' : ' NOT NULL'} ${this.id}`;
	}
}

class PrimaryKey extends Column {
	constructor(name: string = 'id') {
		super(name, 'INTEGER', 'PRIMARY KEY AUTOINCREMENT');
	}
}

function createTable(tableName: string, columns: Column[]) {
	return sql`
		CREATE TABLE ${tableName}(
			${columns.map(c => c.toString()).join(', ')}
		);
	`.run();
}

function dropTable(tableName: string) {
	try {
		return sql`DROP TABLE ${tableName}`.run();
	} catch {
		return null;
	}
}

function buildDatabase() {}

function testDatabase() {
	buildDatabase();
}

testDatabase();
