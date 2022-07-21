const { User, validateUser } = require("../models/user");
const _ = require("lodash");

const get = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("The user is not found.");
  res.status(200).send(user);
};

const all = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

const create = async (req, res) => {
  const validation = validateUser(req.body);
  if (validation.error) return res.send(validation.error.details[0].message);

  let user = await User.findOne().or([
    {
      username: req.body.username,
    },
    {
      email: req.body.email,
    },
  ]);

  if (user) {
    if (req.body.username === user?.username) {
      return res.send(`The username '${req.body.username}' has already taken.`);
    }
    if (req.body.email === user?.email) {
      return res.send(`The email '${req.body.email}' has already taken.`);
    }
  }

  user = new User(req.body);
  user = await user.save();
  res.status(201).send(_.pick(user, ["_id", "username", "email"]));
};

const update = async (req, res) => {
  const { id } = req.params;
  const validation = validateUser({ ...req.body, id });
  if (validation.error) return res.send(validation.error.details[0].message);

  let user = await User.findById(id);
  if (!user) return res.status(404).send("User is not found");

  let otherUser = await User.findOne().and([
    {
      $or: [
        {
          username: req.body.username,
        },
        {
          email: req.body.email,
        },
      ],
      _id: { $ne: user.id },
    },
  ]);

  if (otherUser) {
    if (otherUser.username === req.body.username) {
      return res.send(`The username '${req.body.username}' has already taken.`);
    }
    if (otherUser.email === req.body.email) {
      return res.send(`The email '${req.body.email}' has already taken.`);
    }
  }

  user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).send(user);
};

module.exports = { get, all, create, update };
