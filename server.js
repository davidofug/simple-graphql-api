const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = new buildSchema(`
	type Query {
		hello: String,
        rollDice(numDice: Int!, numSides: Int): [Int]
}`);

let root = {
	hello: () => {
		return "Hello World!";
	},
	rollDice: ({ numDice, numSides }) => {
		let output = [];
		for (let i = 0; i < numDice; i++) {
			output.push(1 + Math.floor(Math.random() * (numSides || 6)));
		}
		return output;
	},
};

const app = express();

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

app.listen(5555, () => console.log("Graphql server is running!"));
