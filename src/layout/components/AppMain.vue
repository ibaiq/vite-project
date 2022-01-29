<template>
  <el-container class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-container>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";

let store = useStore();
const route = useRoute();
// store.dispatch("tagsView/addCachedView", route);
// const cachedViews = computed(() => {
//   return store.state.tagsView.cachedViews;
// });
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 15px 15px;
}
</style>
