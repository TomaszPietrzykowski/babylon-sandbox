import React from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import BabylonScene from "../../components/game/BabylonScene"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.



let box;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 1, -5), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  camera.speed = 0.25

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("hemiLight1", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 1;

  // // Our built-in 'box' shape.
  // box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

  // // Move the box upward 1/2 its height
  // box.position.y = 1;

  // Our built-in 'ground' shape.
  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

  // sphere
  const ball = MeshBuilder.CreateSphere("ball", {diameter: 1}, scene)
  ball.position = new Vector3(0,1,0)

  // custom material creators
  const CreateGroundMaterial = () => {
    //uv scale
    const uvScale = 4
    // array of textures
    const texturesArray = []

    // create material
    const mat = new StandardMaterial("ground-material", scene)

    // 1. apply diffuse texture
    const diffuseTexture = new Texture("/images/textures/stone/cobblestone_diffuse.jpeg", scene)

    mat.diffuseTexture = diffuseTexture
    texturesArray.push(diffuseTexture)

    // 2. apply normal texture
    const normalTexture = new Texture("/images/textures/stone/cobblestone_normal.jpeg", scene)

    mat.bumpTexture = normalTexture
    texturesArray.push(normalTexture)

    // 3. apply ambient texture
    const aoTexture = new Texture("/images/textures/stone/cobblestone_ao.jpeg", scene)

    mat.ambientTexture = aoTexture
    texturesArray.push(aoTexture)

    // 4. apply specular texture
    const specTexture = new Texture("/images/textures/stone/cobblestone_spec.jpeg", scene)

    mat.specularTexture = specTexture
    texturesArray.push(specTexture)

    texturesArray.forEach((tex) => {
      tex.uScale = uvScale
      tex.vScale = uvScale
    })

    return mat
  }

  ground.material = CreateGroundMaterial()
  // ball.material = CreateBallMaterial()
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default () => (
  <div>
    <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
  </div>
);
