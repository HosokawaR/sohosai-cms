import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout.vue'
import MyContents from '../components/MyContents.vue'
import CreateAricle from '../components/EditArticle.vue'
import Signin from '@/components/Signin.vue'
import firebase from 'firebase'
import { paths } from '@/const/config'
import PostedContents from '@/components/PostedContents.vue'
import AuditArticle from '@/components/AuditArticle.vue'
import ReflectAuthority from '@/components/ReflectAuthority.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: paths.signin.path(),
    component: Signin,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: paths.contents.path(),
        component: MyContents,
        meta: { requireAuth: true },
      },
      {
        path: paths.contents.path() + '/:id/edit',
        component: CreateAricle,
        meta: { requireAuth: true },
      },
      {
        path: paths.postedContents.path(),
        component: PostedContents,
        meta: { requireAuth: true, requireAuditor: true },
      },
      {
        path: paths.contents.path() + '/:id/audit',
        component: AuditArticle,
        meta: { requireAuth: true, requireAuditor: true },
      },
    ],
  },
  {
    path: paths.reflectAuthority.path(),
    component: ReflectAuthority,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth)
  const requireAuditor = to.matched.some((record) => record.meta.requireAuditor)
  if (!requireAuth) {
    next()
    return
  }
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      next({
        path: paths.signin.path(),
        query: { redirect: to.fullPath },
      })
      return
    }
    if (!requireAuditor) {
      next()
      return
    }
    const result = await user.getIdTokenResult()
    if (result.claims.auditor) {
      next()
    } else {
      next({
        path: paths.signin.path(),
        query: { redirect: to.fullPath },
      })
    }
  })
})

export default router
