const { Permission } = require("../models/permission");
const _ = require("lodash");

const get = async (req, res) => {
  const permission = await Permission.findById(req.params.id);
  if (!permission) return res.status(404).send("The permission is not found.");
  res.status(200).send(permission);
};

const all = async (req, res) => {
  const permissions = await Permission.find();
  res.status(200).send(permissions);
};

module.exports = { get, all };
