<template>
  <div class="v-echarts" :style="`height: ${height}; width: ${width};`">
    <div ref="ElChart" class="chart-container"></div>
  </div>
  
</template>

<script>
const echarts = require('echarts')

export default {
  data () {
    return {
      chartObj: null,
      chartOptions: {}
    }
  },
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    options: {
      default: Object,
      default: {}
    }
  },
  watch: {
    options: {
      handler: function(options) {
        this.chartOptions = options || {}
        this.drawChart()
      }
      // immediate: true
    }
  },
  mounted() {
    this.initEchart()
    this.drawChart()
  },
  methods: {
    drawChart () {
      this.chartObj.setOption(this.chartOptions, true)
    },
    initEchart() {
      const el = this.$refs.ElChart
      const instance = echarts.init(el)
      this.chartObj = instance
    },
  }
}
</script>

<style lang="scss" scoped>
.v-echarts{
  .chart-container{
   height: 100%;
    width: 100%;
  }
}
</style>