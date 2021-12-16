const asyncManage = [
  {
    path: "/manage",
    name: "Manage",
    component: () => import("@/components/parentView/Index"),
    meta: { title: "系统管理" },
    children: [],
  },
];

export default asyncManage;
