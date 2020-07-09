const User = require("../../model/User");
const Expence = require("../../model/Expence");
// const { expence } = require("./User");

const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    // return db.users.filter((user) =>
    //   user.name.toLowerCase().includes(args.query.toLowerCase())
    // );
  },
  async currentMonthMoneyIn(parent, args, { db }, info) {
    const user = await User.findById("5f06b1a977762116a059e7cd");

    // console.log(user);

    const expences = await Expence.find({
      $and: [{ author: user._id }, { moneyStatus: { $eq: "MONEYIN" } }],
    });

    let sum = 0;
    expences.forEach((expence) => {
      sum = sum + expence.transactionAmount;
    });
    return sum;
  },
  async currentMonthMoneyOut(parent, args, { db }, info) {
    const user = await User.findById("5f06b1a977762116a059e7cd");

    // console.log(user);

    const expences = await Expence.find({
      $and: [{ author: user._id }, { moneyStatus: { $eq: "MONEYOUT" } }],
    });

    let sum = 0;
    expences.forEach((expence) => {
      sum = sum + expence.transactionAmount;
    });
    return sum;
  },
};

module.exports = Query;

// const Query = {
//   me() {
//     return {
//       id: 123,
//       name: "Shubham",
//       email: "shubhamkhunt08@gmail.com",
//       age: 21,
//     };
//   },

//   users(parent, args, { db }, info) {
//     if (!args.query) {
//       return db.users;
//     }
//     return db.users.filter((user) =>
//       user.name.toLowerCase().includes(args.query.toLowerCase())
//     );
//   },

//   posts(parent, args, { db }, info) {
//     if (!args.query) {
//       return db.posts;
//     }
//     return db.posts.filter(
//       (post) =>
//         post.title.toLowerCase().includes(args.query.toLowerCase()) ||
//         post.body.toLowerCase().includes(args.query.toLowerCase())
//     );
//   },

//   comments(parent, args, { db }, info) {
//     return db.comments;
//   },
// };

// export { Query as default };
