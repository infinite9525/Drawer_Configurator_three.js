export default function electronicProductsLoader(electronicProducts, loader, socketGroup, powerSupplyGroup, cableGroup, socketState, socketType, scene) {

  electronicProducts.sockets.filter(item => item.type === socketType).map((socket, index) => {
    loader.load(
      socket.path,
      function (gltf) {
        socket.model = gltf.scene;

        socket.model.traverse(o => {
          if (o.isMesh) {
            o.material = socket.material;
          }
        });

        socket.model.rotateZ(Math.PI / 2);
        socket.model.rotateY(Math.PI / 2);
        socket.model.scale.set(socket.width, socket.height, socket.length);
        socket.model.position.set(socket.x, socket.z, socket.y);
        if (socketGroup.children[index]) {
          socketGroup.children[index] = socket.model;
        } else {
          socketGroup.add(socket.model);
        }
        socketGroup.children[index].visible = socketState;
      },
      (error) => {
        console.log(error)
      }
    );
  })

  socketGroup.children.map(item => {
    item.visible = socketState;
  })

  const powerSupply = electronicProducts.powerSupply;
  loader.load(
    powerSupply.path,
    function (gltf) {
      powerSupply.model = gltf.scene;

      powerSupply.model.traverse(o => {
        if (o.isMesh) {
          o.material = powerSupply.material;
        }
      });

      powerSupply.model.scale.set(powerSupply.width, powerSupply.height, powerSupply.length);
      powerSupply.model.position.set(powerSupply.x, powerSupply.z, powerSupply.y);
      powerSupply.model.rotateX(Math.PI / 2);
      powerSupply.model.rotateY(Math.PI);
      if (powerSupplyGroup.children[0]) {
        powerSupplyGroup.children[0] = powerSupply.model;
      } else {
        powerSupplyGroup.add(powerSupply.model);
      }
      powerSupplyGroup.children[0].visible = socketState;
    },
    (error) => {
      console.log(error)
    }
  );

  const cables = electronicProducts.cable;
  const curve = [new THREE.Vector3(cables.points[0].x, cables.points[0].z, cables.points[0].y), new THREE.Vector3(cables.points[1].x, cables.points[1].z, cables.points[1].y), new THREE.Vector3(cables.points[2].x, cables.points[2].z, cables.points[2].y), new THREE.Vector3(cables.points[3].x, cables.points[3].z, cables.points[3].y), new THREE.Vector3(cables.points[4].x, cables.points[4].z, cables.points[4].y)];
  const Spline = new THREE.CatmullRomCurve3(curve);
  const extrudeSettings2 = {
    steps: 200,
    bevelEnabled: false,
    extrudePath: Spline
  };
  const circle = new THREE.Shape();
  circle.absarc(0, 0, 2);
  const geometry = new THREE.ExtrudeGeometry(circle, extrudeSettings2);

  const curveObject = new THREE.Mesh(geometry, cables.material);

  if (cableGroup.children[0]) {
    cableGroup.children[0] = curveObject;
  } else {
    cableGroup.add(curveObject);
  }

  // })

  cableGroup.children[0].visible = socketState;
}