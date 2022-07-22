const { Role, validateRole } = require("../models/role");

const get = async (req, res) => {
  const role = await Role.findById(req.params.id);
  if (!role) return res.status(404).send("The role is not found.");
  res.status(200).send(role);
};

const all = async (req, res) => {
  const roles = await Role.find();
  res.status(200).send(roles);
};

const create = async (req, res) => {
  const validation = validateRole(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  let role = await Role.findOne({ name: req.body.name });
  if (role)
    return res
      .status(400)
      .send(`The name '${req.body.name}' has already taken.`);

  role = new Role(req.body);
  role = await role.save();
  res.status(201).send(role);
};

const update = async (req, res) => {
  const { id } = req.params;
  const validation = validateRole({ ...req.body, id });
  if (validation.error) return res.send(validation.error.details[0].message);

  let role = await Role.findById(id);
  if (!role) return res.status(404).send("Role is not found");

  let otherRole = await Role.findOne().and([
    {
      name: req.body.name,
      _id: { $ne: role.id },
    },
  ]);

  if (otherRole)
    return res
      .status(400)
      .send(`The name '${req.body.name}' has already taken.`);

  role = await Role.findByIdAndUpdate(
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

  res.status(200).send(role);
};

const remove = async (req, res) => {
  const { id } = req.params;
  let role = await Role.findById(id);
  if (!role) return res.status(404).send("Role is not found");

  role = await Role.findByIdAndDelete(id);

  res.status(200).send(role);
};

module.exports = { get, all, create, update, remove };
