// Inbuild Module
const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");

// User define Module
const Query = require("./src/resolvers/Query/Query");
const User = require("./src/resolvers/Query/User");
const Expence = require("./src/resolvers/Query/Expence");
const Mutation = require("./src/resolvers/Mutation/Mutation");
const { context } = require("./src/context/context");

// Creating Server
const server = new GraphQLServer({
  typeDefs: "./src/graphql/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Expence,
  },
  context,
});

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/Expence", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
  })
  .then(() => {
    console.log("Mongodb connected successfully!!");
    // if db connection is successfully establish then start server.
    server.start(() => {
      console.log("Hey Shubham ,Server is Runnig at  http://localhost:4000");
    });
  })
  .catch((err) => console.log(err));
