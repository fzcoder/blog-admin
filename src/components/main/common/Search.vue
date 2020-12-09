<template>
  <!-- 搜索区 -->
  <div class="search-area">
    <el-input placeholder="请输入内容" v-model="keyword" @input="input()" size="small" clearable @clear="search">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <div class="btn-group">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add">{{ label }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: String,
    label: {
      type: String,
      default: '添加'
    }
  },
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    input () {
      this.$emit('input', this.keyword)
    },
    search () {
      this.$emit('search')
    },
    add () {
      this.$emit('add')
    }
  }
}
</script>

<style lang="less" scoped>
.search-area {
  width: 40%;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  .btn-group {
    margin-left: 10px;
  }
}
</style>
