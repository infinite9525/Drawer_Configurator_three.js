import CSG from "../lib/csg/three-csg.js";

export default function zargenLoader(zargenInfo, sideType, zargenState, zargenGroup) {
  const holeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  
  function PrismGeometry ( vertices, height ) {

    var Shape = new THREE.Shape();

    ( function f( ctx ) {

        ctx.moveTo( vertices[0].x, vertices[0].y );
        for (var i=1; i < vertices.length; i++) {
            ctx.lineTo( vertices[i].x, vertices[i].y );
        }
        ctx.lineTo( vertices[0].x, vertices[0].y );

    } )( Shape );

    var settings = { };
    settings.amount = height;
    settings.bevelEnabled = false;
    THREE.ExtrudeGeometry.call( this, Shape, settings );
  };

  PrismGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );


  zargenInfo.filter(item => item.type === sideType).map((zargen, index) => {
    var A = new THREE.Vector2( 0, 0 );
    var B = new THREE.Vector2( zargen.width, 0 );
    var C = new THREE.Vector2( 0, zargen.height );

    var geometry = new PrismGeometry( [ A, B, C ], zargen.length ); 
    
    var model = new THREE.Mesh( geometry, zargen.material );
    model.position.set(zargen.x, zargen.z, zargen.y);
    model.updateMatrixWorld();

    if (zargenGroup.children[index]) {
      zargenGroup.children[index] = model;
    } else {
      zargenGroup.add(model);
    }
  })
  
  zargenGroup.children.map(item => {
    item.visible = zargenState;
  })
}
