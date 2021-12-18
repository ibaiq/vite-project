import Cookie from "js-cookie";

const tokenKey = "Authorization";

export function getToken() {
  return Cookie.get(tokenKey);
}

export function setToken(token) {
  Cookie.set(tokenKey, token, { expires: 1 });
}

export function remove() {
  Cookie.remove(tokenKey);
}
