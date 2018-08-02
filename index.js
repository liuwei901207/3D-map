$(document).ready(function () {

  var scene, camera, renderer, daeModel, controls

  /**
   * 初始化场景
   */
  function initScene () {
    scene = new THREE.Scene()
  }

  /**
   * 初始化摄像头
   */
  function initCamera () {
    aspect = window.innerWidth / window.innerHeight
    D = 8
    camera = new THREE.OrthographicCamera(-D * aspect, D * aspect, D, -D, 1,
      1000)
    //camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,200)
    camera.position.set(300, -300, 300)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    camera.up.x = 0
    camera.up.y = 0
    camera.up.z = 1
    camera.rotation.z = 1 / 6 * Math.PI
    camera.rotation.z = 5 / 6 * Math.PI
  }

  /**
   * 初始化Three设置
   */
  function initThree () {
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#000', 1.0)
    document.body.appendChild(renderer.domElement)
  }

  /**
   * 初始化光源
   */
  function initLight () {
    var light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(3000, -3000, 2000)
    scene.add(light)
  }

  /**
   * 加载模型数据
   */
  function LoadModel (path) {
    var loader = new THREE.ColladaLoader()
    loader.load(path, function (collada) {
        daeModel = collada.scene
        daeModel.scale.set(0.001, 0.001, 0.001)
        daeModel.position.set(0, 0, 0)
        scene.add(daeModel)
        //参考坐标轴
        var axisHelper = new THREE.AxesHelper(5000)
        scene.add(axisHelper)
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      })
  }

  /**
   * 初始化渲染器
   */
  function render () {
    requestAnimationFrame(render)
    renderer.clear()
    renderer.render(scene, camera)
  }

  /**
   * 初始化控制器
   */
  function initControls () {
    controls = new THREE.OrbitControls(camera)
  }

  function demoStart () {
    console.log('Load Model started...')
    initScene()
    initCamera()
    initThree()
    initLight()
    LoadModel('./data/modelData/test2/test2.dae')
    LoadModel('./data/modelData/test/test.dae')
    render()
    initControls()
  }

  window.onload = function () {
    demoStart()
  }

})