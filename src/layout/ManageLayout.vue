<template>
  <div :class="classObj">
    <div
      v-if="device === 'mobile' && sidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Header :is-active="!sidebar" />
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { useStore } from "vuex";
import { computed, watchEffect } from "vue";
import { useWindowSize } from "@vueuse/core";
import { Header, Sidebar } from "@/layout/components";

const store = useStore();

const sidebar = computed(() => store.getters.sidebar);
const device = computed(() => store.getters.device);
const classObj = computed(() => ({
  hideSidebar: !sidebar.value,
  openSidebar: sidebar.value,
  mobile: device.value === "mobile",
}));

const { width } = useWindowSize();
const WIDTH = 992;

watchEffect(() => {
  if (width.value - 1 < WIDTH) {
    store.dispatch("app/toggleDevice", "mobile");
  } else {
    store.dispatch("app/toggleDevice", "desktop");
  }
});

const handleClickOutside = () => {
  store.dispatch("app/closeSidebar");
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/mixin";

.el-container {
  display: block;
}

.app-wrapper {
  @include clearfix;
  height: 100%;
  width: 100%;
  position: relative;
}

.drawer-bg {
  background: black;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
