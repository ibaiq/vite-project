<template>
  <div class="app-wrapper" :class="classObj">
    <div
      v-if="device === 'mobile' && sidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <Sidebar class="sidebar-container" />
    <div class="main-container header-fixed">
      <Header :is-active="!sidebar" />
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, getCurrentInstance, onBeforeMount, watchEffect } from "vue";
import { useWindowSize } from "@vueuse/core";
import { Header, Sidebar, AppMain } from "@/layout/components";

const { proxy } = getCurrentInstance();
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

onBeforeMount(() => {
  let first = JSON.parse(sessionStorage.getItem("first"));
  const hour = new Date().getHours();
  const thisTime =
    hour < 8
      ? "早上好"
      : hour <= 11
      ? "上午好"
      : hour <= 13
      ? "中午好"
      : hour < 18
      ? "下午好"
      : "晚上好";
  if (!first) {
    proxy.$notify.success({
      title: thisTime + " " + store.getters.user.nickname,
      message: "欢迎来到Ibaiq后台管理系统",
      duration: 3000,
    });
    sessionStorage.setItem("first", JSON.stringify(true));
  }
});

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
