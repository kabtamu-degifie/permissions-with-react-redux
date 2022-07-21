const mongoose = require("mongoose");
const logger = require("../config/logger");
const { mongo } = require("./vars");

const {
  migrateUsers,
  migratePermissions,
  migrateRoles,
} = require("../lib/migration.lib");

/**
 * Connect to Mongodb
 *
 * @returns {object} mongoose connection
 * @public
 *
 */
exports.connect = () => {
  mongoose
    .connect(mongo.uri, {
      keepAlive: true,
    })
    .then(async () => {
      logger.info("MongoDB is connected...");
      await migratePermissions();
      await migrateRoles();
      await migrateUsers();
    });

  return mongoose.connection;
};
