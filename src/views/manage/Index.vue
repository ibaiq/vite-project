<template>
  <div class="app-wrapper"></div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount } from "vue";
import { useStore } from "vuex";

const { proxy } = getCurrentInstance();

onBeforeMount(() => {
  let first = JSON.parse(sessionStorage.getItem("first"));
  if (!first) {
    const store = useStore();
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
    proxy.$notify.success({
      title: thisTime + " " + store.getters.user.nickname,
      message: "欢迎来到Ibaiq后台管理系统",
      duration: 3000,
    });
    sessionStorage.setItem("first", JSON.stringify(true));
  }
});
</script>

<style scoped></style>
