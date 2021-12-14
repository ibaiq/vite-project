<template>
  <section>
    <div class="login-box">
      <div class="main">
        <div class="current-header" @click="router.push('/')">
          <el-icon>
            <ArrowLeft />
          </el-icon>
          <span>首页</span>
        </div>
        <h3>用户登录</h3>
        <el-form :model="data.user" :rules="rules" ref="form">
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入用户名"
              v-model="data.user.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              placeholder="请输入密码"
              show-password
              v-model="data.user.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              :loading="data.loading"
              @click="submit"
            >
              <span v-if="!data.loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { login } from "@/api/user.js";
import { Lock, User, ArrowLeft } from "@element-plus/icons-vue";
import { setToken } from "@/utils/auth-cookie.js";

const { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();
const route = useRoute();

const data = reactive({
  user: {
    username: "",
    password: "",
  },
  loading: false,
});

if (import.meta.env.DEV) {
  data.user = {
    username: "admin",
    password: "admin",
  };
}

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名！", trigger: "blur" },
    { min: 4, max: 18, message: "长度在 4 到 18 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码！", trigger: "blur" },
    { min: 5, max: 18, message: "长度在 5 到 18 个字符", trigger: "blur" },
  ],
});

const redirect = ref(undefined);

watch(
  () => route.query,
  (value) => {
    redirect.value = value.redirect;
  },
  {
    deep: true,
    immediate: true,
  }
);

const submit = () => {
  proxy.$refs.form.validate((valid) => {
    if (valid) {
      data.loading = true;
      login(data.user)
        .then((res) => {
          proxy.$message.success(res.msg);
          setToken(res.data.token);
          store.commit("user/SET_TOKEN", res.data.token);
          router.replace(redirect.value ? redirect.value : "/");
        })
        .catch(() => {
          data.loading = false;
        });
    } else {
      return false;
    }
  });
};

document.onkeyup = function (e) {
  if (e.keyCode === 13) {
    submit();
  }
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

section {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(94.3deg, #1a2140 10.9%, #515473 87.1%);
  overflow: hidden;
}

section:before {
  width: 450px;
  height: 450px;
  transform: translate(-100%, -80%);
  background-color: #ffe53b;
  background-image: linear-gradient(147deg, #ffe53b, #ff2525 74%);
  -webkit-animation: pulse-4da47d57 1.5s infinite;
  animation: pulse 1.5s infinite;
}

section:after {
  width: 300px;
  height: 300px;
  transform: translate(10%, 20%);
  background-color: #fa8bff;
  background-image: linear-gradient(45deg, #fa8bff, #2bd2ff 52%, #2bff88 74%);
  -webkit-animation: pulse-4da47d57 1.6s infinite;
  animation: pulse 1.6s infinite;
}

section:after,
section:before {
  position: absolute;
  content: "";
  z-index: 2;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  box-shadow: 0 0 0 0 hsla(0, 0%, 100%, 0.2);
}

@-webkit-keyframes pulse {
  50% {
    box-shadow: 0 0 0 50px hsla(0, 0%, 100%, 0);
  }
  to {
    box-shadow: 0 0 0 0 hsla(0, 0%, 100%, 0);
  }
}

@keyframes pulse {
  50% {
    box-shadow: 0 0 0 50px hsla(0, 0%, 100%, 0);
  }
  to {
    box-shadow: 0 0 0 0 hsla(0, 0%, 100%, 0);
  }
}

.login-box {
  position: absolute;
  z-index: 1009;
  width: 100%;
  max-width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .main {
    text-align: center;
    padding: 0 30px 31px;
    background: hsla(0, 0%, 100%, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    border-right: 1px solid hsla(0, 0%, 100%, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    .el-form-item.is-error {
      :deep(.el-input__inner) {
        border: 2px solid var(--el-color-danger);
        box-shadow: 0 0 5px rgba(245, 108, 108, 0.75);
      }
    }

    h3 {
      color: white;
      font-size: 25px;
      text-align: center;
      margin: 5px 10px 25px;
    }

    .current-header {
      text-align: left;
      color: white;
      line-height: 61px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: start;
      width: fit-content;

      .el-icon {
        width: auto;
        height: auto;
        line-height: normal;
        display: flex;
        margin-right: 5px;

        svg {
          width: 1.1em;
          height: 1.1em;
        }
      }
    }

    .el-form-item {
      margin-bottom: 25px;

      :deep(.el-input__inner) {
        height: 50px;
        line-height: 50px;
      }

      :deep(.el-form-item__error) {
        color: white;
      }

      .el-input {
        --el-input-bg-color: transparent;
        --el-input-icon-color: white;
        --el-input-text-color: white;
        --el-input-border-radius: 8px;
        --el-input-border: 1px solid;
        --el-input-border-color: hsla(0, 0%, 100%, 0.5);
        --el-input-font-color: white;
        --el-input-focus-border: white;
        --el-input-placeholder-color: white;
        line-height: 50px;
      }

      .el-button {
        line-height: 50px;
        width: 100%;
        background: linear-gradient(90deg, #02aab0 0, #00cdac 51%, #02aab0);
        background-size: 200% auto;
        border: 0;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transition: 0.4s ease;
      }

      .el-button:hover {
        background-position: 100%;
        color: white;
        text-decoration: none;
      }
    }
  }
}
</style>
