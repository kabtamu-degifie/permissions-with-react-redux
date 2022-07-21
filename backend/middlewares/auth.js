const hasPermission = (...permissions) => {
  return (req, res, next) => {
    const user = req.auth;
    const errors = [];
    try {
      if (user) {
        permissions.forEach((permission) => {
          if (!user.data.permissions.includes(permission)) {
            errors.push(`You don't have ${permission} permission`);
          }
        });

        if (errors.length === 0) {
          next();
        } else {
          throw new Error("You dont have permission to perform this action.");
        }
      }
    } catch (error) {
      res.status(401).send([...errors, error]);
    }
  };
};

module.exports = { hasPermission };
