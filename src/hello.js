import {
	FaceColors,
	DoubleSide,
	PerspectiveCamera,
	Scene,
	BoxGeometry,
	MeshNormalMaterial,
	MeshBasicMaterial,
	Mesh,
	WebGLRenderer,
	PlaneGeometry
} from 'three';
import OrbitControls from 'three-orbitcontrols';

import FBXLoader from 'three-fbx-loader';
import file from 'assets/FBX/untitled.fbx';

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
	//material = new MeshNormalMaterial();
	// mesh = new Mesh( geometry, material );
	//scene.add( mesh );

	loaders = new FBXLoader();

	loaders.load(file, load, (pro)=> console.log(pro), (e)=> console.log(e) );

	renderer = new WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	addPlane();
	controls();
}

function addPlane(){
	var geometry = new PlaneGeometry( 1, 1, 1 );
	var material = new MeshBasicMaterial( {color: 0xffff00, side: DoubleSide} );
	var plane = new Mesh( geometry, material );
	plane.rotateX(1.5708);
	plane.translateZ(0.5);
	scene.add( plane );
}

function load(object3d) {
	console.log(object3d);
	var mesh = object3d.children[0];
	console.log(mesh);
	var materialObj = new MeshBasicMaterial({
		color: 0xffffff,
		vertexColors: FaceColors,
		overdraw: 0.5,
		side: DoubleSide
	});
	mesh.material = materialObj;
	// mesh.traverse(function(child) {
	// 	if (child instanceof Mesh) {
	// 		child.material = materialObj;
	// 	}
	// });
	//var mesh = new Mesh( object3d, material );
	scene.add(mesh);
};

function controls(){
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
