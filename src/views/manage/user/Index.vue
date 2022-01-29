<template>
  <div class="card">
    <!--数据展示部分-->
    <el-row>
      <el-table
        stripe
        border
        lazy
        v-loading="data.loading"
        :empty-text="data.emptyText"
        :data="data.list"
      >
        <el-table-column type="selection" width="50" align="center" />
        <template v-for="item in data.columns">
          <el-table-column
            resizable
            :label="item.label"
            :key="item.key"
            :prop="item.key"
            :align="item.align"
            :sortable="item.sort"
            :min-width="item.minWidth"
            :width="item.width"
            v-if="item.visible"
          >
            <template v-slot="scope">
              <el-image
                v-if="item.img"
                fit="cover"
                :size="40"
                :src="scope.row.avatar"
              />
              <el-switch
                v-else-if="item.switch"
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="true"
                :inactive-value="false"
                @change="handleStatusChange(scope.row)"
              />
              <span v-else>{{ scope.row[item.key] }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" align="center" min-width="180" resizable>
          <template #default="scope">
            <el-button
              type="text"
              icon="Edit"
              size="small"
              @click="handleUpdate(scope.row)"
              >修改
            </el-button>
            <el-button
              type="text"
              icon="Delete"
              size="small"
              style="color: #f56c6c"
              @click="handleDelete(scope.row)"
              >删除
            </el-button>
            <el-dropdown trigger="click" size="small">
              <el-button type="text" icon="DArrowRight" size="small"
                >更多
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-icon>
                      <CircleCheck />
                    </el-icon>
                    分配角色
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon>
                      <Key />
                    </el-icon>
                    重置密码
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页部分-->
    <el-row justify="end" v-show="data.total > 0">
      <el-pagination
        v-if="store.getters.device !== 'mobile'"
        background
        layout="->, sizes, prev, pager, next, total, slot"
        :page-sizes="[5, 10, 15, 50, 100]"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-pagination
        v-else
        small
        layout="->, prev, pager, next"
        :page-sizes="[5, 10, 15, 50, 100]"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
  <!--对话框部分-->
  <AddAndUpdate
    v-if="data.dialog.open"
    :window="data.dialog"
    @refresh="getList"
  />
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive } from "vue";
import { getUser, modifyStatus, userList } from "@/api/user.js";
import { isExternal } from "@/utils/validate.js";
import { useStore } from "vuex";
import AddAndUpdate from "@/components/dialog/user/AddAndUpdate.vue";

const { proxy } = getCurrentInstance();
const store = useStore();

const data = reactive({
  list: [],
  loading: true,
  emptyText: "暂无数据",
  total: 0,
  params: {
    pageNum: 1,
    pageSize: 10,
    // TODO 以下是每个页面需要的参数，自行添加
  },
  dialog: {
    open: false,
    title: "",
    row: {},
    rules: {},
  },
  columns: [
    {
      key: "id",
      label: `编号`,
      visible: true,
      align: "center",
      minWidth: 80,
      sort: true,
    },
    {
      key: "username",
      label: `用户名`,
      visible: true,
      align: "center",
      minWidth: 120,
    },
    {
      key: "avatar",
      label: "头像",
      visible: true,
      img: true,
      align: "center",
      width: 80,
    },
    {
      key: "nickname",
      label: "昵称",
      visible: true,
      align: "center",
      minWidth: 100,
    },
    {
      key: "status",
      label: "状态",
      visible: true,
      align: "center",
      width: 80,
      switch: true,
    },
    {
      key: "sex",
      label: "性别",
      visible: true,
      align: "center",
      minWidth: 100,
    },
    {
      key: "created",
      label: `创建时间`,
      visible: true,
      align: "center",
      minWidth: 180,
      sort: true,
    },
    {
      key: "updated",
      label: `修改时间`,
      visible: true,
      align: "center",
      minWidth: 180,
      sort: true,
    },
  ],
});

onBeforeMount(() => {
  getList();
});

const reset = () => {
  data.dialog.row = {
    id: undefined,
    username: undefined,
    nickname: undefined,
    password: undefined,
    sex: "未知",
    status: true,
  };
};

/**
 * 获取展示数据列表
 */
function getList() {
  data.loading = true;
  userList(data.params)
    .then((res) => {
      data.list = res.data.records;
      data.list.forEach((user) => {
        if (!isExternal(user.avatar)) {
          user.avatar = import.meta.env.VITE_APP_BASE_API + user.avatar;
        }
      });
      data.total = res.data.total;
      data.loading = false;
    })
    .catch((err) => {
      data.emptyText = err.msg;
      data.loading = false;
    });
}

/**
 * 修改状态
 */
function handleStatusChange(row) {
  let text = row.status ? "启用" : "禁用";
  proxy
    .$alert(
      '确认要"' + text + '" "' + row.username + '" 用户吗？',
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
    .then(() => {
      modifyStatus(row.id, row.status)
        .then(() => {
          proxy.$message.success(text + "成功");
        })
        .catch(() => {
          row.status = !row.status;
        });
    })
    .catch(() => {
      row.status = !row.status;
    });
}

/**
 * 添加用户
 */
function handleAdd() {
  reset();
  data.dialog.title = "添加用户";
  data.dialog.rules = {
    username: [
      { required: true, message: "用户名不能为空", trigger: "blur" },
      {
        min: 4,
        max: 18,
        message: "用户名长度必须介于 4 至 18 个字符之间",
        trigger: "blur",
      },
    ],
    nickname: [
      { required: true, message: "昵称不能为空", trigger: "blur" },
      {
        min: 4,
        max: 18,
        message: "昵称长度必须介于 4 至 18 个字符之间",
        trigger: "blur",
      },
    ],
    password: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      {
        min: 5,
        max: 18,
        message: "密码长度必须介于 5 至 18 个字符之间",
        trigger: "blur",
      },
    ],
  };
  data.dialog.open = true;
}

/**
 * 修改用户
 */
function handleUpdate(row) {
  reset();
  data.dialog.title = "修改用户";
  data.dialog.rules = {
    username: [
      { required: true, message: "用户名不能为空", trigger: "blur" },
      {
        min: 4,
        max: 18,
        message: "用户名长度必须介于 4 至 18 个字符之间",
        trigger: "blur",
      },
    ],
  };
  getUser(row.id).then((res) => {
    data.dialog.row = convert(res.data);
    data.dialog.open = true;
  });
}

/**
 * 页码跳转
 */
function handleSizeChange(val) {
  data.params.pageSize = val;
  console.log("handleSizeChange", val);
  getList();
}

/**
 * 页码条目
 */
const handleCurrentChange = (val) => {
  console.log("handleCurrentChange", val);
  data.params.pageNum = val;
  getList();
};

/**
 * 转换返回的json
 * @param user
 * @returns {{password: *, sex: *, nickname: *, id, username: *, status}}
 */
function convert(user) {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    password: user.password,
    sex: user.sex,
    status: user.status,
  };
}
</script>

<style lang="scss" scoped>
.el-image {
  border-radius: 50%;
  display: inline-table;

  :deep(.el-image__inner) {
    width: 40px;
    height: 40px;
  }
}
</style>
