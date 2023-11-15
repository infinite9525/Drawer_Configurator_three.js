
export default function blumLoader(blum, loader, blumGroup, scene) {

  loader.load(
    blum.path,
    function (gltf) {
      blum.model = gltf.scene;

      blum.model.traverse(o => {
        if (o.isMesh) {
          o.material = blum.material;
        }
      });

      blum.model.scale.set(blum.width, blum.height, blum.length);
      blum.model.position.set(blum.x, blum.y, blum.z);
      // blum.model.rotateX(Math.PI * 0.5);
      if (blumGroup.children[0]) {
        blumGroup.children[0] = blum.model;
      } else {
        blumGroup.add(blum.model);
      }
    },
    (error) => {
      console.log(error)
    }
  );

}