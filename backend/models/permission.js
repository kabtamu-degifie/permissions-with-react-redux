const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

const validatePermission = (permission) => {
  const schema = Joi.object({
    id: Joi.objectId(),
    name: Joi.string().required().label("Name"),
  });
  return schema.validate(permission);
};

module.exports = {
  Permission: mongoose.model("Permissions", permissionSchema),
  validatePermission,
};
