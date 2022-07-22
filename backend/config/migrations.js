const permissions = [
  "view_user",
  "create_user",
  "update_user",
  "remove_user",

  "view_role",
  "create_role",
  "update_role",
  "remove_role",

  "view_permission",
  "create_permission",
  "update_permission",
  "remove_permission",
];

const roles = {
  admin: [...permissions],
  user: [],
};

const users = [
  {
    roles: ["admin"],
    username: "admin",
    email: "admin@admin.com",
    password: "12345678",
  },
];

module.exports = { users, roles, permissions };
