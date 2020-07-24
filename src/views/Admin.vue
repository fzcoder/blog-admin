<template>
  <el-container class="container-outside">
    <el-header>
      <div class="header" ref="headerRef">
        <div class="logo">
          <el-link :underline="false" :href=" '/#/admin' ">
            <h1>
              <i :class="website.brand.icon"></i>
              {{ website.brand.title }}
            </h1>
          </el-link>
        </div>
        <div style="display: flex; align-items: center;">
          <el-button size="small" type="primary" round icon="el-icon-edit" @click="write()">写博客</el-button>
          <el-button size="small" round icon="el-icon-close" @click="logout">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-container class="container-inside">
      <el-aside class="aside" width="220px">
        <!-- 侧边栏菜单区域 -->
        <el-menu :style="style.aside" :router="true" background-color="#2F4056" text-color="#fff">
          <el-menu-item v-for="item in menu.aside" :key="item.id" :index="item.url">
            <!-- 二级菜单的模板区 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main :style="style.main">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        id: '',
        username: '',
        email: ''
      },
      website: {
        brand: {
          title: 'MyBlog',
          icon: 'el-icon-document'
        }
      },
      // 菜单数据
      menu: {
        aside: [
          {
            id: 1,
            title: '个人中心',
            url: '/admin',
            icon: 'el-icon-s-custom'
          },
          {
            id: 2,
            title: '文章管理',
            url: '/admin/article',
            icon: 'el-icon-edit'
          },
          {
            id: 3,
            title: '目录管理',
            url: '/admin/category',
            icon: 'el-icon-s-fold'
          },
          {
            id: 4,
            title: '链接管理',
            url: '/admin/link',
            icon: 'el-icon-link'
          },
          {
            id: 5,
            title: '统计数据',
            url: '/admin/count',
            icon: 'el-icon-s-data'
          },
          {
            id: 6,
            title: '网站设置',
            url: '/admin/setting',
            icon: 'el-icon-setting'
          }
        ]
      },
      style: {
        aside: {
          height: ''
        },
        main: {
          height: '',
          padding: 20 + 'px'
        }
      }
    }
  },
  mounted () {
    this.setScreenSize()
    // 监听窗口变化事件
    window.onresize = this.resize()
  },
  methods: {
    write () {
      this.$router.push(`/admin/article/write`)
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 布局设置
    setScreenSize () {
      let headerHeight = this.$refs.headerRef.offsetHeight
      this.style.aside.height = document.body.clientHeight - headerHeight + 'px'
      // this.style.aside.width = document.body.clientWidth * 0.2 + 'px'
      this.style.main.height = document.body.clientHeight - headerHeight + 'px'
    },
    // 屏幕尺寸发生变化时触发的事件
    resize () {
      return () => {
        this.setScreenSize()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container-outside {
  // height: 100%;
}
.container-intside {
  // height: 100%;
}
.el-header {
  background-color: #393d49;
}
.el-main {
  // height: inherit;
}
.el-aside {
  // height: inherit;
}
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
}
.logo {
  display: flex;
  align-items: center;
  h1 {
    color: #fff;
    margin: 0px;
  }
}
</style>
