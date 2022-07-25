import jwtDecoder from "jwt-decode";

const tokenKey = "token";

export function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function removeToken() {
  localStorage.removeItem(tokenKey);
}

export function getDecodedToken() {
  const token = getToken();
  if (!token) return false;
  const decode = jwtDecoder(token);
  return decode;
}

export function hasPermission(...permissions) {
  const decode = getDecodedToken();
  if (!decode) return false;
  return permissions.every((permission) =>
    decode.data.permissions.find(
      (rolePermission) => rolePermission === permission
    )
  );
}

export function getLoggedInUser() {
  const decode = getDecodedToken();
  if (!decode) return false;
  return decode.data;
}
