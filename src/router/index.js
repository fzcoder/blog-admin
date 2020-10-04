import Vue from 'vue'
import Router from 'vue-router'

// 登录界面
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
// 后台管理主体视图区
const Main = () => import(/* webpackChunkName: "main" */ '@/views/Main.vue')
// 主页
const Index = () => import(/* webpackChunkName: "main" */ '@/views/main/Index.vue')
// 个人中心
const Home = () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/admin/Home.vue')
// 文章管理
const Article = () => import(/* webpackChunkName: "admin-article" */ '@/views/main/Article.vue')
// 创建文章
const ArticleWrite = () => import(/* webpackChunkName: "admin-article" */ '@/views/main/article/Write.vue')
// 修改文章
const ArticleUpdate = () => import(/* webpackChunkName: "admin-article" */ '@/views/main/article/Update.vue')
// 预览文章
const ArticlePreview = () => import(/* webpackChunkName: "admin-article" */ '@/views/main/article/Preview.vue')
// 目录管理
const Category = () => import(/* webpackChunkName: "admin-category" */ '@/views/admin/Category.vue')
// 链接管理
const Link = () => import(/* webpackChunkName: "admin-link" */ '@/views/admin/Link.vue')
// 统计数据
const Count = () => import(/* webpackChunkName: "admin-count" */ '@/views/admin/Count.vue')
// 设置
const Setting = () => import(/* webpackChunkName: "admin-setting" */ '@/views/admin/Setting.vue')
// 错误页面
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/404.vue')

Vue.use(Router)

const router = new Router({
  // 开启历史模式
  // mode: 'history',
  routes: [
    // 主界面
    {
      path: '/',
      component: Main,
      meta: { requireLogin: true },
      children: [
        { path: '', component: Index, meta: { requireLogin: true } },
        {
          path: '/article',
          component: Article,
          meta: { requireLogin: true },
          children: [
            {
              path: '',
              component: () => import(/* webpackChunkName: "admin-article" */ '@/views/main/article/List.vue'),
              meta: { requireLogin: true }
            },
            {
              path: '/article/draft',
              component: () => import(/* webpackChunkName: "admin-article" */ '@/views/main/article/Draft.vue'),
              meta: { requireLogin: true }
            },
            {
              path: '/article/trash',
              component: () => import(/* webpackChunkName: "admin-article" */ '@/views/main/article/Trash.vue'),
              meta: { requireLogin: true }
            }
          ]
        },
        { path: '/article/preview/:id', component: ArticlePreview, meta: { requireLogin: true } },
        { path: '/category', component: Category, meta: { requireLogin: true } },
        { path: '/link', component: Link, meta: { requireLogin: true } },
        { path: '/user', component: Home, meta: { requireLogin: true } },
        { path: '/data', component: Count, meta: { requireLogin: true } },
        { path: '/setting', component: Setting, meta: { requireLogin: true } }
      ]
    },
    // 文章编辑页面
    { path: '/article/write', component: ArticleWrite, meta: { requireLogin: true } },
    { path: '/article/update/:id', component: ArticleUpdate, meta: { requireLogin: true } },
    // 登录界面
    { path: '/login', component: Login, meta: { requireLogin: false } },
    // 错误界面
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
