import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/",
          component: () => import("../views/SpeedRunView.vue"),
          meta: {
            title: "Speedrun",
          },
        },
        {
          path: "/nuke",
          component: () => import("../views/NukeView.vue"),
          meta: {
            title: "Nuke",
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        title: "Login",
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: {
        title: "Admin",
        required: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeLister = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeLister();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + " | MIGIC";
  const user = await getCurrentUser();
  if (to.path == "/login") {
    if (user != null) {
      next("/");
    } else {
      next();
    }
  }
  if (to.meta.required) {
    if (user != null) {
      const token = await user.getIdTokenResult();
      if (token.claims.admin) {
        next();
      } else {
        next("/login");
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
