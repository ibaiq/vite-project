// import user from "./modules/user.js";
// import menu from "./modules/menu.js";
//
// export { user, menu };

const files = import.meta.globEager("./modules/*.js");
let modules = {};

for (let key in files) {
  modules[key.replace(/^\.\/modules\/|\.js$/g, "")] = files[key].default;
}

export default modules;
