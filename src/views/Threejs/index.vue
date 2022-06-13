<template>
  <div id="canvasBox">
  </div>
</template>

<script>
// 引入相关要素
// Scene:场景 perspectiveCamera：相机   WebGLRenderer:渲染器
import {
  Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from '@/treejs/Three';
export default {
  name: 'Three',
  data() {
    return {
    }
  },
  mounted() {
    this.initThreejs()
  },
  methods: {
    // 初始化threeJs
    initThreejs() {
      // 先生成一个场景，用来存放物体,又名渲染器
      const scene = new Scene()
      // 【步骤3】
      // 透视相机
      // 摄像机决定了能够在场景中看到什么
      // 我们基于摄像机的角度来计算场景对象在浏览器中会渲染成什么样子
      // 第一个参数：视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。
      // 第二个参数：宽高比
      // 第三个参数：近截面（near）
      // 第四个参数：远截面（far）
      const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      // 【步骤4】
      // 创建一个立方几何体
      const geometry = new BoxGeometry()
      // 材质
      const material = new MeshBasicMaterial({ color: 0x002299 })
      // 组合立方几何体和材质，创建出一个新的网格对象
      const cube = new Mesh(geometry, material)

      // 将立方体网格追加到场景中
      scene.add(cube)
      // 设置摄像机在z轴上的距离（也就是在屏幕上的距离）
      camera.position.z = 10
      // 【步骤5】
      // 创建渲染器
      const renderer = new WebGLRenderer()
      // 设置渲染器的大小
      renderer.setSize(window.innerWidth, window.innerHeight)
      console.log(renderer,'=====');
      // 将渲染器添加到div中
      document.getElementById('canvasBox').appendChild(renderer.domElement)


      // 【步骤6】
      // 通过修改 cube 的 rotation 的属性，改变立方体的角度。最后再不断刷新画布做出动画效果。
      function animate() {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        // 将场景和摄像机传入到渲染器中
        renderer.render(scene, camera)
      }
      animate()
      setTimeout(() => {
        scene.remove(cube)
        // 5秒后移除立方体，并重新渲染画布
        renderer.render(scene,camera)
      }, 2000);
    }
  }
}
</script>
