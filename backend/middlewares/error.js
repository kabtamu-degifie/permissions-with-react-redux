module.exports = (error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    res.status(401).send(error.message);
  }

  if (error.name === "CastError" && error.kind === "ObjectId") {
    res.status(401).send("Invalid ObjectId format.");
  }

  res.status(500).send("Something went wrong!");
};
