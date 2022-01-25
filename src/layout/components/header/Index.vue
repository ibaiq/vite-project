<template>
  <div class="header">
    <div class="header-left" @click="toggle">
      <svg
        :class="{ 'is-active': isActive }"
        class="hamburger"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
      >
        <path
          transform="rotate(-180 512,512)"
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
        />
      </svg>
    </div>
    <TopNav id="topmenu-container" class="topmenu-container" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import TopNav from "../topnav/Index.vue";

defineProps({
  isActive: Boolean,
});

const store = useStore();

const toggle = () => {
  store.dispatch("app/toggleSidebar");
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0 0 12px -5px rgba(0, 0, 0, 0.3);

  .header-left {
    float: left;
    line-height: 50px;
    align-items: center;
    padding: 0 15px;
    font-size: 22px;
  }

  .topmenu-container {
    position: absolute;
    left: 55px;
  }

  svg {
    height: 22px;
    width: 25px;
    vertical-align: middle;
  }

  .is-active {
    transform: rotate(180deg);
  }
}

.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  height: 50px !important;
  line-height: 50px !important;
}

.el-menu--horizontal > .el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
