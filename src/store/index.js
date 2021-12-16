import { createStore } from "vuex";
import getters from "./getters.js";
import { user, menu } from "./modules";

export default createStore({
  modules: {
    user,
    menu,
  },
  getters,
});
