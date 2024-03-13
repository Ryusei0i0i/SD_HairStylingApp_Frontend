import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "SigninWithGoogle",
      component: () => import("@/views/SigninGoogle.vue")
    },
    {
      path: "/usage",
      name: "UsagePage",
      component: () => import("@/views/UsagePage.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/generate",
      name: "GenerateForm",
      component: () => import("@/views/GenerateForm.vue"),
      meta: { requiresAuth: true }
    },
  ]
})
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});
export default router
