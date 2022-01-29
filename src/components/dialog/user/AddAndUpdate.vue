<template>
  <!--PC端-->
  <el-dialog
    v-if="store.getters.device !== 'mobile'"
    v-model="window.open"
    :title="window.title"
    :width="600"
    custom-class="popups"
    append-to-body
    destroy-on-close
  >
    <el-form
      :model="window.row"
      :rules="window.rules"
      ref="userRef"
      label-width="auto"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="window.row.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="window.row.nickname"
              placeholder="请输入用户昵称"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="window.row.password" placeholder="请输入密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="window.row.sex">
              <el-option
                v-for="item in data.sex"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio v-model="window.row.status" :label="true">正常</el-radio>
            <el-radio v-model="window.row.status" :label="false">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="window.open = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>

  <!--移动端-->
  <el-dialog
    v-else
    v-model="window.open"
    :title="window.title"
    custom-class="dialog-mobile"
    fullscreen
    append-to-body
    destroy-on-close
  >
    <el-form
      :model="window.row"
      :rules="window.rules"
      ref="userRef"
      label-width="auto"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="window.row.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="window.row.nickname"
              placeholder="请输入用户昵称"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="密码" prop="password">
            <el-input v-model="window.row.password" placeholder="请输入密码" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="window.row.sex">
              <el-option
                v-for="item in data.sex"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="状态" prop="status">
            <el-radio v-model="window.row.status" :label="true">正常</el-radio>
            <el-radio v-model="window.row.status" :label="false">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="window.open = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { modify } from "@/api/user.js";
import { reactive } from "vue";

const store = useStore();

const props = defineProps({
  window: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["refresh"]);

const data = reactive({
  sex: [
    {
      value: "未知",
    },
    {
      value: "男",
    },
    {
      value: "女",
    },
  ],
});

function submitFileForm() {
  modify(props.window.row)
    .then((res) => {
      console.log(res);
      props.window.open = false;
      emits("refresh");
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style scoped></style>
