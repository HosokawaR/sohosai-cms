import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../components/Layout.vue";
import MyContents from "../components/MyContents.vue";
import CreateAricle from "../components/CreateArticle.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "my-contents", component: MyContents },
      { path: "article", component: CreateAricle },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
