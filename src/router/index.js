import Vue from 'vue'
import Router from 'vue-router'
// 管理员登录界面
// import Login from '@/view/Login.vue'
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
// 后台管理主体视图区
// import Admin from '@/view/Admin.vue'
const Admin = () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue')
// import Dashboard from '@/view/admin/Dashboard.vue'
const Home = () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/admin/Home.vue')
// import Article from '@/view/admin/Article.vue'
const Article = () => import(/* webpackChunkName: "admin-article" */ '@/views/admin/Article.vue')
// import ArticleWrite from '@/components/admin/article/Write.vue'
const ArticleWrite = () => import(/* webpackChunkName: "admin-article" */ '@/views/admin/article/Write.vue')
// import ArticleUpdate from '@/components/admin/article/Update.vue'
const ArticleUpdate = () => import(/* webpackChunkName: "admin-article" */ '@/views/admin/article/Update.vue')
// import Category from '@/view/admin/Category.vue'
const Category = () => import(/* webpackChunkName: "admin-category" */ '@/views/admin/Category.vue')
// import Link from '@/view/admin/Link.vue'
const Link = () => import(/* webpackChunkName: "admin-link" */ '@/views/admin/Link.vue')
// import Count from '@/view/admin/Count.vue'
const Count = () => import(/* webpackChunkName: "admin-count" */ '@/views/admin/Count.vue')
// import Setting from '@/view/admin/Setting.vue'
const Setting = () => import(/* webpackChunkName: "admin-setting" */ '@/views/admin/Setting.vue')
// import NotFound from '@/view/404.vue'
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/404.vue')

Vue.use(Router)

const router = new Router({
  // 开启历史模式
  // mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { requireLogin: false } },
    { path: '/admin',
      component: Admin,
      meta: { requireLogin: true },
      children: [
        { path: '', component: Home, meta: { requireLogin: true } },
        { path: '/admin/article', component: Article, meta: { requireLogin: true } },
        { path: '/admin/category', component: Category, meta: { requireLogin: true } },
        { path: '/admin/link', component: Link, meta: { requireLogin: true } },
        { path: '/admin/count', component: Count, meta: { requireLogin: true } },
        { path: '/admin/setting', component: Setting, meta: { requireLogin: true } }
      ]
    },
    { path: '/admin/article/write', component: ArticleWrite, meta: { requireLogin: true } },
    { path: '/admin/article/update/:id', component: ArticleUpdate, meta: { requireLogin: true } },
    { path: '*', component: NotFound }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, _from, next) => {
  // to 将要跳转的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数, 表示放行
  // next() 放行 next('/login') 强制跳转
  if (to.meta.requireLogin === true) {
    if (!window.sessionStorage.getItem('token')) {
      return next('/login')
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
