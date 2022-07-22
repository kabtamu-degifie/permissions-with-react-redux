const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permissions" }],
  },
  {
    timestamps: true,
  }
);

const validateRole = (role) => {
  const schema = Joi.object({
    id: Joi.objectId(),
    name: Joi.string().required().label("Name"),
  });
  return schema.validate(role);
};

module.exports = {
  Role: mongoose.model("Roles", roleSchema),
  validateRole,
};
