const path = require("path");

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, "../.env"),
  sample: path.join(__dirname, "../.env.example"),
  allowEmptyValues: true,
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri:
      process.env.NODE_ENV == "development"
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI,
  },
  canLogToConsole: process.env.NODE_ENV == "development",
  canLogToFile: process.env.NODE_ENV == "production",
  jwt_key: process.env.JWT_PRIVATE_KEY,
};
