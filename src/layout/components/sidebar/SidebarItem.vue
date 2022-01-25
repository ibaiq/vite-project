<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || !onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <AppLink
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path, onlyOneChild.query)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path, undefined)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg
            v-if="onlyOneChild.meta.icon.includes('#')"
            class="svg-icon"
            aria-hidden="true"
          >
            <use :href="onlyOneChild.meta.icon"></use>
          </svg>
          <!--<i v-else class="iconfont" :class="onlyOneChild.meta.icon" />-->
          <template #title>
            <span>{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(basePath + item.path, undefined)"
      popper-append-to-body
    >
      <template v-if="item.meta" #title>
        <svg
          v-if="onlyOneChild.meta.icon.includes('#')"
          class="svg-icon"
          aria-hidden="true"
        >
          <use :href="onlyOneChild.meta.icon"></use>
        </svg>
        <!--<i v-else class="iconfont" :class="onlyOneChild.meta.icon" />-->
        <span>{{ item.meta.title }}</span>
      </template>

      <SidebarItem
        v-for="child in item.children"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path, undefined)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { isExternal } from "@/utils/validate.js";
import { getNormalPath } from "@/utils/ibaiq.js";
import AppLink from "./Link.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const onlyOneChild = ref({});

const hasOneShowingChild = (children = [], parent) => {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

const resolvePath = (routePath, routeQuery) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery);
    return {
      path: getNormalPath(
        props.basePath.replace(/\/$/, "") +
          (routePath.length !== 0 ? "/" + routePath : routePath)
      ),
      query: query,
    };
  }
  return getNormalPath(
    props.basePath.replace(/\/$/, "") +
      (routePath.length !== 0 ? "/" + routePath : routePath)
  );
};
</script>

<style lang="scss" scoped>
.el-menu-item.is-active {
  border-right: 0.15rem solid #409eff;
  transition: border-right-width 0.15s;
  background: rgba(64, 158, 255, 0.1);
}
</style>
