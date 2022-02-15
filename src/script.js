import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

let url = new URL(window.location.href);
let c = url.searchParams.get("c");
console.log("params",c)

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()

function loading(i){
    loader.load('https://d77dh4faztz32.cloudfront.net/pepperfry/skuAssets/1599490/scene.glb', function(glb){
        console.log(glb)
        const root = glb.scene;
        root.position.set(i,0,0)
        root.scale.set(1,1,1)
        scene.add(root);
    }, function(xhr){
        console.log((xhr.loaded/xhr.total*100) + " % loaded")
    },
    function(error){
        console.log("error")
    })
}
// loading(0);
for(let i = 0; i <c; i+=1)
{
    loading(i);
}
const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(2,2,5)
scene.add(light)


// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color : 0x00ff00 })
// const boxMesh = new THREE.Mesh(geometry,material)
// scene.add(boxMesh)

//hap setup
const sizes ={
    width : window.innerWidth,
    height : window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height , 0.1, 100)
camera.position.set(0,1,2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas : canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.updateShadowMap.enabled = true
renderer.gammaOutput = true

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()