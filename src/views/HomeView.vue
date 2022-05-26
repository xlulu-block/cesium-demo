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
  data() {
    return {
      _viewer: null, //数据前加_不会被监听
      _handler: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 渲染出地球球体
      this._viewer = new Cesium.Viewer("cesiumContainer", {});
      // 添加底图
      var layer = this._viewer.imageryLayers.addImageryProvider(
        // 浅色底图 提供由ArcGIS MapServer托管的平铺图像。
        // new Cesium.ArcGisMapServerImageryProvider({
        //   url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
        // })
        // 深色底图 通过使用指定的URL模板请求图块来提供图像。
        new Cesium.UrlTemplateImageryProvider({
          // url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
          url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        })
      );
      //   初始化场景位置 可以通过setView和flyTo飞向目的地  还有rotate:旋转 zoom:缩放 pan:平移  后面这三种方式配置的参数有所不同
      this._viewer.scene.camera.flyTo({
        // 初始化相机经纬度（这里使用了经纬度转换世界坐标的方法）
        // destination目的地   可以是Cartesian3或者Rectangle   笛卡尔或者直角坐标系
        destination: new Cesium.Cartesian3.fromDegrees(
          121.54035,
          38.92146,
          2000 //弧度，差不多等于放大倍数
        ),
        // orientation可以是heading | pitch | roll | direction | up
        orientation: {
          heading: Cesium.Math.toRadians(0.0), //坐标偏移量
          pitch: Cesium.Math.toRadians(-25.0), //从上往下看为-90  倾斜度
          roll: 0,
        },
      });
      // 先注册全局handler，再通过setInputAction注册鼠标左击事件，获得相应的面，获取到对应的属性或者自定义操作
      this._handler = new Cesium.ScreenSpaceEventHandler(
        this._viewer.scene.canvas
      );
      this._handler.setInputAction((e) => {
        var pick = this._viewer.scene.pick(e.position);
        // 这里点击的id为我们拾取到的实体
        console.log(e, pick);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.addBillboard();
      this.addPolyline();
      this.addPolygon();
    },
    // 点
    addBillboard() {
      this._viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(121.54035, 38.92146, 2000),
        billboard: {
          // image: "https://img2.baidu.com/it/u=2243064028,1144835942&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500", // default: undefined
          image: "./monitoring.png", // default: undefined

          show: true, // default
          pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
          scale: 2.0, // default: 1.0
          color: Cesium.Color.WHITE, // default: WHITE
          rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
          alignedAxis: Cesium.Cartesian3.ZERO, // default
          width: 25, // default: undefined
          height: 25, // default: undefined
        },
      });
    },
    // 线
    addPolyline() {
      this._viewer.entities.add({
        polyline: {
          // 用笛卡尔做表集绘制图形
          positions: Cesium.Cartesian3.fromDegreesArray([
            121.534575, 38.926131, 121.537579, 38.92543, 121.541784, 38.924578,
            121.543973, 38.924144, 121.545947, 38.923944,
          ]),
          width: 4,
          material: Cesium.Color.DARKORANGE.withAlpha(0.3), //线的材质
          // clampToGround: true,//是否贴地渲染
          // show: true,
        },
      });
      this._viewer.entities.add({
        // name:entity.name,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            121.534575, 38.926131, 121.537579, 38.92543, 121.541784, 38.924578,
            121.543973, 38.924144, 121.545947, 38.923944,
          ]),
          width: 4, // 线的宽度，像素为单位
          material: new Cesium.PolylineTrailMaterialProperty({
            // 尾迹线材质
            color: Cesium.Color.GOLD,
            trailLength: 0.4,
            period: 3.0,
          }),
          // clampToGround: true,
          // show: true,
        },
      });
    },
    // 面
    addPolygon() {
      this._viewer.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            121.539208, 38.924962, 121.539176, 38.924737, 121.540195, 38.924486,
            121.540281, 38.924737,
          ]),
          extrudedHeight: 50,
          material: Cesium.Color.WHITESMOKE,
          // closeTop: false,
          // closeBottom: false,
        },
      });
    },
  },
};
</script>
