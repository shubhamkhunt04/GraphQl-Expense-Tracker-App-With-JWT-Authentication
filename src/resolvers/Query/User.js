// const { model } = require("mongoose");

const User = {
    expence(parent, args, { db }, info) {
      console.log(db);
      return(
        [
          {
            id: "1",
            title: "expence 1",
            money: 100,
            type: "IN",
            date: "10",
            author: "1",
          },
          {
            id: "1",
            title: "expence 2",
            money: 200,
            type: "IN",
            date: "10",
            author: "1",
          },
          {
            id: "1",
            title: "expence 3",
            money: 300,
            type: "IN",
            date: "10",
            author: "2",
          },
        ]
      )
    },
  
    // posts(parent, args, { db }, info) {
    //   return db.posts.filter((post) => post.author === parent.id);
    // },
  
    // comments(parent, args, { db }, info) {
    //   return db.comments.filter((comment) => comment.author === parent.id);
    // },
  };
  
module.exports = User;
  