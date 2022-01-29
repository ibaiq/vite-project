<template>
  <div class="card">
    <div class="card-avatar">
      <el-avatar
        :size="60"
        :src="store.getters.user.avatar"
        fit="cover"
        @error="true"
      >
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
    </div>
    <div class="card-content">
      <h3>
        {{ data.thisTime }}
        {{ store.getters.user.nickname }}，愿你天黑有灯，下雨有伞。
      </h3>
      <p>{{ store.getters.sentence }}</p>
    </div>
  </div>
  <!--<div class="wrap">-->
  <!--  <div>-->
  <!--    <el-card shadow="hover">-->
  <!--      <template #header>-->
  <!--        <span>-->
  <!--          <el-icon>-->
  <!--            <InfoFilled />-->
  <!--          </el-icon>-->
  <!--          信息-->
  <!--        </span>-->
  <!--      </template>-->
  <!--    </el-card>-->
  <!--  </div>-->
  <!--  <div>-->
  <!--    <el-card shadow="hover">-->
  <!--      <template #header>-->
  <!--        <span>-->
  <!--          <el-icon>-->
  <!--            <InfoFilled />-->
  <!--          </el-icon>-->
  <!--          信息-->
  <!--        </span>-->
  <!--      </template>-->
  <!--      {{ dependencies["vue"] }}-->
  <!--    </el-card>-->
  <!--  </div>-->
  <!--  <div>-->
  <!--    <el-card shadow="hover">-->
  <!--      <template #header>-->
  <!--        <span>-->
  <!--          <el-icon>-->
  <!--            <InfoFilled />-->
  <!--          </el-icon>-->
  <!--          信息-->
  <!--        </span>-->
  <!--      </template>-->
  <!--      {{ dependencies["vue"] }}-->
  <!--    </el-card>-->
  <!--  </div>-->
  <!--</div>-->
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const data = reactive({
  thisTime: "",
});

onBeforeMount(() => {
  const hour = new Date().getHours();
  data.thisTime =
    hour < 8
      ? "早上好"
      : hour <= 11
      ? "上午好"
      : hour <= 13
      ? "中午好"
      : hour < 18
      ? "下午好"
      : "晚上好";
});
</script>

<style lang="scss" scoped>
.wrap {
  margin: 0 -5px;
  position: relative;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  div:not(.el-card) {
    float: left;
    padding: 0 5px 5px;
    width: 50%;
  }

  .el-card {
    span {
      display: flex;
      font-size: 14px;
      align-items: center;

      .el-icon {
        margin-right: 5px;
      }
    }
  }
}

.card {
  display: flex;
  align-items: center;
  padding: 30px 20px !important;

  .card-avatar {
    margin-right: 20px;

    .el-avatar {
      :deep(img) {
        width: 100%;
      }
    }
  }

  .card-content {
    display: block;

    h3 {
      font-size: 20px;
      margin: 5px 0;
      color: #3c4a54;
    }

    p {
      min-height: 20px;
      margin: 5px 0;
      font-size: 14px;
      //font-weight: 300;
      color: #808695;
    }
  }
}
</style>
