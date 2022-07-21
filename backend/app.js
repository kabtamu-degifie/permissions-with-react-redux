const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { expressjwt: jwt } = require("express-jwt");

const { jwt_key, port } = require("./config/vars");
const mongoose = require("./config/mongoose");
const routes = require("./config/routes");
const v1Router = require("./routes/v1.router");

const error = require("./middlewares/error");

const app = express();

const expressSwagger = require("express-swagger-generator")(app);
const options = {
  swaggerDefinition: {
    info: {
      description: "This a node express framework boilerplate API",
      title: "NEBPT API",
      version: "1.0.0",
    },
    host: `localhost:${port}`,
    basePath: "/v1",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "authorization",
        description: "",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["./routes/**/*.js"], //Path to the API handle folder
};

expressSwagger(options);

// Open mongoose connection
mongoose.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(
  jwt({ secret: jwt_key, algorithms: ["HS256"] }).unless({
    path: routes.public,
  })
);

// Diffrent version of routers
app.use("/v1", v1Router);

app.use(error);

module.exports = app;
