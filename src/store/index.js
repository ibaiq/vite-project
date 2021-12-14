import { createStore } from "vuex";
import getters from "./getters.js";
import { user } from "./modules/index.js";

export default createStore({
  modules: {
    user,
  },
  getters,
});
