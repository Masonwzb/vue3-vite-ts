import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

loader.load( './src/practice/fileParse/cjie0510.gltf', function ( gltf ) {

    console.log('gltf ? ', gltf)

}, undefined, function ( error ) {

    console.error( error );

} );
