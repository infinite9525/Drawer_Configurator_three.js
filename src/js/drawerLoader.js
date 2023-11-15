import CSG from "../lib/csg/three-csg.js";
import { LineSegmentsGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.126.1/examples/jsm/lines/LineSegmentsGeometry.js';
import { Wireframe } from 'https://cdn.jsdelivr.net/npm/three@0.126.1/examples/jsm/lines/Wireframe.js';
import { LineMaterial } from 'https://cdn.jsdelivr.net/npm/three@0.126.1/examples/jsm/lines/LineMaterial.js';

export default function drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene) {
  console.log('holeNumber: ', holeNumber);
  const holeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  let isCorner = "no-corner";
  if (frontType === "einfacher") {
    isCorner = "no-corner";
  } else {
    isCorner = "corner";
  }
  // if (matState) {
  Object.keys(drawerInfo).forEach((key, index) => {

    var model;
    var holeModel;
    var mesh = new THREE.Mesh(
      new THREE.BoxGeometry(drawerInfo[key].width, drawerInfo[key].height, drawerInfo[key].length),
      drawerInfo[key].material
    );
    mesh.rotateX(Math.PI);
    mesh.position.set(drawerInfo[key].x, drawerInfo[key].y, drawerInfo[key].z)
    mesh.updateMatrixWorld();

    if (drawerInfo[key].hole && holeState) {
      var tempMesh = mesh;
      drawerInfo[key].hole.filter(item => (item.holeType === holeType)).map((hole, index) => {
        var holeMesh;
        if (hole.objectType === "draw") {
          if (hole.type === "BoxGeometry") {
            holeMesh = new THREE.Mesh(
              new THREE.BoxGeometry(hole.width, hole.height, hole.length),
              holeMaterial
            )
            holeMesh.position.set(hole.x, hole.z, hole.y);
            holeMesh.updateMatrixWorld();
            // scene.add(holeMesh);
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

    if (holeNumber === "2" && drawerInfo[key].hole1 && holeState) {
      console.log("enter");
      var tempMesh = holeModel;
      drawerInfo[key].hole1.filter(item => (item.holeType === holeType)).map((hole, index) => {
        var holeMesh;
        if (hole.objectType === "draw") {
          if (hole.type === "BoxGeometry") {
            holeMesh = new THREE.Mesh(
              new THREE.BoxGeometry(hole.width, hole.height, hole.length),
              holeMaterial
            )
            holeMesh.position.set(hole.x, hole.z, hole.y);
            holeMesh.updateMatrixWorld();
            // scene.add(holeMesh);
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
      model = holeModel;
    }


    if (drawerInfo[key].socketHole && socketState) {
      var tempMesh = holeModel;
      drawerInfo[key].socketHole.map((hole, index) => {
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

    if (drawerInfo[key].glassHole) {
      var tempMesh = holeModel;
      drawerInfo[key].glassHole.filter(item => item.holeType === heightType).map((hole, index) => {
        var holeMesh;
        if (hole.type === "BoxGeometry") {
          holeMesh = new THREE.Mesh(
            new THREE.BoxGeometry(hole.width, hole.height, hole.length),
            holeMaterial
          )
          holeMesh.position.set(hole.x, hole.z, hole.y);
          holeMesh.updateMatrixWorld();
          // scene.add(holeMesh);
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

      drawerInfo[key].glassHole.filter(item => item.holeType === frontType).map((hole, index) => {
        var holeMesh;
        if (hole.type === "BoxGeometry") {
          holeMesh = new THREE.Mesh(
            new THREE.BoxGeometry(hole.width, hole.height, hole.length),
            holeMaterial
          )
          holeMesh.position.set(hole.x, hole.z, hole.y);
          holeMesh.updateMatrixWorld();
          // scene.add(holeMesh);
        }
        if (!(height < 125 && frontType === "niedrigem")) {
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
        }
      })

      if (key === "front") {
        drawerInfo[key].glassHole.filter(item => item.holeType === isCorner).map((hole, index) => {
          var holeMesh;
          if (hole.type === "BoxGeometry") {
            holeMesh = new THREE.Mesh(
              new THREE.BoxGeometry(hole.width, hole.height, hole.length),
              holeMaterial
            )
            holeMesh.position.set(hole.x, hole.z, hole.y);
            holeMesh.updateMatrixWorld();
            // scene.add(holeMesh);
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
      }
    } else {
      model = holeModel;
    }

    model.material = drawerInfo[key].material;
    model.drawMode = 0;
    const edges = new THREE.EdgesGeometry(model.geometry);
    // var lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(edges);
    // var matLine = new LineMaterial({
    //   color: 0x4080ff,
    //   linewidth: 5,
    // });
    // var wireframe = new Wireframe(lineGeometry, matLine);
    // wireframe.computeLineDistances();
    // wireframe.scale.set(1, 1, 1);
    // wireframe.rotateX(Math.PI)
    // wireframe.position.set(drawerInfo[key].x, drawerInfo[key].y, drawerInfo[key].z);

    // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    // line.rotateX(Math.PI)
    // line.position.set(drawerInfo[key].x, drawerInfo[key].y, drawerInfo[key].z);
    // console.log('line: ', line);
    // scene.add(line);
    if (drawerGroup.children[index]) {
      drawerGroup.children[index] = model;
    } else {
      drawerGroup.add(model);
    }
  })
}
