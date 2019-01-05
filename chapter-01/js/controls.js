/**
 * コントローラー初期値
 */
var controls = new function () {
  this.rotationSpeed = 0.02
  this.bounsingSpeed = 0.03
}

/**
 * dat.guiに設定
 */
var gui = new dat.GUI()
gui.add(controls, 'rotationSpeed', 0, 0.5)
gui.add(controls, 'bounsingSpeed', 0, 0.5)