/**
 * Chapter-02-02
 */
function init () {
  // ステータス
  const stats = initStats()

  // シーン
  const scene = new THREE.Scene()

  // ２次元の平面
  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
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
    // 位置
    const points = [
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(2, 2, -2),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(-2, 2, 2),
      new THREE.Vector3(2, -2, 2),
      new THREE.Vector3(2, -2, -2),
      new THREE.Vector3(-2, -2, -2),
      new THREE.Vector3(-2, -2, 2),
    ]

    // 位置情報
    const pts = []
    const detail = 0.1
    const radius = 3
    for (let angle = 0.0; angle < Math.PI; angle += detail) {
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0))
    }

    // 形状
    const geoms = []
    geoms.push(new THREE.CylinderGeometry(1, 4, 4))
    geoms.push(new THREE.BoxGeometry(2, 2, 2))
    geoms.push(new THREE.SphereGeometry(2))
    geoms.push(new THREE.IcosahedronGeometry(4))
    geoms.push(new THREE.ConvexGeometry(points))
    geoms.push(new THREE.LatheGeometry(pts, 12))
    geoms.push(new THREE.OctahedronGeometry(3))
    geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10))
    geoms.push(new THREE.TetrahedronGeometry(3))
    geoms.push(new THREE.TorusGeometry(3, 1, 10, 10))
    geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20))

    // 配置する
    let j = 0
    for (let i = 0; i < geoms.length; i++) {
      const cubeMaterial = new THREE.MeshLambertMaterial({ wireframe: true, color: Math.random() * 0xffffff })
      const materials = [
        new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff, shading: THREE.FlatShading }),
        new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }),
      ]

      const mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials)
      mesh.traverse(function (e) { e.castShadow = true })
      mesh.position.x = -24 + ((i % 4) * 12)
      mesh.position.y = 4
      mesh.position.z = -8 + (j * 12)

      if ((i + 1) % 4 === 0) j++
      scene.add(mesh)
    }
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