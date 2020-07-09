const User = require("../../model/User");
const Expence = require("../../model/Expence");

const Query = {
  async userDetail(parent, args, ctx, info) {
    const { userId } = ctx.getUserId();
    // Finding perticular user details
    const user = await User.findById(userId);
    return user;
  },

  async expences(parent, args, ctx, info) {
    // checking auth. header is valid or not !
    const { userId } = ctx.getUserId();

    // Find perticular user expences
    const expences = await Expence.find({ author: userId });
    return expences;
  },

  async currentMonthMoneyIn(parent, args, ctx, info) {
    let [day, month, year] = args.date.split("-");

    // check auth. header
    const { userId } = ctx.getUserId();
    const user = await User.findById(userId);

    // store all matched expences into expences
    const expences = await Expence.find({
      $and: [{ author: user._id }, { moneyStatus: { $eq: "MONEYIN" } }],
    });

    // initialy zero
    let expenceMoneyIn = 0;
    expences.forEach((expence) => {
      // check month is equl or not
      if (expence.date.split("-")[1] === month) {
        expenceMoneyIn = expenceMoneyIn + expence.transactionAmount;
      }
    });
    // total receive money
    return expenceMoneyIn;
  },

  async currentMonthMoneyOut(parent, args, ctx, info) {
    let [day, month, year] = args.date.split("-");

    // check auth. header
    const { userId } = ctx.getUserId();
    const user = await User.findById(userId);

    // store all matched expences into expences
    const expences = await Expence.find({
      $and: [{ author: user._id }, { moneyStatus: { $eq: "MONEYOUT" } }],
    });

    // initialy zero
    let expenceMoneyOut = 0;
    expences.forEach((expence) => {
      // check month is equl or not
      if (expence.date.split("-")[1] === month) {
        expenceMoneyOut = expenceMoneyOut + expence.transactionAmount;
      }
    });

    // total paid money
    return expenceMoneyOut;
  },
};

module.exports = Query;
