const User = require("../../model/User");
const Expence = require("../../model/Expence");
const jwt = require("jsonwebtoken");

const Mutation = {
  async registerUser(parent, args, ctx, info) {
    const getUser = await User.find({ email: args.data.email });
    //If user not found then show error
    if (getUser.length) {
      throw new Error("User Already Exists !! Please Enter another Email !!");
    }

    const user = new User({
      ...args.data,
    });

    // saving user details into DB
    await user.save();
    return user;
  },

  async loginUser(parent, args, ctx, info) {
    const { username, password } = args.data;

    const user = await User.find({ username: username });
    // If any User not Found then throw error
    if (user.length === 0) {
      throw new Error("User Not Found");
    }
    // If passwords are not match then throw error
    else if (user[0].password !== password) {
      throw new Error("Password is Wrong");
    }

    // Generate Token
    getToken = () => {
      return jwt.sign({ user: user }, "123654", {
        expiresIn: 3600000,
      });
    };
    // sending token to client side
    return { token: getToken() };
  },

  async createExpence(parent, args, ctx, info) {
    // checking auth. header is valid or not !
    const { userId } = ctx.getUserId();
    const user = await User.findById(userId);

    const expence = new Expence({
      ...args.data,
      author: user._id,
    });

    // saving new expece into DB
    await expence.save();
    return expence;
  },

  async deleteExpence(parent, args, ctx, info) {
    // checking auth. header is valid or not !
    const { userId } = ctx.getUserId();
    const user = await User.findById(userId);

    // check user access(users are not delete another user expences )
    const findExpence = await Expence.findById(args.id);

    if (findExpence.author !== userId) {
      throw new Error("You Are Unauthorize");
    }

    // find target expence and delete
    const expence = await Expence.findByIdAndDelete(args.id);

    if (expence === null) {
      throw new Error("Expence item not Found");
    }
    return expence;
  },

  async updateExpence(parent, args, ctx, info) {
    // checking auth. header is valid or not !
    const { userId } = ctx.getUserId();
    const user = await User.findById(userId);

    // check user access(users are not update another user expences )
    const findExpence = await Expence.findById(args.id);

    if (findExpence.author !== userId) {
      throw new Error("You Are Unauthorize");
    }

    // updating expence
    const updatedExpence = await Expence.findByIdAndUpdate(
      args.id,
      { ...args.data },
      { new: true }
    );
    return updatedExpence;
  },
};

module.exports = Mutation;
