/**
 * Chapter-01 - Basic skeleton
 */

// アニメーションで使う変数
let step = 0

// ステータス
const stats = initStats() // FPSを表示する

// シーン
const scene = new THREE.Scene()

// カメラ
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position) // シーンの真ん中を見る設定

// スポットライト
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-20, 30, -5)
spotLight.castShadow = true // 影を描画する
scene.add(spotLight)

// レンダラー
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0xeeeeee)) // 背景色を設定
renderer.setSize(window.innerWidth, window.innerHeight) // 描画するシーンの大きさ設定
renderer.shadowMap.enabled = true // 影を描画する

// x, y, z軸のデバッグ用オブジェクト
const axes = new THREE.AxesHelper(20)
scene.add(axes)

// ２次元の平面
const planeGeometry = new THREE.PlaneGeometry(60, 20) // 形状
const planeMaterial = new THREE.MeshLambertMaterial({ // 素材 （MeshBasicMaterialだと光が影響しないのでMeshLanbertMaterialに変更）
  color: 0xcccccc,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0
plane.receiveShadow = true // 影を描画する
scene.add(plane)

// ３次元の立方体
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  // wireframe: true, // 線だけで描画
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.x = -4
cube.position.y = 3
cube.position.z = 0
cube.castShadow = true
scene.add(cube)

// ３次元の球
const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0x7777ff,
  // wireframe: true,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x = 20
sphere.position.y = 4
sphere.position.z = 2
sphere.castShadow = true
scene.add(sphere)

/**
 * 描画する関数
 */
function rendererScene () {
  stats.update() // FPSのステータスを更新

  // 立方体を回転
  cube.rotation.x += controls.rotationSpeed
  cube.rotation.y += controls.rotationSpeed
  cube.rotation.z += controls.rotationSpeed

  // 球を移動
  step += controls.bounsingSpeed
  sphere.position.x = 20 + (10 * (Math.cos(step)))
  sphere.position.y = 2 + (10 * (Math.abs(Math.sin(step))))

  requestAnimationFrame(rendererScene) // 再帰的にアニメーション実行
  renderer.render(scene, camera) // 描画
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

// DOMに追加し、アニメーションを開始
document.getElementById('WebGL-output').appendChild(renderer.domElement)
window.addEventListener('resize', onResize)
rendererScene()