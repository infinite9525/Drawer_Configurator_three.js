export default function dimensionLoader(dimension, dimensionGroup, dimensionPanelGroup, width, length) {
  const PanelMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 , metalness: 0.3, roughness: 0.8 });
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

  Object.keys(dimension).forEach((key, index) => {
    var model;
    var text;
    model = new THREE.Mesh(
      new THREE.BoxGeometry(dimension[key].width, dimension[key].height, dimension[key].length),
      PanelMaterial
    );

    model.rotateX(Math.PI);
    model.position.set(dimension[key].x, dimension[key].z, dimension[key].y)
    model.updateMatrixWorld();

    var loader = new THREE.FontLoader();
    let geometry;
    let value;

    if (key === "width") {
      value = width;
    } else {
      value = length;
    }

    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
      creatText(font);
    });

    function creatText(font) {
      geometry = new THREE.TextGeometry(value.toString() + ' mm', {
        font: font,
        size: 25,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 1
      });

      text = new THREE.Mesh(geometry, textMaterial);
      text.rotateX(-Math.PI / 2);

      if (key === "width") {
        text.position.set(dimension[key].x - 65, dimension[key].z + 1, dimension[key].y + 12)
        text.updateMatrixWorld();
      }
      if (key === "length") {
        text.rotateZ(Math.PI / 2);
        text.position.set(dimension[key].x + 12, dimension[key].z + 1, dimension[key].y + 65)
        text.updateMatrixWorld();
      }

      if (dimensionGroup.children[index]) {
        dimensionGroup.children[index] = text;
      } else {
        dimensionGroup.add(text);
      }
    }

    if (dimensionPanelGroup.children[index]) {
      dimensionPanelGroup.children[index] = model;
    } else {
      dimensionPanelGroup.add(model);
    }
  })
}
