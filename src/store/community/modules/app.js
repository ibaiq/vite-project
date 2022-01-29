import Cookie from "js-cookie";

const state = {
  sidebar:
    Cookie.get("sidebarStatus") === undefined
      ? true
      : Boolean(eval(Cookie.get("sidebarStatus"))),
  device: "desktop",
  sentence: "",
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    console.log("before", state.sidebar);
    state.sidebar = !state.sidebar;
    console.log("alter", state.sidebar);
    Cookie.set("sidebarStatus", state.sidebar);
  },
  CLOSE_SIDEBAR: (state) => {
    state.sidebar = false;
    Cookie.set("sidebarStatus", state.sidebar);
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SENTENCE: (state, sentence) => {
    state.sentence = sentence;
  },
};

const actions = {
  toggleSidebar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSidebar({ commit }) {
    commit("CLOSE_SIDEBAR");
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
