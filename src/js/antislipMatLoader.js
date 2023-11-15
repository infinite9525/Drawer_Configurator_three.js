import CSG from "../lib/csg/three-csg.js";

export default function antislipMatLoader(holes, antislipMat, holeType, holeState, matState, matGroup) {
  const holeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  // if (matState) {
  var mat;
  var model;
  model = new THREE.Mesh(
    new THREE.BoxGeometry(antislipMat.width, antislipMat.height, antislipMat.length),
    antislipMat.material
  );
  model.rotateX(Math.PI);
  model.position.set(antislipMat.x, antislipMat.z, antislipMat.y)
  model.updateMatrixWorld();

  if (holeState) {
    var tempMesh = model;
    holes.filter(item => (item.holeType === holeType)).map((hole, index) => {
      var holeMesh;
      if (hole.objectType === "draw") {
        if (hole.type === "BoxGeometry") {
          holeMesh = new THREE.Mesh(
            new THREE.BoxGeometry(hole.width, hole.height, hole.length),
            holeMaterial
          )
          holeMesh.position.set(hole.x, hole.z + 10, hole.y);
          holeMesh.updateMatrixWorld();
        }
        if (hole.type === "CylinderGeometry") {
          holeMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(hole.radius, hole.radius, hole.height, 50),
            holeMaterial
          )
          holeMesh.scale.set(hole.width, 1, 1);
          holeMesh.position.set(hole.x, hole.z + 10, hole.y);
          holeMesh.updateMatrixWorld();
        }
        // }
      }
      if (hole.objectType === "import") {
        loader.load(
          hole.path,
          function (gltf) {
            hole.model = gltf.scene;
            hole.model.traverse(function (child) {
              if (child.isMesh) {
                holeMesh = new THREE.Mesh(
                  child.geometry,
                  holeMaterial
                )
                holeMesh.scale.set(hole.width, hole.height, hole.length);
                holeMesh.position.set(hole.x, hole.y, hole.z);
                holeMesh.updateMatrixWorld();
              }
            })
          },
          (error) => {
            console.log(error)
          }
        )
      }
      if (holeMesh) {
        const holeCSG = CSG.fromMesh(holeMesh);
        const holeMeshCSG = CSG.fromMesh(tempMesh)
        const MeshSubtractCSG = holeMeshCSG.subtract(holeCSG)
        mat = CSG.toMesh(
          MeshSubtractCSG,
          model.matrix
        )
        tempMesh = mat;
      }
    })
    mat.drawMode = 0;
    mat.material = antislipMat.material;
    mat.updateMatrixWorld();

    if (matGroup.children[0]) {
      matGroup.children[0] = mat;
    } else {
      matGroup.add(mat);
    }
  } else {
    if (matGroup.children[0]) {
      matGroup.children[0] = model;
    } else {
      matGroup.add(model);
    }
  }
  matGroup.children[0].visible = matState;
  // }
}
