<template>
  <el-container>
    <div class="header">
      <Header></Header>
    </div>
    <main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </main>
  </el-container>
</template>

<script>
import Header from '@/components/main/Header.vue'
export default {
  name: 'Main',
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 0px;
  // height: 50px;
  position: fixed;
  width: 100%;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0px 0px 3px #000;
  min-width: 992px;
}
main {
  width: 100%;
  padding: 50px 0 0 0;
}
</style>
