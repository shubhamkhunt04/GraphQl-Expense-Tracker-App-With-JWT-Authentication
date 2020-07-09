const jwt = require("jsonwebtoken");

const context = ({ request, response }) => {
  return {
    getUserId: () => {
      const authorization = request.headers.authorization;
      if (authorization) {
        // Getting Token from header
        const token = authorization.split(" ")[1];

        if (token && token !== "") {
          // verify: token is valid or not
          user = jwt.verify(token, "123654");
        }
      } else {
        throw new Error("No authorization header found!!");
      }
      return {
        userId: user.user[0]._id,
      };
    },
  };
};

module.exports = { context };
