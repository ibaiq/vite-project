import Cookie from "js-cookie";

const tokenKey = "Authorization";

export function getToken() {
  return Cookie.get(tokenKey);
}

export function setToken(token) {
  Cookie.set(tokenKey, token);
}

export function remove() {
  Cookie.remove(tokenKey);
}
