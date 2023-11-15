import siphonLoader from "./js/siphonLoader.js";
import antislipMatLoader from "./js/antislipMatLoader.js";
import dimensionLoader from './js/dimensionLoader.js';
import electronicProductsLoader from './js/electronicProductsLoader.js';
import drawerLoader from "./js/drawerLoader.js";
import blumLoader from "./js/blumLoader.js";
import glassLoader from "./js/glassLoader.js";
import zargenLoader from "./js/zargenLoader.js";

const thickFront = 16;
const thickFront1 = 13;
const thickBack = 13;
const thickSide = 13;
const thickBottom = 16;
const thickGlass = 10;
const initialRepeatBumpMap = 40;
const initialWidth = 500;
const initialLength = 500;
const initialHeight = 129;

let scene,
  gui,
  renderer,
  camera,
  controls,
  matState = false,
  holeState = true,
  socketState = false,
  zargenState = true,
  holeType = "luxury",
  socketType = "Rexi",
  width = initialWidth,
  length = initialLength,
  height = initialHeight,
  holeHeight = 118,
  holeWidth = 144,
  holeLength = 200,
  hole1Position = 0,
  hole2Position = 100,
  repeatBumpMapX = 40,
  repeatBumpMapY = 40,
  heightType = "normal",
  frontType = "einfacher",
  sideType = "zargen1",
  holeNumber = "1";

let group = new THREE.Group();
let siphon1EcoGroup = new THREE.Group();
let siphon1LuxuryGroup = new THREE.Group();
let siphon2EcoGroup = new THREE.Group();
let siphon2LuxuryGroup = new THREE.Group();
let matGroup = new THREE.Group();
let dimensionGroup = new THREE.Group();
let dimensionPanelGroup = new THREE.Group();
let socketGroup = new THREE.Group();
let powerSupplyGroup = new THREE.Group();
let cableGroup = new THREE.Group();
let drawerGroup = new THREE.Group();
let blumGroup = new THREE.Group();
let glassBOXCOVERGroup = new THREE.Group();
let glassBOXCAPGroup = new THREE.Group();
let glassRelingGroup = new THREE.Group();
let glassHohemGroup = new THREE.Group();
let glassNiedrigemGroup = new THREE.Group();
let zargenGroup = new THREE.Group();
let glassRelingGlassGroup = new THREE.Group();

let drawerEdgeGroup = new THREE.Group();

var widthSlider = document.getElementById("widthSlider");
var lengthSlider = document.getElementById("lengthSlider");
var holeLengthSlider = document.getElementById("holeLengthSlider");
var holeWidthSlider = document.getElementById("holeWidthSlider");
var holePositionSlider = document.getElementById("holePositionSlider");
var widthInput = document.getElementById("widthInput");
var lengthInput = document.getElementById("lengthInput");
var holeWidthInput = document.getElementById("holeWidthInput");
var holeLengthInput = document.getElementById("holeLengthInput");
var holePositionInput = document.getElementById("holePositionInput");
var materialSelect = document.getElementById("material");
var partSelect = document.getElementById("part");
var holeTypeSelect = document.getElementById("holeType");
var holeStateInput = document.getElementById("holeStateInput");
var matStateInput = document.getElementById("matStateInput");
var socketStateInput = document.getElementById("socketStateInput");
var heightSelect = document.getElementById("heightSelect");
var frontTypeSelect = document.getElementById("frontTypeSelect");
var zargenTypeSelect = document.getElementById("zargenTypeSelect");
var holeNumberSelect = document.getElementById("holeNumber");
var holeHeightSlider = document.getElementById("holeHeightSlider");
var holeHeightInput = document.getElementById("holeHeightInput");

materialSelect.value = "0xB0B0A9";
heightSelect.value = "129";
frontTypeSelect.value = frontType;
zargenTypeSelect.value = sideType;
var color = materialSelect.value;
var selectedModel = partSelect.value;

THREE.DRACOLoader.setDecoderPath('https://cdn.jsdelivr.net/gh/mrdoob/Three.js@r92/examples/js/libs/draco/gltf/');
var bumpTexture = new THREE.TextureLoader().load('assets/texture/bump_map1.png', function (bumpTexture) {
  bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
  bumpTexture.offset.set(0.5, 1);
  bumpTexture.repeat.set(repeatBumpMapX, repeatBumpMapY);
  bumpTexture.rotation = 1;
  bumpTexture.magFilter = THREE.NearestFilter;
});

let origin_material = new THREE.MeshStandardMaterial({
  color: parseInt(color, 16),
  // skinning: true,
  metalness: 0.2,
  roughness: 0.5
});

var blum = {
  path: 'assets/models/Simplified/glTF-Parts/blum.gltf',
  width: 2,
  length: 2,
  height: 2,
  x: -width / 2 - thickSide - 0.1,
  y: -11.5,
  z: -length / 2 + 66,
  material: new THREE.MeshStandardMaterial({
    color: 0xEEEEED,
    skinning: true,
    metalness: 0.2,
    roughness: 0.5
  }),
}

var drawerInfo = {
  bottom: {
    width: width,
    length: length,
    height: thickBottom,
    x: 0,
    y: thickFront / 2,
    z: 0,
    material: origin_material,
    hole: [
      {
        holeType: "luxury",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: thickBottom + 1,
        x: hole1Position,
        y: length / 2 - holeLength / 2,
        z: thickBottom / 2,
      },
      {
        holeType: "eco",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: thickBottom + 1,
        x: hole1Position,
        y: length / 2 - holeLength / 2,
        z: thickBottom / 2,
      },
      {
        holeType: "eco",
        objectType: "draw",
        type: "CylinderGeometry",
        width: 1,
        length: 1,
        radius: 72,
        height: thickBottom + 1,
        x: hole1Position,
        y: length / 2 - holeLength,
        z: thickBottom / 2,
      },
    ],
    hole1: [
      {
        holeType: "luxury",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: thickBottom + 1,
        x: hole2Position,
        y: length / 2 - holeLength / 2,
        z: thickBottom / 2,
      },
      {
        holeType: "eco",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: thickBottom + 1,
        x: hole2Position,
        y: length / 2 - holeLength / 2,
        z: thickBottom / 2,
      },
      {
        holeType: "eco",
        objectType: "draw",
        type: "CylinderGeometry",
        width: 1,
        length: 1,
        radius: 72,
        height: thickBottom + 1,
        x: hole2Position,
        y: length / 2 - holeLength,
        z: thickBottom / 2,
      },
    ]
  },
  front: {
    width: width + 20 + thickSide * 2,
    length: thickFront,
    height: height + 25,
    x: 0,
    y: (height + 25) / 2 - 12 - 5,
    z: -length / 2 - thickFront / 2,
    material: origin_material,
    glassHole: [
      {
        holeType: "hohem",
        type: "BoxGeometry",
        width: width - 120,
        length: thickFront1,
        height: height - 48,
        x: 0,
        y: -length / 2 - thickFront1 / 2,
        z: height / 2 + 48 / 2 - 12,
      },
      {
        holeType: "niedrigem",
        type: "BoxGeometry",
        width: width - 120,
        length: thickFront1,
        height: height - 100,
        x: 0,
        y: -length / 2 - thickFront1 / 2,
        z: height / 2 + 48 / 2 - 12,
      },
      {
        holeType: "querreling",
        type: "BoxGeometry",
        width: width - 120,
        length: thickFront1,
        height: height - 120,
        x: 0,
        y: -length / 2 - thickFront1 / 2,
        z: height / 2 + 100 / 2 - 10 - 12,
      },
      {
        holeType: "corner",
        type: "BoxGeometry",
        width: thickSide + 0.6,
        length: thickFront1-3,
        height: height,
        x: width / 2 + thickSide / 2 - 0.3,
        y: -length / 2 - (thickFront1-3) / 2,
        z: height / 2 - 12,
      },
      {
        holeType: "corner",
        type: "BoxGeometry",
        width: thickSide + 0.6,
        length: thickFront1-3,
        height: height,
        x: -width / 2 - thickSide / 2 + 0.3,
        y: -length / 2 - (thickFront1-3) / 2,
        z: height / 2 - 12,
      }
    ]
  },
  back: {
    width: width,
    length: thickBack,
    height: height - 28,
    x: 0,
    y: (height - 28) / 2 + thickBottom,
    z: length / 2 - thickBack / 2,
    material: origin_material,
    hole: [
      {
        holeType: "luxury",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: height,
        x: hole1Position,
        y: length / 2 - holeLength / 2,
        z: thickBottom / 2 + height / 2,
      },
      {
        holeType: "eco",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: height,
        x: hole1Position,
        y: length / 2 - holeLength / 2,
        z: (thickBottom + height) / 2,
      }
    ],
    hole1: [
      {
        holeType: "luxury",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: height,
        x: hole2Position,
        y: length / 2 - holeLength / 2,
        z: thickBottom / 2 + height / 2,
      },
      {
        holeType: "eco",
        objectType: "draw",
        type: "BoxGeometry",
        width: holeWidth,
        length: holeLength,
        height: height,
        x: hole2Position,
        y: length / 2 - holeLength / 2,
        z: (thickBottom + height) / 2,
      }
    ],
    socketHole: [
      {
        type: "CylinderGeometry",
        width: 1,
        length: 1,
        radius: 20,
        height: thickBack,
        x: width / 2 - 20,
        y: length / 2 - thickBack / 2,
        z: 37.5,
      },
    ]
  },
  left: {
    width: thickSide,
    length: length,
    height: height,
    x: width / 2 + thickSide / 2,
    y: height / 2 - 12,
    z: 0,
    material: origin_material,
    glassHole: [
      {
        holeType: "BOXCOVER",
        type: "BoxGeometry",
        width: thickSide,
        length: length - 110,
        height: height - 91,
        x: width / 2 + thickSide / 2,
        y: -5,
        z: height / 2 + 91 / 2 - 12,
      },
      {
        holeType: "Reling",
        type: "BoxGeometry",
        width: thickSide,
        length: length - thickBack,
        height: height - 91,
        x: width / 2 + thickSide / 2,
        y: -thickBack / 2,
        z: height / 2 + 91 / 2 - 12,
      },
      {
        holeType: "RelingGlass",
        type: "BoxGeometry",
        width: thickSide,
        length: length - thickBack,
        height: height - 108,
        x: width / 2 + thickSide / 2,
        y: -thickBack / 2,
        z: height / 2 + 91 / 2 - 17 / 2 - 12,
      },
    ]
  },
  right: {
    width: thickSide,
    length: length,
    height: height,
    x: -width / 2 - thickSide / 2,
    y: height / 2 - 12,
    z: 0,
    material: origin_material,
    glassHole: [
      {
        holeType: "BOXCOVER",
        type: "BoxGeometry",
        width: thickSide,
        length: length - 110,
        height: height - 91,
        x: -width / 2 - thickSide / 2,
        y: -5,
        z: height / 2 + 91 / 2 - 12,
      },
      {
        holeType: "Reling",
        type: "BoxGeometry",
        width: thickSide,
        length: length - thickBack,
        height: height - 91,
        x: -width / 2 - thickSide / 2,
        y: -thickBack / 2,
        z: height / 2 + 91 / 2 - 12,
      },
      {
        holeType: "RelingGlass",
        type: "BoxGeometry",
        width: thickSide,
        length: length - thickBack,
        height: height - 108,
        x: -width / 2 - thickSide / 2,
        y: -thickBack / 2,
        z: height / 2 + 91 / 2 - 17 / 2 - 12,
      },
    ]
  }
}

// var siphonPlates = [
//   {
//     holeType: "luxury",
//     type: "BoxGeometry",
//     width: holeWidth,
//     length: holeLength,
//     height: height - 12,
//     x: hole1Position,
//     y: length / 2 - holeLength / 2,
//     z: (height - 12) / 2,
//     material: origin_material,
//     hole: [
//       {
//         type: "BoxGeometry",
//         width: holeWidth - thickSide,
//         length: holeLength,
//         height: height - 12,
//         x: 0,
//         y: thickSide / 2,
//         z: 0,
//       },
//     ]
//   },
//   {
//     holeType: "eco",
//     type: "BoxGeometry",
//     width: holeWidth,
//     length: holeLength,
//     height: height - 12,
//     x: hole1Position,
//     y: length / 2 - holeLength / 2,
//     z: (height - 12) / 2,
//     material: origin_material,
//     hole: [
//       {
//         type: "BoxGeometry",
//         width: holeWidth - thickSide,
//         length: holeLength,
//         height: height - 12,
//         x: 0,
//         y: 0,
//         z: 0,
//       },
//     ]
//   },
//   {
//     holeType: "eco",
//     type: "CylinderGeometry",
//     width: 1,
//     length: 1,
//     radius: 72,
//     height: height - 12,
//     x: hole1Position,
//     y: length / 2 - holeLength,
//     z: (height - 12) / 2,
//     material: origin_material,
//     hole: [
//       {
//         type: "BoxGeometry",
//         width: holeWidth,
//         length: 100,
//         height: height - 12,
//         x: 0,
//         y: 50,
//         z: 0,
//       },
//       {
//         type: "CylinderGeometry",
//         width: (width / 2 - thickSide) / (width / 2 - thickSide),
//         length: 1,
//         radius: 72 - thickSide / 2,
//         height: height - 12,
//         x: 0,
//         y: 0,
//         z: 0,
//       }
//     ]
//   },
// ]

var siphonPlates = [
  {
    holeType: "luxury",
    type: "BoxGeometry",
    width: holeWidth,
    length: holeLength,
    height: holeHeight,
    x: hole1Position,
    y: length / 2 - holeLength / 2,
    z: holeHeight / 2,
    material: origin_material,
    hole: [
      {
        type: "BoxGeometry",
        width: holeWidth - thickSide,
        length: holeLength,
        height: holeHeight,
        x: 0,
        y: thickSide / 2,
        z: 0,
      },
    ]
  },
  {
    holeType: "eco",
    type: "BoxGeometry",
    width: holeWidth,
    length: holeLength,
    height: holeHeight,
    x: hole1Position,
    y: length / 2 - holeLength / 2,
    z: holeHeight / 2,
    material: origin_material,
    hole: [
      {
        type: "BoxGeometry",
        width: holeWidth - thickSide,
        length: holeLength,
        height: holeHeight,
        x: 0,
        y: 0,
        z: 0,
      },
    ]
  },
  {
    holeType: "eco",
    type: "CylinderGeometry",
    width: 1,
    length: 1,
    radius: 72,
    height: holeHeight,
    x: hole1Position,
    y: length / 2 - holeLength,
    z: holeHeight / 2,
    material: origin_material,
    hole: [
      {
        type: "BoxGeometry",
        width: holeWidth,
        length: 100,
        height: holeHeight,
        x: 0,
        y: 50,
        z: 0,
      },
      {
        type: "CylinderGeometry",
        width: (width / 2 - thickSide) / (width / 2 - thickSide),
        length: 1,
        radius: 72 - thickSide / 2,
        height: holeHeight,
        x: 0,
        y: 0,
        z: 0,
      }
    ]
  },
]

var siphonPlates1 = [
  {
    holeType: "luxury",
    type: "BoxGeometry",
    width: holeWidth,
    length: holeLength,
    height: holeHeight,
    x: hole2Position,
    y: length / 2 - holeLength / 2,
    z: holeHeight / 2,
    material: origin_material,
    hole: [
      {
        type: "BoxGeometry",
        width: holeWidth - thickSide,
        length: holeLength,
        height: holeHeight,
        x: 0,
        y: thickSide / 2,
        z: 0,
      },
    ]
  },
  {
    holeType: "eco",
    type: "BoxGeometry",
    width: holeWidth,
    length: holeLength,
    height: holeHeight,
    x: hole2Position,
    y: length / 2 - holeLength / 2,
    z: holeHeight / 2,
    material: origin_material,
    hole: [
      {
        type: "BoxGeometry",
        width: holeWidth - thickSide,
        length: holeLength,
        height: holeHeight,
        x: 0,
        y: 0,
        z: 0,
      },
    ]
  },
  {
    holeType: "eco",
    type: "CylinderGeometry",
    width: 1,
    length: 1,
    radius: 72,
    height: holeHeight,
    x: hole2Position,
    y: length / 2 - holeLength,
    z: holeHeight / 2,
    material: origin_material,
    hole: [
      {
        type: "BoxGeometry",
        width: holeWidth,
        length: 100,
        height: holeHeight,
        x: 0,
        y: 50,
        z: 0,
      },
      {
        type: "CylinderGeometry",
        width: (width / 2 - thickSide) / (width / 2 - thickSide),
        length: 1,
        radius: 72 - thickSide / 2,
        height: holeHeight,
        x: 0,
        y: 0,
        z: 0,
      }
    ]
  },
]

var antislipMat = {
  width: width,
  length: length - 1,
  height: 1,
  x: 0,
  y: -1,
  z: thickBottom + 0.5,
  material: new THREE.MeshStandardMaterial({
    map: bumpTexture,
    bumpMap: bumpTexture,
    bumpScale: 1000,
    color: parseInt(color, 16),
  })
}

var dimension = {
  width: {
    width: width + thickSide * 2,
    length: 40,
    x: 0,
    y: length / 2 + 60,
    z: -12
  },
  length: {
    width: 40,
    length: length + thickFront,
    x: width / 2 + thickSide + 60,
    y: -thickFront / 2,
    z: -12,
  }
}

var electronicProducts = {
  sockets: [
    {
      path: 'assets/models/Schubladeneinsatz/Einsatz/Rexi.gltf',
      type: 'Rexi',
      width: 1 / 3,
      length: 1 / 3,
      height: 1 / 3,
      x: 125,
      y: 125 - thickSide / 2,
      z: 8,
      material: new THREE.MeshStandardMaterial({
        color: 0xEEEEED,
        skinning: true
      }),
    }
  ],
  powerSupply: {
    path: 'assets/models/Schubladeneinsatz/Powersupply/powersupply.gltf',
    width: 2 / 3,
    length: 2 / 3,
    height: 2 / 3,
    x: 19,
    y: 125 + 175,
    z: -10,
    material: new THREE.MeshStandardMaterial({
      color: 0xEEEEED,
      skinning: true
    }),
  },
  cable: {
    material: new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 5 }),
    points: [
      {
        x: 2,
        y: 125 + 110,
        z: -6.5,
      },
      {
        x: 12,
        y: 125 + 60,
        z: -6.5,
      },
      {
        x: 125 / 2,
        y: 125 + 50,
        z: 7.25,
      },
      {
        x: 125 - 20,
        y: 125 + 40,
        z: 18.5,
      },
      {
        x: 125 - 10,
        y: 125 - thickSide / 2,
        z: 18.5,
      }
    ]
  }
}

var glassInfo = {
  left: [
    {
      type: "BOXCOVER",
      width: thickSide - 3,
      length: length - 110,
      height: height - 96,
      x: width / 2 + thickSide / 2,
      y: height / 2 + 96 / 2 - 12 - 5,
      z: -5,
      material: new THREE.MeshPhysicalMaterial({
        metalness: .9,
        roughness: .05,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        opacity: 0.1,
        reflectivity: 0.2,
        refractionRatio: 0.985,
        ior: 0.9,
        side: THREE.DoubleSide,
      })
    },
    {
      type: "Reling",
      width: thickSide,
      length: length,
      height: 17,
      x: width / 2 + thickSide / 2,
      y: height - 12 - 17 / 2,
      z: 0,
      material: origin_material
    },
    {
      type: "RelingGlass",
      width: thickSide - 3,
      length: length - thickBack,
      height: height - 108,
      x: width / 2 + thickSide / 2,
      y: height / 2 + 96 / 2 - 17 / 2 - 12,
      z: -thickBack/2,
      material: new THREE.MeshPhysicalMaterial({
        metalness: .9,
        roughness: .05,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        opacity: 0.1,
        reflectivity: 0.2,
        refractionRatio: 0.985,
        ior: 0.9,
        side: THREE.DoubleSide,
      })
    },
  ],
  right: [
    {
      type: "BOXCOVER",
      width: thickSide - 3,
      length: length - 110,
      height: height - 108,
      x: -width / 2 - thickSide / 2,
      y: height / 2 + 96 / 2 - 12 - 5,
      z: -5,
      material: new THREE.MeshPhysicalMaterial({
        metalness: .9,
        roughness: .05,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        opacity: 0.1,
        reflectivity: 0.2,
        refractionRatio: 0.985,
        ior: 0.9,
        side: THREE.DoubleSide,
      })
    },
    {
      type: "Reling",
      width: thickSide,
      length: length,
      height: 17,
      x: -width / 2 - thickSide / 2,
      y: height - 12 - 17 / 2,
      z: 0,
      material: origin_material
    },
    {
      type: "RelingGlass",
      width: thickSide - 3,
      length: length - thickBack,
      height: height - 108,
      x: -width / 2 - thickSide / 2,
      y: height / 2 + 96 / 2 - 17 / 2 - 12,
      z: -thickBack/2,
      material: new THREE.MeshPhysicalMaterial({
        metalness: .9,
        roughness: .05,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        opacity: 0.1,
        reflectivity: 0.2,
        refractionRatio: 0.985,
        ior: 0.9,
        side: THREE.DoubleSide,
      })
    },
  ],
  front: [
    {
      type: "hohem",
      width: width - 120,
      length: thickGlass,
      height: height - 53,
      x: 0,
      y: height / 2 + 53 / 2 - 12 - 5,
      z: -length / 2 - thickFront1 / 2,
      material: new THREE.MeshPhysicalMaterial({
        metalness: .9,
        roughness: .05,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        opacity: 0.1,
        reflectivity: 0.2,
        refractionRatio: 0.985,
        ior: 0.9,
        side: THREE.DoubleSide,
      })
    },
    {
      type: "niedrigem",
      width: width - 120,
      length: thickGlass,
      height: 70,
      x: 0,
      y: (height + 48) / 2 - 12 - 5,
      z: -length / 2 - thickFront1 / 2,
      material: new THREE.MeshPhysicalMaterial({
        metalness: .9,
        roughness: .05,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        opacity: 0.1,
        reflectivity: 0.2,
        refractionRatio: 0.985,
        ior: 0.9,
        side: THREE.DoubleSide,
      })
    }
  ]
}

var zargenInfo = [
  {
    type: "zargen2",
    width: thickSide,
    height: height-28,
    length: length-thickBack,
    x: -width/2,
    y: -length/2,
    z: thickBottom,
    material: origin_material,
  },
  {
    type: "zargen2",
    width: -thickSide,
    height: height-28,
    length: length-thickBack,
    x: width/2,
    y: -length/2,
    z: thickBottom,
    material: origin_material,
  },
  {
    type: "zargen3",
    width: -thickSide,
    height: height,
    length: length,
    x: -width/2 - thickSide,
    y: -length/2,
    z: -12,
    material: origin_material,
  },
  {
    type: "zargen3",
    width: thickSide,
    height: height,
    length: length,
    x: width/2 + thickSide,
    y: -length/2,
    z: -12,
    material: origin_material,
  },
]

var loader = new THREE.GLTFLoader();
loader.setDRACOLoader(new THREE.DRACOLoader());

function init() {
  widthSlider.value = width;
  lengthSlider.value = length;
  holeHeightSlider.value = holeHeight;
  holeLengthSlider.value = holeLength;
  holeWidthSlider.value = holeWidth;
  holePositionSlider.value = hole1Position;
  widthInput.value = width;
  lengthInput.value = length;
  holeHeightInput.value = holeHeight;
  holeWidthInput.value = holeWidth;
  holeLengthInput.value = holeLength;
  holePositionInput.value = hole1Position;
  holeStateInput.checked = holeState;
  matStateInput.checked = matState;
  socketStateInput.checked = socketState;

  gui = new dat.GUI();
  const canvas = document.querySelector('#configurator');
  const backgroundColor = 0xe6e6e6;
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor);
  
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize( 600, 600 );
  renderer.shadowMap.enabled = true;
  // renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    30,
    1,
    1,
    100000
  );
  camera.position.z = 1500;
  camera.position.x = 1500;
  camera.position.y = 1500;

  gui.add(camera.position, 'z', 1, 1, 1).name('camera-z');

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.keys = { LEFT: 0, RIGHT: 0, UP: 0, BOTTOM: 0 };
  controls.update();

  siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
  antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
  dimensionLoader(dimension, dimensionGroup, dimensionPanelGroup, width, length);
  electronicProductsLoader(electronicProducts, loader, socketGroup, powerSupplyGroup, cableGroup, socketState, socketType, scene);
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
  blumLoader(blum, loader, blumGroup, scene);
  glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, heightType, frontType, height, scene);
  zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);

  scene.add(drawerGroup);
  scene.add(group);
  scene.add(siphon1EcoGroup);
  scene.add(siphon2EcoGroup);
  scene.add(siphon1LuxuryGroup);
  scene.add(siphon2LuxuryGroup);
  scene.add(matGroup);
  scene.add(dimensionGroup);
  scene.add(dimensionPanelGroup);
  scene.add(socketGroup);
  scene.add(powerSupplyGroup);
  scene.add(cableGroup);
  scene.add(blumGroup);
  scene.add(glassBOXCOVERGroup);
  scene.add(glassBOXCAPGroup);
  scene.add(glassRelingGroup);
  scene.add(glassHohemGroup);
  scene.add(glassNiedrigemGroup);
  scene.add(zargenGroup);
  scene.add(glassRelingGlassGroup);

  let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  let d = 8.25;
  let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
  dirLight.position.set(-8, 12, -4);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 1500;
  dirLight.shadow.camera.left = d * -1;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = d * -1;
  scene.add(dirLight);

  let amLight = new THREE.AmbientLight( 0x404040 );
  scene.add(amLight);
}

function update() {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

widthSlider.addEventListener("change", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    width = parseFloat(e.target.value);

    if (frontType === "einfacher") {
      drawerInfo["front"].width = width + 20 + thickSide * 2 ;
    } else {
      drawerInfo["front"].width = width + thickSide * 2;
      drawerInfo["front"].glassHole[0].width = width - 120;
      drawerInfo["front"].glassHole[1].width = width - 120;
      drawerInfo["front"].glassHole[2].width = width - 120;
    }
    drawerInfo["back"].width = width;
    drawerInfo["bottom"].width = width;
    drawerInfo["left"].x = width / 2 + thickSide / 2;
    drawerInfo["right"].x = -width / 2 - thickSide / 2;

    drawerInfo["back"].socketHole[0].x = width / 2 - 20;

    drawerInfo["left"].glassHole[0].x = width / 2 + thickSide / 2;
    drawerInfo["right"].glassHole[0].x = -width / 2 - thickSide / 2;
    drawerInfo["left"].glassHole[1].x = width / 2 + thickSide / 2;
    drawerInfo["left"].glassHole[2].x = width / 2 + thickSide / 2;
    drawerInfo["right"].glassHole[1].x = -width / 2 - thickSide / 2;
    drawerInfo["right"].glassHole[2].x = -width / 2 - thickSide / 2;
    drawerInfo["front"].glassHole[3].x = width / 2 + thickSide / 2 - 0.3;
    drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide / 2 + 0.3;
    
    glassInfo["left"][0].x = width / 2 + thickSide / 2;
    glassInfo["right"][0].x = -width / 2 - thickSide / 2;
    glassInfo["left"][1].x = width / 2 + thickSide / 2;
    glassInfo["left"][2].x = width / 2 + thickSide / 2;
    glassInfo["right"][1].x = -width / 2 - thickSide / 2;
    glassInfo["right"][2].x = -width / 2 - thickSide / 2;
    glassInfo["front"][0].width = width - 120;
    glassInfo["front"][1].width = width - 120;

    if (sideType === "zargen3") {
      dimension["width"].width = width + thickSide * 4;
    } else {
      dimension["width"].width = width + thickSide * 2;
    }
    dimension['length'].x = width / 2 + thickSide + 60;

    zargenInfo[0].x = -width/2;
    zargenInfo[1].x = width/2;
    zargenInfo[2].x = -width/2 - thickSide;
    zargenInfo[3].x = width/2 + thickSide;

    antislipMat.width = width;
    repeatBumpMapX = initialRepeatBumpMap * width / initialWidth;
    bumpTexture.repeat.set(repeatBumpMapX, repeatBumpMapY);

    electronicProducts.sockets[0].x = width / 4;
    electronicProducts.cable.points[2].x = width / 8;
    electronicProducts.cable.points[3].x = width / 4 - 20;
    electronicProducts.cable.points[4].x = width / 4 - 10;

    blum.x = -width / 2 - thickSide - 0.1;

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    dimensionLoader(dimension, dimensionGroup, dimensionPanelGroup, sideType === "zargen3" ? width + thickSide * 2 : width, length);
    electronicProductsLoader(electronicProducts, loader, socketGroup, powerSupplyGroup, cableGroup, socketState, socketType, scene)
    blumLoader(blum, loader, blumGroup, scene);
    glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, heightType, frontType, height, scene);
    zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);
    widthInput.value = width;
  }
});

widthInput.addEventListener("input", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    width = parseFloat(e.target.value);

    if (frontType === "einfacher") {
      drawerInfo["front"].width = width + 20 + thickSide * 2;
    } else {
      drawerInfo["front"].width = width + thickSide * 2;
      drawerInfo["front"].glassHole[0].width = width - 120;
      drawerInfo["front"].glassHole[1].width = width - 120;
      drawerInfo["front"].glassHole[2].width = width - 120;
    }
    drawerInfo["back"].width = width;
    drawerInfo["bottom"].width = width;
    drawerInfo["left"].x = width / 2 + thickSide / 2;
    drawerInfo["right"].x = -width / 2 - thickSide / 2;

    drawerInfo["back"].socketHole[0].x = width / 2 - 20;

    drawerInfo["left"].glassHole[0].x = width / 2 + thickSide / 2;
    drawerInfo["right"].glassHole[0].x = -width / 2 - thickSide / 2;
    drawerInfo["left"].glassHole[1].x = width / 2 + thickSide / 2;
    drawerInfo["left"].glassHole[2].x = width / 2 + thickSide / 2;
    drawerInfo["right"].glassHole[1].x = -width / 2 - thickSide / 2;
    drawerInfo["right"].glassHole[2].x = -width / 2 - thickSide / 2;
    drawerInfo["front"].glassHole[3].x = width / 2 + thickSide / 2 - 0.3;
    drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide / 2 + 0.3;

    glassInfo["left"][0].x = width / 2 + thickSide / 2;
    glassInfo["right"][0].x = -width / 2 - thickSide / 2;
    glassInfo["left"][1].x = width / 2 + thickSide / 2;
    glassInfo["left"][2].x = width / 2 + thickSide / 2;
    glassInfo["right"][1].x = -width / 2 - thickSide / 2;
    glassInfo["right"][2].x = -width / 2 - thickSide / 2;
    glassInfo["front"][0].width = width - 120;
    glassInfo["front"][1].width = width - 120;

    dimension['width'].width = width + thickSide * 2;
    dimension['length'].x = width / 2 + thickSide + 60;

    zargenInfo[0].x = -width/2;
    zargenInfo[1].x = width/2;
    zargenInfo[2].x = -width/2 - thickSide;
    zargenInfo[3].x = width/2 + thickSide;

    antislipMat.width = width;
    repeatBumpMapX = initialRepeatBumpMap * width / initialWidth;
    bumpTexture.repeat.set(repeatBumpMapX, repeatBumpMapY);

    electronicProducts.sockets[0].x = width / 4;
    electronicProducts.cable.points[2].x = width / 8;
    electronicProducts.cable.points[3].x = width / 4 - 20;
    electronicProducts.cable.points[4].x = width / 4 - 10;

    blum.x = -width / 2 - thickSide - 0.1;

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    dimensionLoader(dimension, dimensionGroup, dimensionPanelGroup, width, length);
    electronicProductsLoader(electronicProducts, loader, socketGroup, powerSupplyGroup, cableGroup, socketState, socketType, scene)
    blumLoader(blum, loader, blumGroup, scene);
    glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, heightType, frontType, height, scene);
    zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);
    widthSlider.value = width;
  }
});

lengthSlider.addEventListener("change", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    length = parseFloat(e.target.value);

    if (frontType === "einfacher") {
      drawerInfo["front"].z = -length / 2 - thickFront / 2;
    } else {
      drawerInfo["front"].z = -length / 2 - thickFront1 / 2;
      drawerInfo["front"].glassHole[0].y = -length / 2 - thickFront1 / 2;
      drawerInfo["front"].glassHole[1].y = -length / 2 - thickFront1 / 2;
      drawerInfo["front"].glassHole[2].y = -length / 2 - thickFront1 / 2;
    }
    drawerInfo["left"].length = length;
    drawerInfo["right"].length = length;
    drawerInfo["bottom"].length = length;
    drawerInfo["back"].z = length / 2 - thickBack / 2;

    drawerInfo["back"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["back"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[2].y = length / 2 - holeLength;

    drawerInfo["back"].hole1[0].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole1[0].y = length / 2 - holeLength / 2;
    drawerInfo["back"].hole1[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole1[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole1[2].y = length / 2 - holeLength;

    drawerInfo["back"].socketHole[0].y = length / 2 - thickBack / 2;

    drawerInfo["left"].glassHole[0].length = length - 110;
    drawerInfo["right"].glassHole[0].length = length - 110;
    drawerInfo["left"].glassHole[1].length = length - thickBack;
    drawerInfo["left"].glassHole[2].length = length - thickBack;
    drawerInfo["right"].glassHole[1].length = length - thickBack;
    drawerInfo["right"].glassHole[2].length = length - thickBack;
    drawerInfo["front"].glassHole[3].y = -length / 2 - (thickFront1-3) / 2;
    drawerInfo["front"].glassHole[4].y = -length / 2 - (thickFront1-3) / 2;
    drawerInfo["left"].length = length + (thickFront1-3.5);
    drawerInfo["left"].z = -(thickFront1-3.5)/2;
    drawerInfo["right"].length = length + (thickFront1-3.5);
    drawerInfo["right"].z = -(thickFront1-3.5)/2;

    glassInfo["left"][0].length = length - 110;
    glassInfo["right"][0].length = length - 110;
    glassInfo["left"][1].length = length;
    glassInfo["left"][2].length = length - thickBack;
    glassInfo["right"][1].length = length;
    glassInfo["right"][2].length = length - thickBack;
    glassInfo["front"][0].z = -length / 2 - thickFront1 / 2;
    glassInfo["front"][1].z = -length / 2 - thickFront1 / 2;

    siphonPlates[0].y = length / 2 - holeLength / 2;
    siphonPlates[1].y = length / 2 - holeLength / 2;
    siphonPlates[2].y = length / 2 - holeLength;

    siphonPlates1[0].y = length / 2 - holeLength / 2;
    siphonPlates1[1].y = length / 2 - holeLength / 2;
    siphonPlates1[2].y = length / 2 - holeLength;

    antislipMat.length = length - 1;

    repeatBumpMapY = initialRepeatBumpMap * length / initialLength;
    bumpTexture.repeat.set(repeatBumpMapX, repeatBumpMapY);

    dimension['width'].y = length / 2 + 60;
    dimension['length'].length = length + thickFront;
    electronicProducts.sockets[0].y = length / 4 - thickSide / 2;
    electronicProducts.powerSupply.y = length / 4 + 175;
    electronicProducts.cable.points[0].y = length / 4 + 110;
    electronicProducts.cable.points[1].y = length / 4 + 60;
    electronicProducts.cable.points[2].y = length / 4 + 50;
    electronicProducts.cable.points[3].y = length / 4 + 40;
    electronicProducts.cable.points[4].y = length / 4 - thickSide / 2;

    zargenInfo[0].length = length - thickBack;
    zargenInfo[0].y = -length/2;
    zargenInfo[1].length = length - thickBack;
    zargenInfo[1].y = -length/2;
    
  if (frontType === "einfacher") {
    zargenInfo[2].length = length;
    zargenInfo[2].y = -length/2;
    zargenInfo[3].length = length;
    zargenInfo[3].y = -length/2;
  } else {
    zargenInfo[2].length = length + (thickFront1 - 3.5);
    zargenInfo[2].y = -length/2 - (thickFront1 - 3.5);
    zargenInfo[3].length = length + (thickFront1 - 3.5);
    zargenInfo[3].y = -length/2 - (thickFront1 - 3.5);
  }

    blum.z = -length / 2 + 66;

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    dimensionLoader(dimension, dimensionGroup, dimensionPanelGroup, width, length);
    electronicProductsLoader(electronicProducts, loader, socketGroup, powerSupplyGroup, cableGroup, socketState, socketType, scene)
    blumLoader(blum, loader, blumGroup, scene);
    glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, heightType, frontType, height, scene);
    zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);
    lengthInput.value = length;
  }
});

lengthInput.addEventListener("input", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    length = parseFloat(e.target.value);

    if (frontType === "einfacher") {
      drawerInfo["front"].z = -length / 2 - thickFront / 2;
    } else {
      drawerInfo["front"].z = -length / 2 - thickFront1 / 2;
      drawerInfo["front"].glassHole[0].y = -length / 2 - thickFront1 / 2;
      drawerInfo["front"].glassHole[1].y = -length / 2 - thickFront1 / 2;
      drawerInfo["front"].glassHole[2].y = -length / 2 - thickFront1 / 2;
    }
    drawerInfo["left"].length = length;
    drawerInfo["right"].length = length;
    drawerInfo["bottom"].length = length;
    drawerInfo["back"].z = length / 2 - thickBack / 2;

    drawerInfo["back"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["back"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[2].y = length / 2 - holeLength;

    drawerInfo["back"].hole1[0].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole1[0].y = length / 2 - holeLength / 2;
    drawerInfo["back"].hole1[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole1[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole1[2].y = length / 2 - holeLength;

    drawerInfo["back"].socketHole[0].y = length / 2 - thickBack / 2;

    drawerInfo["left"].glassHole[0].length = length - 110;
    drawerInfo["right"].glassHole[0].length = length - 110;
    drawerInfo["left"].glassHole[1].length = length - thickBack;
    drawerInfo["left"].glassHole[2].length = length - thickBack;
    drawerInfo["right"].glassHole[1].length = length - thickBack;
    drawerInfo["right"].glassHole[2].length = length - thickBack;
    drawerInfo["front"].glassHole[3].y = -length / 2 - (thickFront1-3) / 2;
    drawerInfo["front"].glassHole[4].y = -length / 2 - (thickFront1-3) / 2;
    drawerInfo["left"].length = length + (thickFront1-3.5);
    drawerInfo["left"].z = -(thickFront1-3.5)/2;
    drawerInfo["right"].length = length + (thickFront1-3.5);
    drawerInfo["right"].z = -(thickFront1-3.5)/2;

    glassInfo["left"][0].length = length - 110;
    glassInfo["right"][0].length = length - 110;
    glassInfo["left"][1].length = length;
    glassInfo["left"][2].length = length - thickBack;
    glassInfo["right"][1].length = length;
    glassInfo["right"][2].length = length - thickBack;
    glassInfo["front"][0].z = -length / 2 - thickFront1 / 2;
    glassInfo["front"][1].z = -length / 2 - thickFront1 / 2;

    siphonPlates[0].y = length / 2 - holeLength / 2;
    siphonPlates[1].y = length / 2 - holeLength / 2;
    siphonPlates[2].y = length / 2 - holeLength;

    siphonPlates1[0].y = length / 2 - holeLength / 2;
    siphonPlates1[1].y = length / 2 - holeLength / 2;
    siphonPlates1[2].y = length / 2 - holeLength;

    antislipMat.length = length - 1;

    repeatBumpMapY = initialRepeatBumpMap * length / initialLength;
    bumpTexture.repeat.set(repeatBumpMapX, repeatBumpMapY);

    dimension['width'].y = length / 2 + 60;
    dimension['length'].length = length + thickFront;
    electronicProducts.sockets[0].y = length / 4 - thickSide / 2;
    electronicProducts.powerSupply.y = length / 4 + 175;
    electronicProducts.cable.points[0].y = length / 4 + 110;
    electronicProducts.cable.points[1].y = length / 4 + 60;
    electronicProducts.cable.points[2].y = length / 4 + 50;
    electronicProducts.cable.points[3].y = length / 4 + 40;
    electronicProducts.cable.points[4].y = length / 4 - thickSide / 2;

    zargenInfo[0].length = length - thickBack;
    zargenInfo[0].y = -length/2;
    zargenInfo[1].length = length - thickBack;
    zargenInfo[1].y = -length/2;
    
  if (frontType === "einfacher") {
    zargenInfo[2].length = length;
    zargenInfo[2].y = -length/2;
    zargenInfo[3].length = length;
    zargenInfo[3].y = -length/2;
  } else {
    zargenInfo[2].length = length + (thickFront1 - 3.5);
    zargenInfo[2].y = -length/2 - (thickFront1 - 3.5);
    zargenInfo[3].length = length + (thickFront1 - 3.5);
    zargenInfo[3].y = -length/2 - (thickFront1 - 3.5);
  }

    blum.z = -length / 2 + 66;

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    dimensionLoader(dimension, dimensionGroup, dimensionPanelGroup, width, length);
    electronicProductsLoader(electronicProducts, loader, socketGroup, powerSupplyGroup, cableGroup, socketState, socketType, scene)
    blumLoader(blum, loader, blumGroup, scene);
    glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, heightType, frontType, height, scene);
    zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);
    lengthSlider.value = length;
  }
});

heightSelect.addEventListener("change", (e) => {
  height = parseFloat(e.target.value);
  heightType = e.target.value.split("-")[1] ?? "normal";

  if (height <= 129) {
    frontTypeSelect.innerHTML = `<option value="geschlossenem">Mit geschlossenem Vorderstück</option>
    <option value="einfacher">Mit einfacher Front</option>`
    frontTypeSelect.value = frontType;
    // frontType = "geschlossenem";

    zargenInfo[0].height = height-28;
    zargenInfo[1].height = height-28;
    zargenInfo[2].height = height;
    zargenInfo[3].height = height;
  } else {
    frontTypeSelect.innerHTML = `<option value="hohem">Mit hohem Einschubelement</option>
    <option value="niedrigem">Mit niedrigem Einschubelement</option>
    <option value="querreling">Mit Querreling</option>`
    
    zargenInfo[0].height = height - 129;
    zargenInfo[1].height = height - 129;
    zargenInfo[2].height = height - 101;
    zargenInfo[3].height = height - 101;

    if (frontType === 'niedrigem' || frontType === 'querreling' || frontType === "hohem") {
      frontTypeSelect.value = frontType;
    } else {
      frontTypeSelect.value = "hohem";
      frontType = "hohem";
    }
  }

  if (frontType === "einfacher") {
    drawerInfo["front"].width = width + 20 + thickSide * 2 ;
    drawerInfo["front"].length = thickFront;
    drawerInfo["front"].height = height + 25;
    drawerInfo["front"].x = 0;
    drawerInfo["front"].y = (height + 25) / 2 - 12 - 5;
    drawerInfo["front"].z = -length / 2 - thickFront / 2;
    
    zargenInfo[2].length = length;
    zargenInfo[2].y = -length/2;
    zargenInfo[3].length = length;
    zargenInfo[3].y = -length/2;
  } else {
    if (sideType === "zargen3") {
      drawerInfo["front"].width = width + thickSide * 4;
      drawerInfo["front"].glassHole[3].width = thickSide * 2 + 0.6;
      drawerInfo["front"].glassHole[3].x = width / 2 + thickSide - 0.3
      drawerInfo["front"].glassHole[4].width = thickSide * 2 + 0.6;
      drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide + 0.3
    } else {
      drawerInfo["front"].width = width + thickSide * 2;
      drawerInfo["front"].glassHole[3].width = thickSide + 0.6;
      drawerInfo["front"].glassHole[3].x = width / 2 + thickSide / 2 - 0.3;
      drawerInfo["front"].glassHole[4].width = thickSide + 0.6;
      drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide / 2 + 0.3;
    }
    drawerInfo["front"].length = thickFront1;
    drawerInfo["front"].height = height;
    drawerInfo["front"].x = 0;
    drawerInfo["front"].y = height / 2 - 12;
    drawerInfo["front"].z = -length / 2 - thickFront1 / 2;
    drawerInfo["front"].glassHole[0].height = height - 48;
    drawerInfo["front"].glassHole[0].z = height / 2 + 48 / 2 - 12;
    drawerInfo["front"].glassHole[1].height = height - 48;
    drawerInfo["front"].glassHole[1].z = height / 2 + 48 / 2 - 12;
    drawerInfo["front"].glassHole[2].height = (height - 120) < 0 ? 0 : height - 120;
    drawerInfo["front"].glassHole[2].z = (height - 120) > 0 ? height / 2 + 100 / 2 - 10 - 12 : 100;
    
    zargenInfo[2].length = length + (thickFront1 - 3.5);
    zargenInfo[2].y = -length/2 - (thickFront1 - 3.5);
    zargenInfo[3].length = length + (thickFront1 - 3.5);
    zargenInfo[3].y = -length/2 - (thickFront1 - 3.5);
  }

  drawerInfo["back"].height = height - 28;
  drawerInfo["left"].height = height;
  drawerInfo["right"].height = height;
  drawerInfo["back"].y = (height - 28) / 2 + thickBottom;
  drawerInfo["left"].y = height / 2 - 12;
  drawerInfo["right"].y = height / 2 - 12;
  drawerInfo["left"].length = length + (thickFront1-3.5);
  drawerInfo["left"].z = -(thickFront1-3.5)/2;
  drawerInfo["right"].length = length + (thickFront1-3.5);
  drawerInfo["right"].z = -(thickFront1-3.5)/2;
  
  drawerInfo["back"].hole[0].height = height;
  drawerInfo["back"].hole[0].z = thickBottom / 2 + height / 2;
  drawerInfo["back"].hole[1].height = height;
  drawerInfo["back"].hole[1].z = thickBottom / 2 + height / 2;

  drawerInfo["back"].hole1[0].height = height;
  drawerInfo["back"].hole1[0].z = thickBottom / 2 + height / 2;
  drawerInfo["back"].hole1[1].height = height;
  drawerInfo["back"].hole1[1].z = thickBottom / 2 + height / 2;

  drawerInfo["left"].glassHole[0].height = height - 91;
  drawerInfo["left"].glassHole[0].z = height / 2 + 91 / 2 - 12;
  drawerInfo["right"].glassHole[0].height = height - 91;
  drawerInfo["right"].glassHole[0].z = height / 2 + 91 / 2 - 12;
  drawerInfo["left"].glassHole[1].height = height - 91;
  drawerInfo["left"].glassHole[2].height = height - 108;
  drawerInfo["left"].glassHole[1].z = height / 2 + 91 / 2 - 12;
  drawerInfo["left"].glassHole[2].z = height / 2 + 91 / 2 - 17 / 2 - 12;
  drawerInfo["right"].glassHole[1].height = height - 91;
  drawerInfo["right"].glassHole[2].height = height - 108;
  drawerInfo["right"].glassHole[1].z = height / 2 + 91 / 2 - 12;
  drawerInfo["right"].glassHole[2].z = height / 2 + 91 / 2 - 17 / 2 - 12;
  drawerInfo["front"].glassHole[3].height = height;
  drawerInfo["front"].glassHole[4].height = height;
  drawerInfo["front"].glassHole[3].z = height / 2 - 12;
  drawerInfo["front"].glassHole[4].z = height / 2 - 12;

  glassInfo["left"][0].height = height - 96;
  glassInfo["left"][0].y = height / 2 + 96 / 2 - 12 - 5;
  glassInfo["right"][0].height = height - 96;
  glassInfo["right"][0].y = height / 2 + 96 / 2 - 12 - 5;

  glassInfo["left"][1].y = height - 12 - 17 / 2;
  glassInfo["right"][1].y = height - 12 - 17 / 2;
  glassInfo["left"][2].height = height - 108;
  glassInfo["left"][2].y = height / 2 + 96 / 2 - 17 / 2 - 12;
  glassInfo["right"][2].height = height - 108;
  glassInfo["right"][2].y = height / 2 + 96 / 2 - 17 / 2 - 12;

  glassInfo["front"][0].height = height - 53;
  glassInfo["front"][0].y = height / 2 + 53 / 2 - 12 - 5;

  // siphonPlates[0].height = height - 12;
  // siphonPlates[0].hole[0].height = height - 12;
  // siphonPlates[0].z = (height - 12) / 2;
  // siphonPlates[1].height = height - 12;
  // siphonPlates[1].hole[0].height = height - 12;
  // siphonPlates[1].z = (height - 12) / 2;
  // siphonPlates[2].height = height - 12;
  // siphonPlates[2].hole[0].height = height - 12;
  // siphonPlates[2].hole[1].height = height - 12;
  // siphonPlates[2].z = (height - 12) / 2;

  // siphonPlates1[0].height = height - 12;
  // siphonPlates1[0].hole[0].height = height - 12;
  // siphonPlates1[0].z = (height - 12) / 2;
  // siphonPlates1[1].height = height - 12;
  // siphonPlates1[1].hole[0].height = height - 12;
  // siphonPlates1[1].z = (height - 12) / 2;
  // siphonPlates1[2].height = height - 12;
  // siphonPlates1[2].hole[0].height = height - 12;
  // siphonPlates1[2].hole[1].height = height - 12;
  // siphonPlates1[2].z = (height - 12) / 2;
  
  for (var i = glassBOXCOVERGroup.children.length - 1; i >= 0; i--) {
    glassBOXCOVERGroup.remove(glassBOXCOVERGroup.children[i]);
  }

  for (var i = glassBOXCAPGroup.children.length - 1; i >= 0; i--) {
    glassBOXCAPGroup.remove(glassBOXCAPGroup.children[i]);
  }

  for (var i = glassRelingGroup.children.length - 1; i >= 0; i--) {
    glassRelingGroup.remove(glassRelingGroup.children[i]);
  }

  for (var i = glassRelingGlassGroup.children.length - 1; i >= 0; i--) {
    glassRelingGlassGroup.remove(glassRelingGlassGroup.children[i]);
  }

  for (var i = glassNiedrigemGroup.children.length - 1; i >= 0; i--) {
    glassNiedrigemGroup.remove(glassNiedrigemGroup.children[i]);
  }
  for (var i = glassHohemGroup.children.length - 1; i >= 0; i--) {
    glassHohemGroup.remove(glassHohemGroup.children[i]);
  }
  
  zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
  siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
  glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, heightType, frontType, height, scene);
  console.log('zargenGroup: ', zargenGroup);
});

frontTypeSelect.addEventListener("change", (e) => {
  frontType = e.target.value;

  if (frontType === 'niedrigem' || frontType === 'querreling' || frontType === "hohem") {
    heightSelect.innerHTML = `<option value="192-BOXCAP">E(192mm)-Modular mit BOXCAP</option>
    <option value="192-BOXCOVER">E(192mm)-Modular mit BOXCOVER</option>
    <option value="192-Reling">E(192mm)-Modular mit Reling</option>
    <option value="192-RelingGlass">E(192mm)-Modular mit Reling und Glass</option>`
    if (heightType === 'BOXCAP') {
      heightSelect.value = '192-BOXCAP';
    } else if (heightType === 'BOXCOVER') {
      heightSelect.value = '192-BOXCOVER';
    } else if (heightType === 'Reling') {
      heightSelect.value = '192-Reling';
    } else if (heightType === 'RelingGlass') {
      heightSelect.value = '192-RelingGlass';
    } else {
      heightSelect.value = '192-BOXCAP';
      heightType = 'BOXCAP';
    }
    height = 192;
  }
  if (frontType === "geschlossenem") {
    heightSelect.innerHTML = `<option value="86.5">N (86.5mm)</option>
    <option value="91">M(91mm)</option>
    <option value="129">K(129mm)</option>`
    if (heightType === 'normal' && height === 86.5) {
      heightSelect.value = '86.5';
      height = 86.5;
    } else if (heightType === 'normal' && height === 91) {
      heightSelect.value = '91';
      height = 91;
    } else if (heightType === 'normal' && height === 129) {
      heightSelect.value = '129';
      height = 129;
    } else {
      heightSelect.value = '129';
      height = 129;
    }
  }

  if (frontType === "einfacher" || (frontType === "niedrigem" && height < 125)) {
    drawerInfo["front"].width = width + 20 + thickSide * 2 ;
    drawerInfo["front"].length = thickFront;
    drawerInfo["front"].height = height + 25;
    drawerInfo["front"].x = 0;
    drawerInfo["front"].y = (height + 25) / 2 - 12 - 5;
    drawerInfo["front"].z = -length / 2 - thickFront / 2;
    drawerInfo["left"].length = length;
    drawerInfo["left"].z = 0;
    drawerInfo["right"].length = length;
    drawerInfo["right"].z = 0;
  } else {
    if (sideType === "zargen3") {
      drawerInfo["front"].width = width + thickSide * 4;
      drawerInfo["front"].glassHole[3].width = thickSide * 2 + 0.6;
      drawerInfo["front"].glassHole[3].x = width / 2 + thickSide - 0.3
      drawerInfo["front"].glassHole[4].width = thickSide * 2 + 0.6;
      drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide + 0.3
    } else {
      drawerInfo["front"].width = width + thickSide * 2;
      drawerInfo["front"].glassHole[3].width = thickSide + 0.6;
      drawerInfo["front"].glassHole[3].x = width / 2 + thickSide / 2 - 0.3;
      drawerInfo["front"].glassHole[4].width = thickSide + 0.6;
      drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide / 2 + 0.3;
    }
    drawerInfo["front"].length = thickFront1;
    drawerInfo["front"].height = height;
    drawerInfo["front"].x = 0;
    drawerInfo["front"].y = height / 2 - 12;
    drawerInfo["front"].z = -length / 2 - thickFront1 / 2;
    drawerInfo["left"].length = length + (thickFront1-3.5);
    drawerInfo["left"].z = -(thickFront1-3.5)/2;
    drawerInfo["right"].length = length + (thickFront1-3.5);
    drawerInfo["right"].z = -(thickFront1-3.5)/2;

    drawerInfo["front"].glassHole[0].width = width - 120;
    drawerInfo["front"].glassHole[0].length = thickFront1;
    drawerInfo["front"].glassHole[0].height = height - 48;
    drawerInfo["front"].glassHole[0].x = 0;
    drawerInfo["front"].glassHole[0].y = -length / 2 - thickFront1 / 2;
    drawerInfo["front"].glassHole[0].z = height / 2 + 48 / 2 - 12;
    drawerInfo["front"].glassHole[1].width = width - 120;
    drawerInfo["front"].glassHole[1].length = thickFront1;
    drawerInfo["front"].glassHole[1].height = height - 48;
    drawerInfo["front"].glassHole[1].x = 0;
    drawerInfo["front"].glassHole[1].y = -length / 2 - thickFront1 / 2;
    drawerInfo["front"].glassHole[1].z = height / 2 + 48 / 2 - 12;
    drawerInfo["front"].glassHole[2].width = width - 120;
    drawerInfo["front"].glassHole[2].length = thickFront1;
    drawerInfo["front"].glassHole[2].height = (height - 120) < 0 ? 0 : height - 120;;
    drawerInfo["front"].glassHole[2].x = 0;
    drawerInfo["front"].glassHole[2].y = -length / 2 - thickFront1 / 2;
    drawerInfo["front"].glassHole[2].z = (height - 120) > 0 ? height / 2 + 100 / 2 - 10 - 12 : 100;
  }

  if (frontType === "einfacher") {
    zargenInfo[2].length = length;
    zargenInfo[2].y = -length/2;
    zargenInfo[3].length = length;
    zargenInfo[3].y = -length/2;
  } else {
    zargenInfo[2].length = length + (thickFront1 - 3.5);
    zargenInfo[2].y = -length/2 - (thickFront1 - 3.5);
    zargenInfo[3].length = length + (thickFront1 - 3.5);
    zargenInfo[3].y = -length/2 - (thickFront1 - 3.5);
  }

  drawerInfo["back"].height = height - 28;
  drawerInfo["left"].height = height;
  drawerInfo["right"].height = height;
  drawerInfo["back"].y = (height - 28) / 2 + thickBottom;
  drawerInfo["left"].y = height / 2 - 12;
  drawerInfo["right"].y = height / 2 - 12;

  drawerInfo["back"].hole[0].height = height;
  drawerInfo["back"].hole[0].z = thickBottom / 2 + height / 2;
  drawerInfo["back"].hole[1].height = height;
  drawerInfo["back"].hole[1].z = thickBottom / 2 + height / 2;

  drawerInfo["back"].hole1[0].height = height;
  drawerInfo["back"].hole1[0].z = thickBottom / 2 + height / 2;
  drawerInfo["back"].hole1[1].height = height;
  drawerInfo["back"].hole1[1].z = thickBottom / 2 + height / 2;

  drawerInfo["left"].glassHole[0].height = height - 91;
  drawerInfo["left"].glassHole[0].z = height / 2 + 91 / 2 - 12;
  drawerInfo["right"].glassHole[0].height = height - 91;
  drawerInfo["right"].glassHole[0].z = height / 2 + 91 / 2 - 12;
  drawerInfo["left"].glassHole[1].height = height - 91;
  drawerInfo["left"].glassHole[2].height = height - 108;
  drawerInfo["left"].glassHole[1].z = height / 2 + 91 / 2 - 12;
  drawerInfo["left"].glassHole[2].z = height / 2 + 91 / 2 - 17 / 2 - 12;
  drawerInfo["right"].glassHole[1].height = height - 91;
  drawerInfo["right"].glassHole[2].height = height - 108;
  drawerInfo["right"].glassHole[1].z = height / 2 + 91 / 2 - 12;
  drawerInfo["right"].glassHole[2].z = height / 2 + 91 / 2 - 17 / 2 - 12;

  drawerInfo["front"].glassHole[3].height = height;
  drawerInfo["front"].glassHole[4].height = height;
  drawerInfo["front"].glassHole[3].z = height / 2 - 12;
  drawerInfo["front"].glassHole[4].z = height / 2 - 12;

  glassInfo["left"][0].height = height - 96;
  glassInfo["left"][0].y = height / 2 + 96 / 2 - 12 - 5;
  glassInfo["right"][0].height = height - 96;
  glassInfo["right"][0].y = height / 2 + 96 / 2 - 12 - 5;

  glassInfo["left"][1].y = height - 12 - 17 / 2;
  glassInfo["right"][1].y = height - 12 - 17 / 2;
  glassInfo["left"][2].height = height - 108;
  glassInfo["left"][2].y = height / 2 + 96 / 2 - 17 / 2 - 12;
  glassInfo["right"][2].height = height - 108;
  glassInfo["right"][2].y = height / 2 + 96 / 2 - 17 / 2 - 12;

  glassInfo["front"][0].height = height - 53;
  glassInfo["front"][0].y = height / 2 + 53 / 2 - 12 - 5;

  // siphonPlates[0].height = height - 12;
  // siphonPlates[0].hole[0].height = height - 12;
  // siphonPlates[0].z = (height - 12) / 2;
  // siphonPlates[1].height = height - 12;
  // siphonPlates[1].hole[0].height = height - 12;
  // siphonPlates[1].z = (height - 12) / 2;
  // siphonPlates[2].height = height - 12;
  // siphonPlates[2].hole[0].height = height - 12;
  // siphonPlates[2].hole[1].height = height - 12;
  // siphonPlates[2].z = (height - 12) / 2;

  // siphonPlates1[0].height = height - 12;
  // siphonPlates1[0].hole[0].height = height - 12;
  // siphonPlates1[0].z = (height - 12) / 2;
  // siphonPlates1[1].height = height - 12;
  // siphonPlates1[1].hole[0].height = height - 12;
  // siphonPlates1[1].z = (height - 12) / 2;
  // siphonPlates1[2].height = height - 12;
  // siphonPlates1[2].hole[0].height = height - 12;
  // siphonPlates1[2].hole[1].height = height - 12;
  // siphonPlates1[2].z = (height - 12) / 2;

  for (var i = glassBOXCOVERGroup.children.length - 1; i >= 0; i--) {
    glassBOXCOVERGroup.remove(glassBOXCOVERGroup.children[i]);
  }

  for (var i = glassBOXCAPGroup.children.length - 1; i >= 0; i--) {
    glassBOXCAPGroup.remove(glassBOXCAPGroup.children[i]);
  }

  for (var i = glassRelingGroup.children.length - 1; i >= 0; i--) {
    glassRelingGroup.remove(glassRelingGroup.children[i]);
  }

  for (var i = glassRelingGlassGroup.children.length - 1; i >= 0; i--) {
    glassRelingGlassGroup.remove(glassRelingGlassGroup.children[i]);
  }

  for (var i = glassNiedrigemGroup.children.length - 1; i >= 0; i--) {
    glassNiedrigemGroup.remove(glassNiedrigemGroup.children[i]);
  }
  for (var i = glassHohemGroup.children.length - 1; i >= 0; i--) {
    glassHohemGroup.remove(glassHohemGroup.children[i]);
  }
  siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
  glassLoader(glassInfo, glassBOXCOVERGroup, glassBOXCAPGroup, glassRelingGroup, glassHohemGroup, glassNiedrigemGroup, glassRelingGlassGroup, heightType, frontType, height, scene);
  zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);
});

zargenTypeSelect.addEventListener("change", (e) => {
  sideType = e.target.value;

  if (sideType === "zargen3") {
    dimension["width"].width = width + thickSide * 4;
    drawerInfo["front"].width = width + thickSide * 4;
    drawerInfo["front"].glassHole[3].width = thickSide * 2 + 0.6;
    drawerInfo["front"].glassHole[3].x = width / 2 + thickSide - 0.3
    drawerInfo["front"].glassHole[4].width = thickSide * 2 + 0.6;
    drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide + 0.3
  } else {
    dimension["width"].width = width + thickSide * 2;
    drawerInfo["front"].width = width + thickSide * 2;
    drawerInfo["front"].glassHole[3].width = thickSide + 0.6;
    drawerInfo["front"].glassHole[3].x = width / 2 + thickSide / 2 - 0.3;
    drawerInfo["front"].glassHole[4].width = thickSide + 0.6;
    drawerInfo["front"].glassHole[4].x = -width / 2 - thickSide / 2 + 0.3;
  }

  for (var i = zargenGroup.children.length - 1; i >= 0; i--) {
    zargenGroup.remove(zargenGroup.children[i]);
  }
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
  zargenLoader(zargenInfo, sideType, zargenState, zargenGroup);
  dimensionLoader(dimension, dimensionGroup, dimensionPanelGroup, sideType === "zargen3" ? width + thickSide * 2 : width, length);
});

holeHeightSlider.addEventListener("change", (e) => {
  holeHeight = parseFloat(e.target.value);
  siphonPlates[0].height = holeHeight;
  siphonPlates[0].hole[0].height = holeHeight;
  siphonPlates[0].z = (holeHeight) / 2;
  siphonPlates[1].height = holeHeight;
  siphonPlates[1].hole[0].height = holeHeight;
  siphonPlates[1].z = (holeHeight) / 2;
  siphonPlates[2].height = holeHeight;
  siphonPlates[2].hole[0].height = holeHeight;
  siphonPlates[2].hole[1].height = holeHeight;
  siphonPlates[2].z = (holeHeight) / 2;

  siphonPlates1[0].height = holeHeight;
  siphonPlates1[0].hole[0].height = holeHeight;
  siphonPlates1[0].z = (holeHeight) / 2;
  siphonPlates1[1].height = holeHeight;
  siphonPlates1[1].hole[0].height = holeHeight;
  siphonPlates1[1].z = (holeHeight) / 2;
  siphonPlates1[2].height = holeHeight;
  siphonPlates1[2].hole[0].height = holeHeight;
  siphonPlates1[2].hole[1].height = holeHeight;
  siphonPlates1[2].z = (holeHeight) / 2;

  siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);

  holeHeightInput.value = holeHeight;
});

holeHeightInput.addEventListener("change", (e) => {
  holeHeight = parseFloat(e.target.value);
  siphonPlates[0].height = holeHeight;
  siphonPlates[0].hole[0].height = holeHeight;
  siphonPlates[0].z = (holeHeight) / 2;
  siphonPlates[1].height = holeHeight;
  siphonPlates[1].hole[0].height = holeHeight;
  siphonPlates[1].z = (holeHeight) / 2;
  siphonPlates[2].height = holeHeight;
  siphonPlates[2].hole[0].height = holeHeight;
  siphonPlates[2].hole[1].height = holeHeight;
  siphonPlates[2].z = (holeHeight) / 2;

  siphonPlates1[0].height = holeHeight;
  siphonPlates1[0].hole[0].height = holeHeight;
  siphonPlates1[0].z = (holeHeight) / 2;
  siphonPlates1[1].height = holeHeight;
  siphonPlates1[1].hole[0].height = holeHeight;
  siphonPlates1[1].z = (holeHeight) / 2;
  siphonPlates1[2].height = holeHeight;
  siphonPlates1[2].hole[0].height = holeHeight;
  siphonPlates1[2].hole[1].height = holeHeight;
  siphonPlates1[2].z = (holeHeight) / 2;

  siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);

  holeHeightInput.value = holeHeight;
});

holeWidthSlider.addEventListener("change", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    holeWidth = e.target.value;

    drawerInfo["back"].hole[0].width = holeWidth;
    drawerInfo["bottom"].hole[0].width = holeWidth;
    drawerInfo["back"].hole[1].width = holeWidth;
    drawerInfo["bottom"].hole[1].width = holeWidth;
    drawerInfo["bottom"].hole[2].width = holeWidth / 144;

    siphonPlates[0].width = holeWidth;
    siphonPlates[0].hole[0].width = holeWidth - thickSide;
    siphonPlates[1].width = holeWidth;
    siphonPlates[1].hole[0].width = holeWidth - thickSide;
    siphonPlates[2].width = holeWidth / 144;
    siphonPlates[2].hole[0].width = holeWidth;
    siphonPlates[2].hole[1].width = (siphonPlates[2].width * siphonPlates[2].radius * 2 - thickSide) / (siphonPlates[2].radius * 2 - thickSide);

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    holeWidthInput.value = holeWidth;
  }
});

holeWidthInput.addEventListener("input", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    holeWidth = e.target.value;

    drawerInfo["back"].hole[0].width = holeWidth;
    drawerInfo["bottom"].hole[0].width = holeWidth;
    drawerInfo["back"].hole[1].width = holeWidth;
    drawerInfo["bottom"].hole[1].width = holeWidth;
    drawerInfo["bottom"].hole[2].width = holeWidth / 144;

    siphonPlates[0].width = holeWidth;
    siphonPlates[0].hole[0].width = holeWidth - thickSide;
    siphonPlates[1].width = holeWidth;
    siphonPlates[1].hole[0].width = holeWidth - thickSide;
    siphonPlates[2].width = holeWidth / 144;
    siphonPlates[2].hole[0].width = holeWidth;
    siphonPlates[2].hole[1].width = (siphonPlates[2].width * siphonPlates[2].radius * 2 - thickSide) / (siphonPlates[2].radius * 2 - thickSide);

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    holeWidthInput.value = holeWidth;
  }
});

holeLengthSlider.addEventListener("change", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    holeLength = e.target.value;

    drawerInfo["back"].hole[0].length = holeLength;
    drawerInfo["bottom"].hole[0].length = holeLength;
    drawerInfo["back"].hole[1].length = holeLength;
    drawerInfo["bottom"].hole[1].length = holeLength;
    drawerInfo["back"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["back"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[2].y = length / 2 - holeLength;

    siphonPlates[0].length = holeLength;
    siphonPlates[0].hole[0].length = holeLength;
    siphonPlates[0].y = length / 2 - holeLength / 2;
    siphonPlates[1].length = holeLength;
    siphonPlates[1].hole[0].length = holeLength;
    siphonPlates[1].y = length / 2 - holeLength / 2;
    siphonPlates[2].y = length / 2 - holeLength;

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    holeLengthInput.value = holeLength;
  }
});

holeLengthInput.addEventListener("input", (e) => {
  if (e.target.value.length > 0 && parseFloat(e.target.value) > 0) {
    holeLength = e.target.value;

    drawerInfo["back"].hole[0].length = holeLength;
    drawerInfo["bottom"].hole[0].length = holeLength;
    drawerInfo["back"].hole[1].length = holeLength;
    drawerInfo["bottom"].hole[1].length = holeLength;
    drawerInfo["back"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[0].y = length / 2 - holeLength / 2;
    drawerInfo["back"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[1].y = length / 2 - holeLength / 2;
    drawerInfo["bottom"].hole[2].y = length / 2 - holeLength;

    siphonPlates[0].length = holeLength;
    siphonPlates[0].hole[0].length = holeLength;
    siphonPlates[0].y = length / 2 - holeLength / 2;
    siphonPlates[1].length = holeLength;
    siphonPlates[1].hole[0].length = holeLength;
    siphonPlates[1].y = length / 2 - holeLength / 2;
    siphonPlates[2].y = length / 2 - holeLength;

    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    holeLengthInput.value = holeLength;
  }
});

holePositionSlider.addEventListener("change", (e) => {
  if (e.target.value.length > 0) {
    hole1Position = parseFloat(e.target.value);

    drawerInfo["back"].hole[0].x = hole1Position;
    drawerInfo["back"].hole[1].x = hole1Position;
    drawerInfo["bottom"].hole[0].x = hole1Position;
    drawerInfo["bottom"].hole[1].x = hole1Position;
    drawerInfo["bottom"].hole[2].x = hole1Position;

    for (var i = 0; i < siphonPlates.length; i++) {
      siphonPlates[i].x = hole1Position;
    }
    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    holePositionInput.value = hole1Position;
  }
});

holePositionInput.addEventListener("change", (e) => {
  if (e.target.value.length > 0) {
    hole1Position = parseFloat(e.target.value);

    drawerInfo["back"].hole[0].x = hole1Position;
    drawerInfo["back"].hole[1].x = hole1Position;
    drawerInfo["bottom"].hole[0].x = hole1Position;
    drawerInfo["bottom"].hole[1].x = hole1Position;
    drawerInfo["bottom"].hole[2].x = hole1Position;

    for (var i = 0; i < siphonPlates.length; i++) {
      siphonPlates[i].x = hole1Position;
    }
    drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
    antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
    holePositionInput.value = hole1Position;
  }
});

holeStateInput.addEventListener("click", (e) => {
  holeState = e.target.checked;
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
  antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
  if (holeState) {
    siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
  } else {
    for (var i = siphon1EcoGroup.children.length - 1; i >= 0; i--) {
      siphon1EcoGroup.remove(siphon1EcoGroup.children[i]);
    }
    for (var i = siphon1LuxuryGroup.children.length - 1; i >= 0; i--) {
      siphon1LuxuryGroup.remove(siphon1LuxuryGroup.children[i]);
    }
    for (var i = siphon2EcoGroup.children.length - 1; i >= 0; i--) {
      siphon2EcoGroup.remove(siphon2EcoGroup.children[i]);
    }
    for (var i = siphon2LuxuryGroup.children.length - 1; i >= 0; i--) {
      siphon2LuxuryGroup.remove(siphon2LuxuryGroup.children[i]);
    }
  }
})

socketStateInput.addEventListener("click", (e) => {
  socketState = e.target.checked;
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
  socketGroup.children.map(item => {
    item.visible = socketState;
  })
  powerSupplyGroup.children[0].visible = socketState;
  cableGroup.children[0].visible = socketState;
})

matStateInput.addEventListener("click", (e) => {
  matState = e.target.checked;
  matGroup.children[0].visible = matState;
})

holeTypeSelect.addEventListener("change", (e) => {
  holeType = e.target.value;
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
  antislipMatLoader(drawerInfo["bottom"].hole, antislipMat, holeType, holeState, matState, matGroup);
  for (var i = siphon1LuxuryGroup.children.length - 1; i >= 0; i--) {
    siphon1LuxuryGroup.remove(siphon1LuxuryGroup.children[i]);
  }
  for (var i = siphon1EcoGroup.children.length - 1; i >= 0; i--) {
    siphon1EcoGroup.remove(siphon1EcoGroup.children[i]);
  }
  for (var i = siphon2LuxuryGroup.children.length - 1; i >= 0; i--) {
    siphon2LuxuryGroup.remove(siphon2LuxuryGroup.children[i]);
  }
  for (var i = siphon2EcoGroup.children.length - 1; i >= 0; i--) {
    siphon2EcoGroup.remove(siphon2EcoGroup.children[i]);
  }
  siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
});

holeNumberSelect.addEventListener("change", (e) => {
  holeNumber = e.target.value;
  if (holeNumber === "1") {
    hole1Position = 0;    
  } else {
    hole1Position = -100;
    hole2Position = 100;
  }
  drawerInfo["bottom"].hole[0].x = hole1Position;
  drawerInfo["bottom"].hole[1].x = hole1Position;
  drawerInfo["bottom"].hole[2].x = hole1Position;
  drawerInfo["bottom"].hole1[0].x = hole2Position;
  drawerInfo["bottom"].hole1[1].x = hole2Position;
  drawerInfo["bottom"].hole1[2].x = hole2Position;

  drawerInfo["back"].hole[0].x = hole1Position;
  drawerInfo["back"].hole[1].x = hole1Position;
  drawerInfo["back"].hole1[0].x = hole2Position;
  drawerInfo["back"].hole1[1].x = hole2Position;

  siphonPlates[0].x = hole1Position;
  siphonPlates[1].x = hole1Position;
  siphonPlates[2].x = hole1Position;

  siphonPlates1[0].x = hole2Position;
  siphonPlates1[1].x = hole2Position;
  siphonPlates1[2].x = hole2Position;

  for (var i = siphon1EcoGroup.children.length - 1; i >= 0; i--) {
    siphon1EcoGroup.remove(siphon1EcoGroup.children[i]);
  }
  for (var i = siphon1LuxuryGroup.children.length - 1; i >= 0; i--) {
    siphon1LuxuryGroup.remove(siphon1LuxuryGroup.children[i]);
  }
  for (var i = siphon2EcoGroup.children.length - 1; i >= 0; i--) {
    siphon2EcoGroup.remove(siphon2EcoGroup.children[i]);
  }
  for (var i = siphon2LuxuryGroup.children.length - 1; i >= 0; i--) {
    siphon2LuxuryGroup.remove(siphon2LuxuryGroup.children[i]);
  }

  siphonLoader(siphonPlates, siphonPlates1, holeType, holeState, siphon1EcoGroup, siphon1LuxuryGroup, siphon2EcoGroup, siphon2LuxuryGroup, holeNumber, scene);
  drawerLoader(drawerInfo, drawerGroup, holeState, holeType, socketState, heightType, frontType, height, holeNumber, scene);
});

partSelect.addEventListener("change", (e) => {
  selectedModel = e.target.value;
});

materialSelect.addEventListener("change", (e) => {
  color = e.target.value;
  console.log('color: ', color);
  let default_mtl = new THREE.MeshStandardMaterial({
    color: parseInt(color, 16),
    skinning: true,
    metalness: 0.2,
    roughness: 0.5
  });

  let Seidenweiss_material = new THREE.MeshStandardMaterial({
    color: parseInt(color, 16),
    // skinning: true,
    metalness: 0.4,
    roughness: 0.7
  });
  
  const model_mtl = color === "0xEEEEED" ? Seidenweiss_material : default_mtl;
  console.log('model_mtl: ', model_mtl);

  let mat_mtl = new THREE.MeshStandardMaterial({
    map: bumpTexture,
    bumpMap: bumpTexture,
    bumpScale: 1000,
    color: parseInt(color, 16),
  });

  let line_mtl = new THREE.LineBasicMaterial({ color: parseInt(color, 16), linewidth: 5 });

  switch (selectedModel) {
    case "bottom": drawerGroup.children[0].material = model_mtl; drawerInfo[selectedModel].material = model_mtl; break;
    case "front": drawerGroup.children[1].material = model_mtl; drawerInfo[selectedModel].material = model_mtl; break;
    case "back": drawerGroup.children[2].material = model_mtl; drawerInfo[selectedModel].material = model_mtl; break;
    case "left":
      drawerGroup.children[3].material = model_mtl;
      drawerInfo["left"].material = model_mtl;
      glassInfo["left"][1].material = model_mtl;
      if(glassRelingGroup.children.length > 0) {
        glassRelingGroup.children[0].material = model_mtl;
      }
      zargenInfo[1].material = model_mtl;
      zargenInfo[3].material = model_mtl;
      zargenGroup.children[1].material = model_mtl;
      break;
    case "right":
      drawerGroup.children[4].material = model_mtl;
      drawerInfo["right"].material = model_mtl;
      glassInfo["right"][1].material = model_mtl;
      if(glassRelingGroup.children.length > 0) {
        glassRelingGroup.children[1].material = model_mtl;
      }
      console.log('model_mtl: ', model_mtl);
      zargenInfo[0].material = model_mtl;
      zargenInfo[2].material = model_mtl;
      zargenGroup.children[0].material = model_mtl;
      break;
    case "blum":
      blumGroup.children[0].traverse(o => {
        if (o.isMesh) {
          o.material = model_mtl;
        }
      });
      blum.material = model_mtl;
      break;
    case "siphon_plate":
      for (var i = siphon1EcoGroup.children.length - 1; i >= 0; i--) {
        siphon1EcoGroup.children[i].material = model_mtl;
      }
      for (var i = siphon1LuxuryGroup.children.length - 1; i >= 0; i--) {
        siphon1LuxuryGroup.children[i].material = model_mtl;
      }
      for (var i = 0; i < siphonPlates.length; i++) {
        siphonPlates[i].material = model_mtl;
      };
      break;
    case "mat": matGroup.children[0].material = mat_mtl; antislipMat.material = mat_mtl; break;
    case "socket":
      socketGroup.children[0].traverse(o => {
        if (o.isMesh) {
          o.material = model_mtl;
        }
      });
      for (var i = 0; i < electronicProducts.sockets.length - 1; i++) {
        electronicProducts.sockets[i].material = model_mtl;
      }
      break;
    case "powerSupply":
      powerSupplyGroup.children[0].traverse(o => {
        if (o.isMesh) {
          o.material = model_mtl;
        }
      });
      electronicProducts.powerSupply.material = model_mtl;
      break;
    default: break;
  }
})
window.addEventListener('scroll', function() {
  console.log('scroll');;
});
init();
update();
