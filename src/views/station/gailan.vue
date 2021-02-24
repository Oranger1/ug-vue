<template>
    <div id="tube-map"></div>    
</template>

<script>
import aa  from '../../unit/d3-tube-map'
    export default {
        data () {
            return {
                
            }
    
        },
        // mounted() {
        //   var container = d3.select("#tube-map");
        //   var width = 1600;
        //   var height = 1000;

        //   var map = d3
        //     .tubeMap()
        //     .width(width)
        //     .height(height)
        //     .margin({
        //       top: 20,
        //       right: 20,
        //       bottom: 40,
        //       left: 100,
        //     })
        //     .on("click", function (name) {
        //       console.log(name);
        //     });

        //   d3.json("london-tube.json").then(function (data) {
        //     container.datum(data).call(map);

        //     var svg = container.select("svg");

        //     zoom = d3.zoom().scaleExtent([0.5, 6]).on("zoom", zoomed);

        //     var zoomContainer = svg.call(zoom);
        //     var initialScale = 2;
        //     var initialTranslate = [100, 200];

        //     zoom.scaleTo(zoomContainer, initialScale);
        //     zoom.translateTo(
        //       zoomContainer,
        //       initialTranslate[0],
        //       initialTranslate[1]
        //     );

        //     function zoomed(event) {
        //       svg.select("g").attr("transform", event.transform.toString());
        //     }
        //   });
        // },
    }
</script>

<style lang="scss" scoped>

</style>