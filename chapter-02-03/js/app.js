/**
 * Chapter-02-03
 */
function init () {
  // ステータス
  const stats = initStats()

  // シーン
  const scene = new THREE.Scene()

  // ２次元の平面
  const planeGeometry = new THREE.PlaneGeometry(40, 40, 1, 1)
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.x = 0
  plane.position.y = 0
  plane.position.z = 0
  plane.receiveShadow = true
  scene.add(plane)

  // カメラ
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
  camera.position.x = -50
  camera.position.y = 30
  camera.position.z = 20
  camera.lookAt(new THREE.Vector3(-10, 0, 0))
  scene.add(camera);

  // 環境光
  const ambientLight = new THREE.AmbientLight(0x090909)
  scene.add(ambientLight)

  // スポットライト
  const spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(-25, 25, 32)
  spotLight.castShadow = true
  scene.add(spotLight)

  // レンダラー
  const renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(new THREE.Color(0xeeeeee))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  /**
   * ジオメトリー一覧を作成
   * @param {THREE.Scene} scene 
   */
  function addGeometries (scene) {
    const vertices = [
      new THREE.Vector3(1, 3, 1),
      new THREE.Vector3(1, 3, -1),
      new THREE.Vector3(1, -1, 1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 3, -1),
      new THREE.Vector3(-1, 3, 1),
      new THREE.Vector3(-1, -1, -1),
      new THREE.Vector3(-1, -1, 1),
    ]

    const faces = [
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(2, 3, 1),
      new THREE.Face3(4, 6, 5),
      new THREE.Face3(6, 7, 5),
      new THREE.Face3(4, 5, 1),
      new THREE.Face3(5, 0, 1),
      new THREE.Face3(7, 6, 2),
      new THREE.Face3(6, 3, 2),
      new THREE.Face3(5, 7, 0),
      new THREE.Face3(7, 2, 0),
      new THREE.Face3(1, 3, 4),
      new THREE.Face3(3, 6, 4),
    ]

    const geom = new THREE.Geometry()
    geom.vertices = vertices
    geom.faces = faces
    geom.computeFaceNormals()

    const mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }))
    mesh.position.x = 0
    mesh.position.y = 4
    mesh.position.z = 0

    scene.add(mesh)
  }

  /**
   * 描画する関数
   */
  function rendererScene () {
    stats.update()
    requestAnimationFrame(rendererScene)
    renderer.render(scene, camera)
  }

  /**
   * リサイズ時の表示変更処理
   */
  function onResize () {
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  /**
   * Statusを表示する
   */
  function initStats () {
    const stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    document.getElementById('Stats-output').appendChild(stats.domElement)
    return stats
  }

  // DOMに追加
  document.getElementById('WebGL-output').appendChild(renderer.domElement)
  window.addEventListener('resize', onResize)
  addGeometries(scene)
  rendererScene()
}

window.addEventListener('load', init)