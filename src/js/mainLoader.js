import CSG from "../lib/csg/three-csg.js";
import { RoundedBoxGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.126.1/examples/jsm/geometries/RoundedBoxGeometry.js';

export default function mainLoader(modelsInfo, loader, group, holeState, holeType, socketState, scene) {
  const holeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  Object.keys(modelsInfo).forEach((key, index) => {

    loader.load(
      modelsInfo[key].path,
      function (gltf) {
        modelsInfo[key].model = gltf.scene;
        modelsInfo[key].model.traverse(function (child) {
          var model;
          var holeModel;
          if (child.isMesh) {
            const mesh = new THREE.Mesh(
              child.geometry,
              modelsInfo[key].material
            )
            mesh.scale.set(modelsInfo[key].width, modelsInfo[key].length, modelsInfo[key].height);
            mesh.position.set(modelsInfo[key].x, modelsInfo[key].y, modelsInfo[key].z);
            mesh.rotateX(Math.PI * 0.5);
            if (key === "hole1") {
              mesh.rotateX(Math.PI);
              mesh.rotateZ(Math.PI);
            }
            mesh.updateMatrixWorld();
            if (modelsInfo[key].hole && holeState) {
              var tempMesh = mesh;
              modelsInfo[key].hole.filter(item => (item.holeType === holeType)).map((hole, index) => {
                var holeMesh;
                if (hole.objectType === "draw") {
                  if (hole.type === "BoxGeometry") {
                    holeMesh = new THREE.Mesh(
                      new THREE.BoxGeometry(hole.width, hole.height, hole.length),
                      holeMaterial
                    )
                    holeMesh.position.set(hole.x, hole.z, hole.y);
                    holeMesh.updateMatrixWorld();
                  }
                  if (hole.type === "CylinderGeometry") {
                    holeMesh = new THREE.Mesh(
                      new THREE.CylinderGeometry(hole.radius, hole.radius, hole.height, 50),
                      holeMaterial
                    )
                    holeMesh.scale.set(hole.width, 1, 1);
                    holeMesh.position.set(hole.x, hole.z, hole.y);
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
                          holeMesh.scale.set(hole.width, hole.length, hole.height);
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
                  holeModel = CSG.toMesh(
                    MeshSubtractCSG,
                    mesh.matrix
                  )
                  tempMesh = holeModel;
                }
              })
            } else {
              holeModel = mesh;
            }
            model = holeModel;

            if (modelsInfo[key].socketHole && socketState) {
              var tempMesh = holeModel;
              modelsInfo[key].socketHole.map((hole, index) => {
                var holeMesh;
                if (hole.type === "CylinderGeometry") {
                  holeMesh = new THREE.Mesh(
                    new THREE.CylinderGeometry(hole.radius, hole.radius, hole.height, 50),
                    holeMaterial
                  )
                  holeMesh.rotateX(Math.PI / 2);
                  holeMesh.position.set(hole.x, hole.z, hole.y);
                  holeMesh.updateMatrixWorld();
                }
                if (holeMesh) {
                  const holeCSG = CSG.fromMesh(holeMesh);
                  const holeMeshCSG = CSG.fromMesh(tempMesh)
                  const MeshSubtractCSG = holeMeshCSG.subtract(holeCSG)
                  model = CSG.toMesh(
                    MeshSubtractCSG,
                    mesh.matrix
                  )
                  tempMesh = model;
                }
              })
            } else {
              model = holeModel;
            }

            model.material = modelsInfo[key].material;
            model.drawMode = 0;
            if (group.children[index]) {
              group.children[index] = model;
            } else {
              group.add(model);
            }
          }
        })
      },
      (error) => {
        console.log(error)
      }
    )
  })

}