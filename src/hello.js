import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import gltfFile from 'glTF/treeSmall.gltf';

// export default function sayHello() {
// 	return 'Hello World!';
// }

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;
	scene = new THREE.Scene();
	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	loader();
}

function loader(){

	const loader = new GLTFLoader();

	// THREE.DRACOLoader.setDecoderPath( '/examples/js/libs/draco' );
	// loader.setDRACOLoader( new THREE.DRACOLoader() );

	loader.load(
		// resource URL
		gltfFile,
		// called when the resource is loaded
		function ( gltf ) {

			scene.add( gltf.scene );

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

		}
	);
}

function animate() {
	requestAnimationFrame( animate );

	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.02;

	renderer.render( scene, camera );
}
