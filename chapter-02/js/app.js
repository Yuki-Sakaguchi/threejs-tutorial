/**
 * Chapter-02
 */
function init () {
  // ステータス
  const stats = initStats()

  // シーン
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100) // 霧を追加
  scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }) // 各オブジェクトのMaterialを無視して、共通でこっちを使う

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
  camera.position.x = -30
  camera.position.y = 40
  camera.position.z = 30
  camera.lookAt(scene.position)
  scene.add(camera);

  // 環境光
  const ambientLight = new THREE.AmbientLight(0x0c0c0c)
  scene.add(ambientLight)

  // スポットライト
  const spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(-20, 30, -5)
  spotLight.castShadow = true
  scene.add(spotLight)

  // レンダラー
  const renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(new THREE.Color(0xeeeeee))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  /**
   * コントローラー
   */
  const controls = new function () {
    this.rotationSpeed = 0.02
    this.numberOfObjects = scene.children.length
    
    /**
     * 立方体を追加
     */
    this.addCube = function () {
      const cubeSize = Math.ceil(Math.random() * 3) // 大きさをランダムで生成
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.castShadow = true
      cube.name = `cube-${scene.children.length}`
      cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width)
      cube.position.y = Math.round(Math.random() * 5)
      cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height)
      scene.add(cube)
      this.numberOfObjects = scene.children.length
    }

    /**
     * 立方体を削除
     */
    this.removeCube = function () {
      const allChildren = scene.children;
      const lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
          scene.remove(lastObject);
          this.numberOfObjects = scene.children.length;
      }
    }

    /**
     * sceneのオブジェクトをコンソールに表示
     */
    this.outputObjects = function () {
      console.log(scene.children)
    }
  }

  /**
   * dat.gui
   */
  const gui = new dat.GUI()
  gui.add(controls, 'rotationSpeed', 0, 0.5)
  gui.add(controls, 'addCube')
  gui.add(controls, 'removeCube')
  gui.add(controls, 'outputObjects')
  gui.add(controls, 'numberOfObjects').listen()

  /**
   * 描画する関数
   */
  function rendererScene () {
    stats.update()

    // 全てのキューブを回転させる
    scene.traverse(obj => {
      if (obj instanceof THREE.Mesh && obj != plane) {
        obj.rotation.x += controls.rotationSpeed
        obj.rotation.y += controls.rotationSpeed
        obj.rotation.z += controls.rotationSpeed
      }
    })

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
  rendererScene()
}

window.addEventListener('load', init)