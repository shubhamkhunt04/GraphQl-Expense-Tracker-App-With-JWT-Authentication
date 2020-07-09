const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const Query = require("./src/resolvers/Query/Query");
const User = require("./src/resolvers/Query/User");
const Expence = require("./src/resolvers/Query/Expence");
const Mutation = require("./src/resolvers/Mutation/Mutation");
const db = require("./db");
const context =require("./src/context/context");

const server = new GraphQLServer({
  typeDefs: "./src/graphql/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Expence,
  },
  context: {
    context
    // UserModel,
  },
});

mongoose
  .connect("mongodb://localhost:27017/Expence", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected !!");
    server.start(() => {
      console.log("Hey Shubham ,Server is Up !!!");
    });
  })
  .catch((err) => console.log(err));

// import { GraphQLServer } from "graphql-yoga";
// import db from "./db";
// import Query from "./resolvers/Query";
// import Mutation from "./resolvers/Mutation";
// import User from "./resolvers/User";
// import Post from "./resolvers/Post";
// import Comment from "./resolvers/Comment";

// const server = new GraphQLServer({
//   typeDefs: "./src/schema.graphql",
//   resolvers: {
//     Query,
//     Mutation,
//     User,
//     Post,
//     Comment,
//   },
//   context: {
//     db,
//   },
// });

// server.start(() => {
//   console.log("Hey Shubham ,Server is Up !!!");
// });
