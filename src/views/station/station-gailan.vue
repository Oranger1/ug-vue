<template>
  <div class="tubemap" id="tube-map"></div>
</template>

<script>
import * as d3 from 'd3'
import * as tubeMap from '@/js/map/d3-tube-map.js'
import londonTubeJson from './london-tube.json'
import { queryMapObj } from '@/services/station/stationService';

export default {
  data () {
    return {
      container: null
    }
  },
  mounted() {
    this.container = d3.select("#tube-map");
    var width = 1600;
    var height = 1000;
    var map = tubeMap.tubeMap().width(width).height(height).margin({ top: 20, right: 20, bottom: 40, left: 100 }).on("click", function (name) {
          console.log(name);
        });

    queryMapObj().then(r => {
      this.initMapData(r, map)
    })
      // this.initMapData(londonTubeJson, map)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.tubemap{
  height: 100%;
}
</style>