<template>
  <div class="header-content">
    <div class="nav-content">
      <!-- Logo -->
      <a class="brand" href="/">
        <span>Frank's Blog</span>
      </a>
      <!-- 导航 -->
      <ul class="nav">
        <li class="nav-item" v-for="item in nav" :key="item.name">
          <a class="nav-link" :href="item.url">
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="btn-group">
      <el-button
        class="btn-group-item"
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="() => { this.$router.push('/article/write') }"
      >写文章</el-button>
      <el-button
        class="btn-group-item"
        size="small"
        icon="el-icon-close"
        @click="logout()"
      >退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 导航
      nav: [
        { name: '文章管理', url: '/#/article' },
        { name: '链接管理', url: '/#/link' },
        { name: '统计数据', url: '/#/data' }
      ]
    }
  },
  methods: {
    // 退出
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header-content {
  background-color: #000;
  height: 50px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px 0 10px;
}
.nav-content {
  display: flex;
  align-items: center;
  height: 50px;
}
// 水平导航栏
.nav {
  list-style: none;
  display: flex;
  padding: 0px;
  margin: 0px;
  align-items: center;
  // height: 100%;
}
.nav-item {
  display: inline-block;
  margin: 0 10px 0 10px;
  // height: 100%;
  // align-items: center;
  // padding: 5px;
  // margin: 10px;
  // border-bottom: solid 3px transparent;
}
.nav-link, .nav-link-icon {
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  height: 100%;
}
.nav-link:hover {
  // border-bottom: solid 3px #19be6b;
  border-bottom: solid 3px #409eff;
}
.btn-group {
  display: flex;
  align-items: center;
}
.btn-group-item {
  margin: 0 10px 0 10px;
}
</style>
