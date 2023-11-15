import CSG from "../lib/csg/three-csg.js";

export default function glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, drawerType, frontType, height, scene) {
  Object.keys(glassInfo).forEach((key, index) => {
    glassInfo[key].map((item) => {
      var model = new THREE.Mesh(
        new THREE.BoxGeometry(item.width, item.height, item.length),
        item.material
      );
      model.rotateX(Math.PI);
      model.position.set(item.x, item.y, item.z)
      model.updateMatrixWorld();
      if (item.type === drawerType) {

        if (drawerType === "BOXCOVER") {
          if (glassBOXCOVERGroup.children[index]) {
            glassBOXCOVERGroup.children[index] = model;
          } else {
            glassBOXCOVERGroup.add(model);
          }
        }

        if (drawerType === "BOXCAP") {
          if (glassBOXCAPGroup.children[0]) {
            glassBOXCAPGroup.children[0] = model;
          } else {
            glassBOXCAPGroup.add(model);
          }
        }

        if (drawerType === "Reling") {
          if (glassRelingGroup.children[index]) {
            glassRelingGroup.children[index] = model;
          } else {
            glassRelingGroup.add(model);
          }
        }

        if (drawerType === "RelingGlass") {
          if (glassRelingGlassGroup.children[index]) {
            glassRelingGlassGroup.children[index] = model;
          } else {
            glassRelingGlassGroup.add(model);
          }
        }
      }
      if (item.type === frontType) {
        if (frontType === "hohem") {
          if (glassHohemGroup.children[0]) {
            glassHohemGroup.children[0] = model;
          } else {
            glassHohemGroup.add(model);
          }
        }
        if (frontType === "niedrigem" && height > 125) {
          if (glassNiedrigemGroup.children[0]) {
            glassNiedrigemGroup.children[0] = model;
          } else {
            glassNiedrigemGroup.add(model);
          }
        }
      }
    })


  })
}
