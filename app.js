const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type Rootmutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: Rootmutation
        }
    `),
    rootValue: {
      events: () => {
        return ["Romantic Cooking", "Sailing", "All-night Coding"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Hello  World!");
});

app.listen(3000);
