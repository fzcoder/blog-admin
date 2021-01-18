<template>
  <div class="nav-container">
    <h4 style="margin: 0 0 20px 0;">功能</h4>
    <a class="link-card" href="/#/article/draft">
      <div class="link-card-content color-gradient-HappyUnicorn">
        <i class="el-icon-edit"></i>
        <span class="card-title">草稿箱</span>
      </div>
    </a>
    <a class="link-card" href="/#/article/trash">
      <div class="link-card-content color-gradient-MagicLake">
        <i class="el-icon-delete"></i>
        <span class="card-title">废纸篓</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.link-card {
  text-decoration: none;
  cursor: pointer;
  color: #fff;
}
.link-card-content {
  padding: 10px;
  margin: 0 0 10px 0;
  border-radius: 10px;
  // 阴影
  box-shadow: 0px 0px 8px #dcdfe6;
  display: flex;
  align-items: center;
  .card-title {
    margin: 0 0 0 10px;
    font-weight: bold;
  }
}
</style>
