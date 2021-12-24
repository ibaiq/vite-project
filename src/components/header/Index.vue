<template>
  <el-header class="header">
    <div v-if="data.isLogin" class="header-right">
      <el-avatar :src="data.user.avatar" :size="35" @error="true">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          alt=""
        />
      </el-avatar>
      <el-dropdown>
        <span>
          {{ data.user.nickname }}
          <el-icon>
            <CaretBottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item
              v-if="data.user.admin"
              @click="$router.push(manage[0].path)"
              >后台系统
            </el-dropdown-item>
            <el-dropdown-item @click="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div v-else class="header-right">
      <router-link to="/login">登录</router-link>
    </div>
  </el-header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
import { useStore } from "vuex";
import manage from "@/router/manage.js";

const router = useRouter();
const route = useRoute();
const store = useStore();
const data = reactive({
  user: {},
  isLogin: false,
});

if (store.getters.token) {
  data.isLogin = true;
  if (!store.getters.user) {
    store
      .dispatch("user/Profile")
      .then((res) => {
        data.user = res.data;
      })
      .catch(() => {
        data.isLogin = false;
      });
  } else {
    data.isLogin = true;
    data.user = store.getters.user;
  }
} else {
  data.isLogin = false;
}

const logout = async () => {
  store.commit("menu/SET_MENUS", []);
  store.commit("menu/SET_ROUTES", []);
  store.commit("menu/SET_TOP_NAV_ROUTES", []);
  await store.dispatch("user/Logout");
  if (route.path !== "/") {
    await router.push("/");
  }
  data.isLogin = false;
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 50px;
  background: white;
  box-shadow: 0 0 12px -5px rgba(0, 0, 0, 0.3);

  .header-right {
    position: absolute;
    display: flex;
    align-items: center;
    right: 10px;
    height: 100%;

    .el-dropdown span {
      display: flex;

      .el-icon {
        margin-left: 5px;
      }
    }
  }

  .el-avatar {
    margin-right: 10px;
  }
}
</style>
