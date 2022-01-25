import user from "./modules/user.js";
import menu from "./modules/menu.js";
import app from "./modules/app.js";

// 以文件引入没有提示
// const files = import.meta.globEager("./modules/*.js");
// let modules = {};
// for (let key in files) {
//   modules[key.replace(/^\.\/modules\/|\.js$/g, "")] = files[key].default;
// }

const modules = { user, menu, app };

export default modules;
