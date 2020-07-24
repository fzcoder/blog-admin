<template>
  <div class="container">
    <el-tabs>
      <el-tab-pane label="访问统计">
        <el-card shadow="never">
          <div style="display: flex; justify-content: flex-start;">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="main" style="width: 750px; height: 450px;"></div>
            <div style="margin-left: 15px;">
              <h3>时间范围</h3>
              <el-date-picker
                    v-model="DatePicker.value"
                    type="daterange"
                    align="right"
                    :clearable="false"
                    :editable="false"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="DatePicker.pickerOptions"
                    value-format="yyyy-MM-dd"
                    @change="getWebsiteRecordChart(DatePicker.value[0], DatePicker.value[1])">
                  </el-date-picker>
            </div>
          </div>
          <h3>访问记录</h3>
          <el-table :data="websiteRecords.list" stripe>
            <el-table-column type="index" label="#" width="40px"></el-table-column>
            <el-table-column label="访问时间" prop="date"></el-table-column>
            <el-table-column label="ip地址" prop="visitor_ip"></el-table-column>
            <el-table-column label="所在地" prop="visitor_address"></el-table-column>
            <el-table-column label="操作">
              <template>
                <!-- 删除按钮 -->
                <el-button type="primary" icon="el-icon-search" round size="small">详情</el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete" round size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区 -->
          <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="websiteRecords.query.pageInfo.pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="websiteRecords.query.pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="websiteRecords.total"
                background
                style="margin-top: 15px;">
              </el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="阅读统计"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 1. 导入 echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      // 访问信息
      websiteRecords: {
        // 列表
        list: [],
        // 总数
        total: 0,
        // 请求参数
        query: {
          // 路径参数
          params: {},
          // 分页信息
          pageInfo: {
            key: '',
            pageNum: 1,
            pageSize: 10,
            orderBy: ['date'],
            reverse: true
          }
        }
      },
      // 图表
      charts: [
        {
          // 4. 指定图表的配置项和数据
          option: {
            // 标题
            title: {
              text: '网站访问量统计'
            },
            // 图例
            legend: {
              type: 'plain',
              show: true,
              data: ['变化趋势', '访问量']
            },
            // 区域缩放
            dataZoom: [
              {
                type: 'slider'
              },
              {
                type: 'inside'
              }
            ],
            // 提示框组件
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            // 工具栏
            toolbox: {
              show: true,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            // 横坐标
            xAxis: {
              name: '日期/date',
              type: 'category'
            },
            // 纵坐标
            yAxis: {
              name: '访问量/hits',
              type: 'value'
            },
            // 数据集
            dataset: {
              // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
              // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射。
              dimensions: ['date', 'hits'],
              source: ''
            },
            // 系列
            series: [
              {
                name: '变化趋势',
                type: 'line'
              },
              {
                // 图标名称
                name: '访问量',
                // 图表类型
                type: 'bar',
                // 设置柱条的宽度，可以是绝对值例如 40 或者百分数例如 '60%'。百分数基于自动计算出的每一类目的宽度。
                barWidth: '30%',
                // 图形样式
                itemStyle: {
                  // 柱条颜色
                  color: '#409EFF'
                }
              }
            ]
          }
        }
      ],
      // 时间选择器
      DatePicker: {
        value: ['', ''],
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近半年',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 182)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一年',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        }
      }
    }
  },
  created () {
    this.init()
    this.getWebsiteRecordList()
  },
  // 此时页面上的元素已经被渲染完毕
  mounted () {
    this.getWebsiteRecordChart(this.DatePicker.value[0], this.DatePicker.value[1])
  },
  methods: {
    // 初始化操作
    init () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.DatePicker.value[0] = start.getFullYear() + '-' + (start.getMonth() + 1 < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1) + '-' + start.getDate()
      this.DatePicker.value[1] = end.getFullYear() + '-' + (end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1) + '-' + end.getDate()
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.websiteRecords.query.pageInfo.pageSize = newSize
      this.getWebsiteRecordList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.websiteRecords.query.pageInfo.pageNum = newPage
      this.getWebsiteRecordList()
    },
    // 获取文章列表
    async getWebsiteRecordList () {
      const { data: result } = await this.$http.post('/admin/records/website', this.websiteRecords.query.pageInfo, { params: this.websiteRecords.query.params })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.websiteRecords.list = result.data.records
      this.websiteRecords.query.pageInfo.pageNum = result.data.current
      this.websiteRecords.query.pageInfo.pageSize = result.data.size
      this.websiteRecords.total = result.data.total
    },
    // 获取网站访问量表格
    async getWebsiteRecordChart (startDate, endDate) {
      // 3. 基于准备好的dom, 初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 5. 展示数据
      const { data: result } = await this.$http.get('/admin/chart/website', { params: { start: startDate, end: endDate } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.charts[0].option.dataset.source = result.data
      // 5. 展示数据
      myChart.setOption(this.charts[0].option)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
