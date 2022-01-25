<template>
  <div class="has-logo">
    <Logo :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="!isCollapse"
        :default-active="activeMenu"
        :collapse-transition="false"
      >
        <SidebarItem
          v-for="(route, index) in sidebarRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="Manage[0].path + '/' + route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from "./Logo.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import SidebarItem from "@/layout/components/sidebar/SidebarItem.vue";
import Manage from "@/router/manage.js";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const sidebarRoutes = computed(() => store.getters.menus);
const isCollapse = computed(() => store.getters.sidebar);

const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style scoped></style>
