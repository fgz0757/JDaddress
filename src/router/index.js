import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path:"/address",
    name:"address",
    component:()=>import("../views/address.vue")
  },
  {
    path:"/addAddress",
    name:"addAddress",
    component:()=>import("../views/addAddress.vue")
  },
  {
    path:"/address1",
    name:"address1",
    component:()=>import("../views/address1.vue")
  },
  {
    path:"/addAddress1",
    name:"addAddress1",
    component:()=>import("../views/addAddress1.vue")
  },
  {
    path:"/items",
    name:"items",
    component:()=>import("../views/items.vue")
  }
];

const router = new VueRouter({
  routes,
});

export default router;
