const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permissions" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roles", roleSchema);
