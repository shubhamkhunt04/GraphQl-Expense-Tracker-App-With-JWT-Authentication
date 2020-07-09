const users = [
    {
      id: "1",
      name: "Shubham",
      email: "shubham@gmail.com",
    },
    {
      id: "2",
      name: "Ankit",
      email: "Ankit@gmail.com",
    },
  ];
  
  const expences = [
    {
      id:"101",
      title:"Expence 1 test1",
      moneyStatus:'MONEYIN',
      transactionAmount: 25,
      date: 10,
      author: "1"
    },
    {
      id:"102",
      title:"Expence 2 test2",
      moneyStatus:'MONEYOUT',
      transactionAmount: 50,
      date: 10,
      author: "1"
    },
    {
      id:"103",
      title:"Expence 3 test3",
      moneyStatus:'MONEYIN',
      transactionAmount: 75,
      date: 10,
      author: "2"
    },
    {
      id:"104",
      title:"Expence 4 test4",
      moneyStatus:'MONEYOUT',
      transactionAmount: 100,
      date: 10,
      author: "3"
    },
    
  ];
  
  // const todos = [
  //   {
  //     id:"1",
  //     title:"wash car",
  //     isCompleted:false,
  //     author:"1"
  //   },
  //   {
  //     id:"2",
  //     title:"complete homework",
  //     isCompleted:false,
  //     author:"1"
  //   },
  //   {
  //     id:"3",
  //     title:"watch tutorial",
  //     isCompleted:false,
  //     author:"2"
  //   },
  // ]
  
  const db = {
    users,
    expences,
  };
  
  module.exports = db;
  
  // // Dummy Users Data
  
  // const users = [
  //   {
  //     id: "1",
  //     name: "Shubham",
  //     email: "shubham@gmail.com",
  //     age: 20,
  //   },
  //   {
  //     id: "2",
  //     name: "Ankit",
  //     email: "Ankit@gmail.com",
  //     age: 22,
  //   },
  //   {
  //     id: "3",
  //     name: "Mohit",
  //     email: "Mohit@gmail.com",
  //     age: 21,
  //   },
  // ];
  
  // // Dumny Post Data
  
  // const posts = [
  //   {
  //     id: "1",
  //     title: "Hello world",
  //     body: "this is post title",
  //     published: true,
  //     author: "1",
  //   },
  //   {
  //     id: "2",
  //     title: "GraphQL Server",
  //     body: "GraphQl yoga Server",
  //     published: true,
  //     author: "1",
  //   },
  //   {
  //     id: "3",
  //     title: "REST API",
  //     body: "REST API using node.js",
  //     published: true,
  //     author: "2",
  //   },
  // ];
  
  // // Dummy Comments data
  
  // const comments = [
  //   {
  //     id: "102",
  //     text: "Awsome GraphQL server",
  //     author: "1",
  //     post: "1",
  //   },
  //   {
  //     id: "103",
  //     text: "nice post",
  //     author: "2",
  //     post: "1",
  //   },
  //   {
  //     id: "104",
  //     text: "fantastic explanation in post",
  //     author: "2",
  //     post: "2",
  //   },
  //   {
  //     id: "105",
  //     text: "rest api is amazing",
  //     author: "3",
  //     post: "3",
  //   },
  // ];
  
  // const db = {
  //   users,
  //   posts,
  //   comments,
  // };
  