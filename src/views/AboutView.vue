<template>
  <div class="home">
    <div class="container">
      <div id="cesiumContainer"></div>
    </div>
  </div>
</template>

<script>
export default {
  // 项目基于二次封装cesium的超图Api
  // 面的点击效果
  data() {
    return {
      _viewer: null, //数据前加_不会被监听
      _handler: null,
      // _preLineId:null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 渲染出地球球体
      this._viewer = new Cesium.Viewer("cesiumContainer", {});
      // 获取到区块数据
      var promise = Cesium.GeoJsonDataSource.load(
        "https://geo.datav.aliyun.com/areas_v2/bound/110000_full.json"
      );
      promise.then((datasource) => {
        this._viewer.dataSources.add(datasource);
        var entities = datasource.entities.values;
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          entity.polygon.material = Cesium.Color.SKYBLUE;
          entity.polygon.extrudedHeight = 100;
        }
      });
      // 鼠标点击面获得动效线效果
      this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
      this._handler.setInputAction((e) => {
        var pick = this._viewer.scene.pick(e.position);
        if (Cesium.defined(pick) && pick.id) {
          var feature = pick.id;
          this._viewer.entities.removeById("select_grid");
          this._viewer.entities.removeById(`line_${feature.id}`);
          let positions = feature.polygon.hierarchy.getValue(
            Cesium.JulianDate.now()
          ).positions;
          this._viewer.entities.add({
            id: "select_grid",
            polygon: {
              hierarchy: positions,
              material: this.getColorRamp(
                "rgba(0, 255, 255,1)",
                "rgba(255,0,0,0.3)"
              ),
              height: 499,
            },
          });
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this._handler.setInputAction((movement) => {
        var pickFeature =
          this._viewer.scene.pick(movement.endPosition) &&
          this._viewer.scene.pick(movement.endPosition).id;
        if (Cesium.defined(pickFeature) && this.preLineId !== pickFeature.id) {
          this.preLineId &&
            this._viewer.entities.removeById(`line_${this.preLineId}`);
          this.preLineId = pickFeature.id;
          this._viewer.entities.add({
            id: "line_" + pickFeature.id,
            name: "line_" + pickFeature.name,
            polyline: {
              positions: pickFeature.polygon.hierarchy.getValue(
                Cesium.JulianDate.now()
              ).positions,
              width: 8,
              material: new Cesium.PolylineTrailMaterialProperty({
                // 尾迹线材质
                color: Cesium.Color.AQUA,
                trailLength: 0.9,
                period: 1,
              }),
            },
          });
        } else {
          this.preLineId &&
            this._viewer.entities.removeById(`line_${this.preLineId}`);
          this.preLineId = null;
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    // canvas绘制颜色渐变
    getColorRamp(rampColor, centerColor) {
      var ramp = document.createElement("canvas");
      ramp.width = 50;
      ramp.height = 50;
      var ctx = ramp.getContext("2d");
      //通过createRadialGradient创建一个颜色渐变的对象
      var grd = ctx.createRadialGradient(25, 25, 0, 25, 25, 50);
      grd.addColorStop(0, centerColor); // "rgba(255,255,255,0)"
      grd.addColorStop(1, rampColor);

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 50, 50);

      // return ramp;

      return new Cesium.ImageMaterialProperty({
        image: ramp,
        transparent: true,
      });
    },
  },
};
</script>
