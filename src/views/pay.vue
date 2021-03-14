<template>
  <div class="m-pay-wrap">
    <el-button class="btn" type="primary" @click="subPay">确认支付</el-button>
  </div>
</template>

<script>
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
        alert(query.code)
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