import { createStore } from "vuex";
import getters from "./getters.js";
// import { user, menu } from "./community/index.js";
import modules from "./community/index.js";

export default createStore({
  modules,
  getters,
});
