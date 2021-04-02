<template>
  <div class="m-pay-wrap">
    <el-button class="btn" type="primary" @click="subPay">确认支付</el-button>
  </div>
</template>

<script>
import { toPay } from '@/services/station/stationService';

export default {
  data () {
    return {
      curPos: 0,
      form: {
        start: '',
        end: ''
      },
      file: null,
      container: null
    }
  },

  methods: {
    subPay() {
      var query = this.$route.query
      if (query.code) {
        toPay({ publicKey: query.code }).then((res) => {
          this.$message.success('支付成功')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-pay-wrap{
  .btn{
    text-align: center;
    margin: 300px auto;
  }
}
</style>