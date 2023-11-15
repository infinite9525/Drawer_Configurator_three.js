import CSG from "../lib/csg/three-csg.js";

export default function siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene) {
  const holeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  if (holeState) {
    siphonPlates.filter(item => (item.holeType === holeType)).map((siphonPlate, index) => {
      var siphon;
      var model;
      if (siphonPlate.type === "BoxGeometry") {
        model = new THREE.Mesh(
          new THREE.BoxGeometry(siphonPlate.width, siphonPlate.height, siphonPlate.length),
          holeMaterial
        );
      }
      if (siphonPlate.type === "CylinderGeometry") {
        model = new THREE.Mesh(
          new THREE.CylinderGeometry(siphonPlate.radius, siphonPlate.radius, siphonPlate.height, 50),
          holeMaterial
        )
        model.scale.set(siphonPlate.width, 1, 1);
        model.updateMatrixWorld();
      }
      var tempMesh = model;
      siphonPlate.hole.map((hole) => {
        var holeMesh;
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
          holeMesh.position.set(hole.x, hole.z, hole.y);
          holeMesh.scale.set(hole.width, 1, 1);
          holeMesh.updateMatrixWorld();
        }

        const holeCSG = CSG.fromMesh(holeMesh);
        const plateMeshCSG = CSG.fromMesh(tempMesh);
        const MeshSubtractCSG = plateMeshCSG.subtract(holeCSG);
        siphon = CSG.toMesh(
          MeshSubtractCSG,
          model.matrix
        )
        tempMesh = siphon;
      })
      siphon.drawMode = 0;
      siphon.material = siphonPlate.material;
      siphon.position.set(siphonPlate.x, siphonPlate.z, siphonPlate.y);
      siphon.updateMatrixWorld();

      // const edges = new THREE.EdgesGeometry(siphon.geometry);
      // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
      // // line.rotateX(Math.PI)
      // line.position.set(siphonPlate.x, siphonPlate.z, siphonPlate.y);
      // console.log('line: ', line);
      // scene.add(line);

      if (holeType === "luxury") {
        if (siphon1EcoGroup.children[0]) {
          siphon1EcoGroup.children[0] = siphon;
        } else {
          siphon1EcoGroup.add(siphon);
        }
      }

      if (holeType === "eco") {
        if (siphon1LuxuryGroup.children[index]) {
          siphon1LuxuryGroup.children[index] = siphon;
        } else {
          siphon1LuxuryGroup.add(siphon);
        }
      }
    })
  }

  if (holeState && holeNumber === "2") {
    siphonPlates1.filter(item => (item.holeType === holeType)).map((siphonPlate, index) => {
      var siphon;
      var model;
      if (siphonPlate.type === "BoxGeometry") {
        model = new THREE.Mesh(
          new THREE.BoxGeometry(siphonPlate.width, siphonPlate.height, siphonPlate.length),
          holeMaterial
        );
      }
      if (siphonPlate.type === "CylinderGeometry") {
        model = new THREE.Mesh(
          new THREE.CylinderGeometry(siphonPlate.radius, siphonPlate.radius, siphonPlate.height, 50),
          holeMaterial
        )
        model.scale.set(siphonPlate.width, 1, 1);
        model.updateMatrixWorld();
      }
      var tempMesh = model;
      siphonPlate.hole.map((hole) => {
        var holeMesh;
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
          holeMesh.position.set(hole.x, hole.z, hole.y);
          holeMesh.scale.set(hole.width, 1, 1);
          holeMesh.updateMatrixWorld();
        }

        const holeCSG = CSG.fromMesh(holeMesh);
        const plateMeshCSG = CSG.fromMesh(tempMesh);
        const MeshSubtractCSG = plateMeshCSG.subtract(holeCSG);
        siphon = CSG.toMesh(
          MeshSubtractCSG,
          model.matrix
        )
        tempMesh = siphon;
      })
      siphon.drawMode = 0;
      siphon.material = siphonPlate.material;
      siphon.position.set(siphonPlate.x, siphonPlate.z, siphonPlate.y);
      siphon.updateMatrixWorld();

      // const edges = new THREE.EdgesGeometry(siphon.geometry);
      // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
      // // line.rotateX(Math.PI)
      // line.position.set(siphonPlate.x, siphonPlate.z, siphonPlate.y);
      // console.log('line: ', line);
      // scene.add(line);

      if (holeType === "luxury") {
        if (siphon2EcoGroup.children[0]) {
          siphon2EcoGroup.children[0] = siphon;
        } else {
          siphon2EcoGroup.add(siphon);
        }
      }

      if (holeType === "eco") {
        if (siphon2LuxuryGroup.children[index]) {
          siphon2LuxuryGroup.children[index] = siphon;
        } else {
          siphon2LuxuryGroup.add(siphon);
        }
      }
    })
  }
}