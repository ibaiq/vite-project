<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-for="(item, index) in topMenus">
      <el-menu-item
        :index="item.path"
        :key="index"
        v-if="index < data.visibleNumber"
      >
        <svg
          v-if="item.meta.icon.includes('#')"
          class="svg-icon"
          aria-hidden="true"
        >
          <use :href="item.meta.icon"></use>
        </svg>
        <i v-else :class="'iconfont ' + item.meta.icon" />
        {{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { isHttp } from "@/utils/validate.js";
import { getNormalPath } from "@/utils/ibaiq.js";

const store = useStore();
const route = useRoute();
const router = useRouter();

const data = reactive({
  // 顶部栏初始数
  visibleNumber: null,
  // 是否为首次加载
  isFrist: false,
  // 当前激活菜单的 index
  currentIndex: undefined,
});

// 所有的路由信息
const routers = computed(() => store.getters.topNav);

// 顶部显示菜单
const topMenus = computed(() => {
  let topMenus = [];
  routers.value.map((menu) => {
    if (menu.hidden !== true) {
      topMenus.push(menu);
    }
  });
  return topMenus;
});

// 设置子路由
const childrenMenus = computed(() => {
  let childrenMenus = [];
  routers.value.map((router) => {
    for (let item in router.children) {
      if (router.children[item].parentPath === undefined) {
        if (!isHttp(router.children[item].path)) {
          // router.children[item].path = path.resolve(
          //   router.path,
          //   router.children[item].path
          // );
          router.children[item].path =
            router.path + "/" + router.children[item].path;
          getNormalPath(router.path + router.children[item].path);
        }
        router.children[item].parentPath = router.path;
      }
      childrenMenus.push(router.children[item]);
    }
  });
  return childrenMenus;
});

// 默认激活的菜单
const activeMenu = computed(() => {
  const current = route.path;
  let activePath = defaultRouter.value;
  if (current.lastIndexOf("/") > 0) {
    const tmpPath = current.substring(activePath.length + 1, current.length);
    // activePath = path.resolve(
    //   defaultRouter.value,
    //   tmpPath.substring(0, tmpPath.indexOf("/"))
    // );
    activePath = getNormalPath(
      defaultRouter.value + "/" + tmpPath.substring(0, tmpPath.indexOf("/"))
    );
  } else if (defaultRouter.value === current || "" === current) {
    if (!data.isFrist) {
      data.isFrist = true;
    } else {
      activePath = defaultRouter.value;
    }
  }
  let routes = activeRoutes(activePath);
  if (routes.length === 0) {
    activePath = data.currentIndex || defaultRouter.value;
    activeRoutes(activePath);
  }
  return activePath;
});

// 默认激活的路由
const defaultRouter = computed(() => {
  let router;
  Object.keys(routers.value).some((key) => {
    if (!routers.value[key].hidden) {
      router = routers.value[key].path;
      return true;
    }
  });
  return router;
});

function setVisibleNumber() {
  const width = document.body.getBoundingClientRect().width / 3;
  data.visibleNumber = parseInt(width / 85);
}

function handleSelect(key, keyPath) {
  data.currentIndex = key;
  if (isHttp(key)) {
    // http(s):// 路径新窗口打开
    window.open(key, "_blank");
  } else if (key.indexOf("/redirect") !== -1) {
    // /redirect 路径内部打开
    router.push({ path: key.replace("/redirect", "") });
  } else {
    // 显示左侧联动菜单
    activeRoutes(key);
  }
}

function activeRoutes(key) {
  let routes = [];
  if (childrenMenus.value && childrenMenus.value.length > 0) {
    childrenMenus.value.map((item) => {
      if (key === item.parentPath) {
        routes.push(item);
      }
    });
  }
  if (routes.length > 0) {
    for (let i = 0; i < routes.length; i++) {
      if (!routes[i].path.includes(defaultRouter.value)) {
        routes[i].path = defaultRouter.value + routes[i].path;
      }
    }
    store.commit("menu/SET_MENUS", routes);
  }
  return routes;
}

onMounted(() => {
  window.addEventListener("resize", setVisibleNumber);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", setVisibleNumber);
});

onMounted(() => {
  setVisibleNumber();
});
</script>

<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item {
  background: none !important;
  float: left;
  font-size: 12px;
  height: 50px;
  line-height: 50px;
  border-bottom: 0;
  color: #999093;
  padding: 0 2px 0 0;
  margin: 0 10px;

  .icon {
    margin-right: 5px;
  }

  :is(.is-active) {
    background: none !important;
  }
}

.el-menu--horizontal > .el-menu-item.is-active {
  background: none !important;
  border: 0;
  color: #303133;
}
</style>
