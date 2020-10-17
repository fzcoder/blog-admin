<template>
  <div class="container">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="0" :sm="8" :md="6" :lg="4" :xl="5">
        <h4 style="margin: 0px 0px 10px 8px;">基本设置</h4>
        <a class="profile-item-link" v-for="item in menu.base" :key="item.title" :href="item.url">
          <div class="profile-item-content">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
        </a>
        <h4 style="margin: 10px 0px 10px 8px;">主页设置</h4>
        <a class="profile-item-link" v-for="item in menu.index" :key="item.title" :href="item.url">
          <div class="profile-item-content">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
        </a>
      </el-col>
      <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="12">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: {
        base: [
          { title: '网站信息', url: '/#/setting', icon: 'el-icon-info' }
        ],
        index: [
          { title: '走马灯', url: '/#/setting/carousel', icon: 'el-icon-picture' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.profile-item-link {
  text-decoration: none;
  color: #303133;
}
.profile-item-content {
  padding: 8px;
  span {
    margin-left: 5px;
  }
}
.profile-item-content:hover {
  background-color: #F2F6FC;
  color: #409EFF;
}
</style>
