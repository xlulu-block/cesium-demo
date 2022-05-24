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
        new Cesium.ArcGisMapServerImageryProvider({
          url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
        })
      );
      //   初始化场景位置 可以通过setView和flyTo飞向目的地  还有rotate:旋转 zoom:缩放 pan:平移  后面这三种方式配置的参数有所不同
      this._viewer.scene.camera.flyTo({
        // 初始化相机经纬度（这里使用了经纬度转换世界坐标的方法）
        // destination目的地   可以是Cartesian3或者Rectangle   笛卡尔或者直角坐标系
        destination: new Cesium.Cartesian3.fromDegrees(
          103.98706845922472,
          30.604509912288446,
          1000,//弧度，差不多等于放大倍数
        ),
        // orientation可以是heading | pitch | roll | direction | up
        orientation: {
          heading: Cesium.Math.toRadians(0.0),//坐标偏移量
          pitch: Cesium.Math.toRadians(-25.0), //从上往下看为-90  倾斜度
          roll: 0,
        },
      });
    },
  },
};
</script>
