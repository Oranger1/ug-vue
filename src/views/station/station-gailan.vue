<template>
  <div class="m-station-wrap">
    <div class="tubemap" id="tube-map"></div>
    <div class="from-wrap">
      <div class="tips">请先按下站点后面的按钮，然后在地铁图上选择站点</div>
      <el-form ref="form" class="v-form" size="small" label-position="top" :model="form">
        <el-form-item label="起始站" prop="beginStation" :rules="[{ required: true, message: '必填'}]">
          <div style="display:flex">
            <el-input v-model="form.beginStation" :disabled="true" placeholder="请选择起始站" />
            <el-button type="primary" size="small" style="margin-left:4px" @click="curPos = 1">选择起始站</el-button>
          </div>
        </el-form-item>
        <el-form-item label="结束站" prop="endStation" :rules="[{ required: true, message: '必填'}]">
          <div style="display:flex">
            <el-input v-model="form.endStation" :disabled="true" placeholder="请选择结束站" />
            <el-button type="primary" size="small" style="margin-left:4px" @click="curPos = 2">选择结束站</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="dialogVisible = true" style="margin-left:10px">去乘车</el-button>
          <span class="tips" style="margin-left:5px">支付完请保存乘车码</span>
        </el-form-item>
      </el-form>
      <div>
        <div v-if="priceModel.publicKey" style="text-align: left; margin-left:10px; margin-bottom:10px">
          价格： {{ priceModel.price }}元
        </div>
        <div>
          <canvas id="canvas" ref ="canva" width="292" height="292"></canvas>
          <div v-if="priceModel.publicKey && priceModel.status == 0" class="tips" style="margin-left:10px;">请扫码支付</div>
          <div v-if="priceModel.status == 1" class="tips" style="margin-left:10px;">支付成功， 乘车码: {{ priceModel.code }}</div>
          <div v-if="priceModel.status == 1" class="tips" style="margin-left:10px;"><el-button @click="dialogVisible = true">去乘车</el-button></div>
        </div>
      </div> 
    </div>
     <el-dialog title="请乘车" :visible.sync="dialogVisible" width="30%">
        <div>
          <div class="tips" style="margin-bottom:30px;">乘车码: <el-input v-model="code" placeholder="请输入乘车码" style="width:50%; margin-left:10px" /></div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" round @click="toChenChe">入站</el-button> 
          <el-button type="success" size="medium" round @click="toChuZhan">出站</el-button>
          <el-button @click="dialogVisible = false" size="medium" round>关闭</el-button>
        </div>
    </el-dialog>
  </div>

</template>

<script>
import * as d3 from 'd3'
import QRCode from 'qrcode'
import * as tubeMap from '@/js/map/d3-tube-map.js'
import londonTubeJson from './london-tube.json'
import { queryMapObj,getPrice, queryPayStatus, takeOn, takeOff } from '@/services/station/stationService';

export default {
  data () {
    return {
      curPos: 0,
      form: {
        beginStation: '',
        endStation: ''
      },
      file: null,
      container: null,
      interval: null,
      priceModel: { price: '', publicKey: '', status: 0, code: '' },
      dialogVisible: false,
      code: ''
    }
  },
  mounted() {
    this.container = d3.select("#tube-map");
    var width = 1600;
    var height = 1000;
    var that = this
    var map = tubeMap.tubeMap().width(width).height(height).margin({ top: 20, right: 20, bottom: 40, left: 100 }).on("click", function (name) {
      if (that.curPos === 1) {
        that.form.beginStation = name
        that.curPos = 0
      }
      if (that.curPos === 2) {
        that.form.endStation = name
        that.curPos = 0
      }
    });

    queryMapObj().then(r => {
      this.initMapData(r, map)
    })
  },
  methods: {
    initMapData (data, map) {
      this.container.datum(data).call(map);

      var svg = this.container.select("svg");

      var zoom = d3.zoom().scaleExtent([0.5, 6]).on("zoom", zoomed);

      var zoomContainer = svg.call(zoom);
      var initialScale = 0.20;
      var initialTranslate = [-150, 0];

      zoom.scaleTo(zoomContainer, initialScale);
      zoom.translateTo(
        zoomContainer,
        initialTranslate[0],
        initialTranslate[1]
      );

      function zoomed(event) {
        svg.select("g").attr("transform", event.transform.toString());
      }
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getPrice(this.form).then(r =>{
            this.priceModel = Object.assign(r, { status: 0, code: ''})
            this.makeQRCode(r.publicKey)
          })
        }
      });
    },
    makeQRCode(code) {
      let canvas = this.$refs.canva;
      let that = this

      QRCode.toCanvas(canvas, `${window.location.origin}/pay?code=${code}`, function (error) {
        if (error) console.error(error)
        that.startTimeout()
      })
    },
    startTimeout () {
      const that = this
      clearInterval(that.interval)
      debugger;
      that.interval = setInterval(() => {
        queryPayStatus({ publicKey: that.priceModel.publicKey }).then((res) => {
          if (res) {
            that.priceModel.status = 1
            that.priceModel.code = res
            clearInterval(that.interval)
          }
        })
      }, 2000);
    },
    toChenChe () {
      if (!this.code) {
        this.$message.error('请输入乘车码')
        return
      }
      takeOn({ takeRecordNumber: this.code }).then((res) => {
        if(res) {
          this.$message.success('请输入乘车码')
          this.dialogVisible = false
        }
      })
    },
    toChuZhan () {
      if (!this.code) {
        this.$message.error('请输入乘车码')
        return
      }
      takeOff({ takeRecordNumber: this.code }).then((res) => {
        if(res) {
          this.$message.success('感谢你乘车，欢迎下次光临')
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-station-wrap{
  display: flex;
  height: 100%;
  justify-content: space-around;
  .tubemap{
    height: 100%;
    flex: 1;
  }
  .from-wrap{
    width: 300px;
    padding: 20px;
    background-color: #eff2f5;
    margin: 0 10px 20px;
    .el-button+.el-button {
      margin-left: 50px;
    }
    .tips{
      font-size: 12px;
      color: red;
      text-align: left;
    }
  }
}
</style>