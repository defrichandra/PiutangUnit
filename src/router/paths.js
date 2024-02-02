import Credit from "@/views/PiutangUnit/PiutangUnit.vue";

export default [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      // {
      //   path: "home",
      //   name: "Home",
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () =>
      //     import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      // },
      {
        path: "",
        name: "Credit",
        component: Credit,
      },
    ],
  },
];
