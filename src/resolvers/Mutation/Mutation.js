const uuidv4 = require("uuid/v4");
const User = require("../../model/User");
const Expence = require("../../model/Expence");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const Mutation = {
  async registerUser(parent, args,ctx, info) {
    const getUser = await User.find({ email: args.data.email });

    if (getUser.length) {
      throw new Error("User Already Exists !! Please Enter another Email !!");
    }

    const user = new User({
      ...args.data,
    });
    await user.save();
    return user;

    return {
      id: "1",
      username: "shubham",
      password: "Hello",
      email: "hello@g,mail",
    };

    //     console.log(Context);

    //     return User.find({ email: args.data.email })
    //       .then((res) => {
    //         return res;
    //       })
    //       .then((result) => {
    //         if (result.length === 0) {
    //           const user = new User({
    //             ...args.data,
    //           });
    //           user.save();
    //           return user;
    //         } else {
    //           throw new Error(
    //             "User Already Exists !! Please Enter another Email !!"
    //           );
    //         }
    //       });
  },

  async loginUser(parent, args, ctx, info) {
    const { username, password } = args.data;

    // console.log(ctx.getUserId());
    // const Id = Context.getUserId();
    // console.log(ctx.getUserId());
// console.log(context.getUserId());

console.log(ctx);
// const {userId}= ctx.getUserId();
// console.log("userId",userId);

    const user = await User.find({ username: username });
    // If any User not Found then throw error
    if (user.length === 0) {
      throw new Error("User Not Found");
    } else if (user[0].password !== password) {
      throw new Error("Password is Wrong");
    }
    getToken = (user) => {
      return jwt.sign({ user: user }, "123654", {
        expiresIn: 3600,
      }); // valid -> 1 hour
    };
    return { token: getToken() };
  },

  async createExpence(parent, args, { db, Context }, info) {
    // return User.findById("5f0591b1d5b6782a74e99720") // userId

    const user = await User.findById("5f06b1a977762116a059e7cd");

    console.log(user);

    const expence = new Expence({
      ...args.data,
      author: user._id,
    });

    await expence.save();
    return expence;
    // return {
    //   id: "1",
    //   title: "new kdklmmee",
    //   moneyStatus: "MONEYIN",
    //   transactionAmount: 100,
    //   date: "10",
    // };
  },

  async deleteExpence(parent, args, { db }, info) {
    // const user = await User.findById("5f0690445ba8192644e4bf58");

    console.log(args.id);
    const expence = await Expence.findByIdAndDelete(args.id);

    if (expence === null) {
      throw new Error("Item not Found");
    }
    return expence;
    // const expenceIndex = user.expences.findIndex(
    //   (expenceId) => String(expenceId) === args.id
    // );

    // if (expenceIndex === -1) {
    //   throw new Error("Expence not Found");
    // }
    // // const expence = await Expence.findById(user.expences[expenceIndex]);
    // // console.log(user.expences[expenceIndex]);
    // const deletedExpence = await Expence.findByIdAndDelete(
    //   user.expences[expenceIndex]
    // );
    // user.expences.splice(expenceIndex, 1);
    // await user.save();

    // const expence = await Expence.findById(args.id);
    // await deletedExpence.save();

    // return deletedExpence;
    // return {
    //   id: "1",
    //   title: "bath wash",
    //   moneyStatus: "MONEYIN",
    //   transactionAmount: 200,
    //   date: "30",
    // };
  },

  async updateExpence(parent, args, { db }, info) {
    // const expence = db.expences.find((expence) => expence.id === id);
    // console.log(args.data);
    const user = await User.findById("5f06b1a977762116a059e7cd");
    // const expenceId = user.expences.find(
    //   (expenceId) => String(expenceId) === args.id
    // );
    // console.log(expenceId);
    // const update = {
    //   title:args.data.title,
    //   moneyStatus:args.data.moneyStatus,
    //   transactionAmount:args.data.transactionAmount,
    //   date:args.data.date
    // }
    // { $set: { name: 'jason bourne' }}
    console.log("args", args.data);

    const updatedExpence = await Expence.findByIdAndUpdate(
      args.id,
      { ...args.data },
      { new: true }
    );
    return updatedExpence;

    // return {
    //   id: "1",
    //   title: "bath wash",
    //   moneyStatus: "MONEYIN",
    //   transactionAmount: 200,
    //   date: "30",
    // };
  },
};

module.exports = Mutation;
