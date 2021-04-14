<template>
  <div>
    <div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        @change="changeDate"
      />
      <Charts
        height="500px"
        :options="options"
      />
    </div>
    
  </div>
</template>

<script>
import Charts from '@/components/Charts'
import { ListTakeRecord,ListBill } from '../../services/billAndRecord/billAndRecordService';

export default {
  components: {
    Charts
  },
  data () {
    return {
      options: {},
      value1: ''
    }
  },
  created () {
    this.transforOption()
  },
  methods: {
    changeDate (val) {
      console.log('val', val)
      this.transforOption()
    },
    async transforOption() {
      const date = this.value1 ? Date.parse(this.value1) : ''
      const rs = await ListTakeRecord({creationTime: date})
      this.options = {
        xAxis: {
            type: 'category',
            data: rs.timePoints
        },
        yAxis: {
            type: 'value'
        },
        tooltip:{
          trigger: 'axis'
        },
        series: [{
            data: rs.vaules,
            type: 'line'
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>