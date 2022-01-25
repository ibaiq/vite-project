export function getNormalPath(p) {
  if (p.length === 0 || !p) {
    return p;
  }
  let res = p.replace("//", "/");
  if (res[res.length - 1] === "/") {
    return res.slice(0, res.length - 1);
  }
  return res;
}
