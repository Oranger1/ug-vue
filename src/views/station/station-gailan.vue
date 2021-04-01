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
        </el-form-item>
      </el-form>
      <canvas id="canvas" ref ="canva"></canvas>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import QRCode from 'qrcode'
import * as tubeMap from '@/js/map/d3-tube-map.js'
import londonTubeJson from './london-tube.json'
import { queryMapObj,getPrice } from '@/services/station/stationService';

export default {
  data () {
    return {
      curPos: 0,
      form: {
        beginStation: '',
        endStation: ''
      },
      file: null,
      container: null
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
      getPrice(this.form).then(r =>{
        console.log(r);

      })
      this.makeQRCode('jingyan')
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form)
        }
      });
    },
    makeQRCode(code) {
      let canvas = this.$refs.canva;
      QRCode.toCanvas(canvas, `http://192.168.0.188:8080/pay?code=${code}`, function (error) {
        if (error) console.error(error)
        console.log('success!');
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
    .tips{
      font-size: 12px;
      color: red;
      text-align: left;
    }
  }
}
</style>