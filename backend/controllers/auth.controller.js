const _ = require("lodash");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwt_key } = require("../config/vars");

const login = async (req, res) => {
  const user = await User.findOne()
    .or([
      {
        username: req.body.username,
      },
      {
        email: req.body.email,
      },
    ])
    .populate({ path: "roles", populate: { path: "permissions" } });

  if (user && user.verifyPassword(req.body.password)) {
    // Maping roles => find permissions inside role => combine them and form set
    let permissions = user.roles.reduce((previousRole, currentRole) => {
      return [
        ...previousRole,
        ...currentRole.permissions.map((permission) => permission.name),
      ];
    }, []);
    user._doc.permissions = Array.from(
      new Set([
        ...user._doc.permissions.map((permission) => permission.name),
        ...permissions,
      ])
    );
    const token = jwt.sign({ data: user._doc }, jwt_key, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.send({ token });
  } else {
    return res.status(400).send("Invalid username / password.");
  }
};

module.exports = { login };
