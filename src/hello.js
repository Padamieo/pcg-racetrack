import {PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh, WebGLRenderer} from 'three';
import OrbitControls from 'three-orbitcontrols';

import FBXLoader from 'three-fbx-loader';
import file from 'assets/FBX/treeSmall.fbx';

var camera, scene, renderer;
var geometry, material, mesh;
var controls;
var loaders;

export default function sayHello() {
	init();
	animate();
}

function init() {
	camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;
	scene = new Scene();
	// geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
	material = new MeshNormalMaterial();
	// mesh = new Mesh( geometry, material );
	//scene.add( mesh );

	loaders = new FBXLoader();

	loaders.load('https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx', load, (pro)=> console.log(pro), (e)=> console.log(e) );

	renderer = new WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	loader();
}

function load(object3d) {
	var m = new Mesh( object3d, material );
	scene.add(m);
};

function loader(){
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = false;
}

function animate() {
	requestAnimationFrame( animate );

	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.02;

	renderer.render( scene, camera );
}
