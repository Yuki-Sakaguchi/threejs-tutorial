/**
 * Chapter-01 - Basic skeleton
 */
const scene = new THREE.Scene()
const camera = new THREE.PersepectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()

