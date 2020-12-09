<template>
  <div class="user-home-container">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
        <div class="user-info">
          <el-avatar :src="user.avatar" :size="150"></el-avatar>
          <h3>{{ user.nickname }}</h3>
          <p>{{ user.motto }}</p>
          <el-button icon="el-icon-setting" @click="gotoProfile">个人设置</el-button>
        </div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="15" :xl="16">
        <div class="contribution">
          <h4 style="margin-top: 0px;">创作度</h4>
          <div id="contribution-chart" style="width: 750px; height: 180px;"></div>
          <span>注：创作度是根据添加草稿，发布文章来进行计算的。添加草稿的创作度为1，发布文章的创作度为2。</span>
        </div>
        <div class="lastest">
          <h4>最新发布</h4>
          <dynamic></dynamic>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 1. 导入 echarts
import echarts from 'echarts'
import dynamic from '@/components/main/user/Dynamic.vue'
export default {
  components: {
    dynamic
  },
  data () {
    return {
      user: {
        id: '',
        username: '',
        nickname: '',
        avatar: '',
        introduction: '',
        motto: '',
        home_page: '',
        github: '',
        gitee: ''
      },
      // 创作度
      contribution: {
        startDate: '',
        endDate: '',
        // 设置项
        option: {
          tooltip: {},
          visualMap: {
            // 类型：分段式视觉映射组件(visualMapPiecewise)
            type: 'piecewise',
            // 自定义分段式视觉映射组件(visualMapPiecewise)的每一段的范围，
            // 以及每一段的文字，以及每一段的特别的样式。
            pieces: [
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
              { gt: 5 }
            ],
            orient: 'horizontal',
            left: 'center',
            top: 'top',
            textStyle: {
              color: '#000'
            }
          },
          calendar: {
            top: 'middle',
            left: 20,
            right: 20,
            cellSize: ['auto', 12],
            range: [],
            itemStyle: {
              borderWidth: 0.5
            },
            yearLabel: { show: false }
          },
          series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: []
          }
        }
      }
    }
  },
  created () {
    this.getUserInfo()
    this.setDateRange()
  },
  mounted () {
    this.getContribution()
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$http.get(`/user/${window.sessionStorage.getItem('uid')}`).then(res => {
        this.user = res.data.data
      })
    },
    setDateRange () {
      const end = new Date()
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 365)
      // 查询一年范围内的贡献度
      this.contribution.option.calendar.range.push(echarts.format.formatTime('yyyy-MM-dd', start))
      this.contribution.startDate = echarts.format.formatTime('yyyy-MM-dd', start)
      this.contribution.option.calendar.range.push(echarts.format.formatTime('yyyy-MM-dd', end))
      this.contribution.endDate = echarts.format.formatTime('yyyy-MM-dd', end)
    },
    getContribution () {
      var myChart = echarts.init(document.getElementById('contribution-chart'))
      var data = []
      this.$http.get('/admin/chart/contribution', {
        params: {
          uid: window.sessionStorage.getItem('uid'),
          start_date: this.contribution.startDate,
          end_date: this.contribution.endDate
        }
      }).then(res => {
        const result = res.data
        for (var i = 0; i < result.data.length; i++) {
          var elem = new Array(2)
          for (let key in result.data[i]) {
            if (key === 'date') {
              elem[0] = result.data[i][key]
            } else {
              elem[1] = result.data[i][key]
            }
          }
          data.push(elem)
        }
        this.contribution.option.series.data = data

        myChart.setOption(this.contribution.option)
      })
    },
    gotoProfile () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  text-align: center;
}
.contribution {
  span {
    font-size: small;
    color: grey;
  }
}
</style>
