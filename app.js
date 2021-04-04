require("dotenv").config(); // Load all environment variable
// Inbuild Module
const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const cors = require("cors");

// User define Module
const Query = require("./src/resolvers/Query/Query");
const Mutation = require("./src/resolvers/Mutation/Mutation");
const { context } = require("./src/context/context");

// Creating GraphQLServer Server
const server = new GraphQLServer({
  typeDefs: "./src/graphql/schema.graphql",
  resolvers: {
    Query,
    Mutation,
  },
  context,
});

const options = {
  port: 3002,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

// Database Connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected successfully!!");
    // if db connection is successfully establish then start server.
    server.start(options, ({ port }) => {
      console.log(`Hey Shubham ,Server is Runnig at  http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
