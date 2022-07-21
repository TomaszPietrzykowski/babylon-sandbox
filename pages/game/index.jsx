import React from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import BabylonScene from "../../components/game/BabylonScene"; 

let ball

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 1, -5), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  camera.speed = 0.15

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("hemiLight1", new Vector3(0, 1, 0), scene);

  light.intensity = 1;

  // Ground
  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

  // Sphere
  ball = MeshBuilder.CreateSphere("ball", {diameter: 1}, scene)
  ball.position = new Vector3(0,1,0)

  // custom material creators -----------------------------------------------------------------

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
    mat.invertNormalMapX = true
    mat.invertNormalMapY = true
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

  const CreateBallMaterial = () => {
    //uv scale
    const uvScale = 2
    // array of textures
    const texturesArray = []

    // create material
    const mat = new StandardMaterial("ball-material", scene)

    // 1. apply diffuse texture
    const diffuseTexture = new Texture("/images/textures/metal/metal_diffuse.jpeg", scene)

    mat.diffuseTexture = diffuseTexture
    texturesArray.push(diffuseTexture)

    // 2. apply normal texture
    const normalTexture = new Texture("/images/textures/metal/metal_normal.jpeg", scene)

    mat.bumpTexture = normalTexture
    mat.invertNormalMapX = true
    mat.invertNormalMapY = true
    texturesArray.push(normalTexture)

    // 3. apply ambient texture
    const aoTexture = new Texture("/images/textures/metal/metal_ao.jpeg", scene)

    mat.ambientTexture = aoTexture
    texturesArray.push(aoTexture)

    // 4. apply specular texture
    const specTexture = new Texture("/images/textures/metal/metal_spec.jpeg", scene)

    mat.specularTexture = specTexture
    mat.specularPower = 10
    texturesArray.push(specTexture)

    texturesArray.forEach((tex) => {
      tex.uScale = uvScale
      tex.vScale = uvScale
    })

    return mat
  }

  ground.material = CreateGroundMaterial()
  ball.material = CreateBallMaterial()
};

/*
 *   Animation
 *   will run on every frame render.  We are spinning the sphere on y-axis.
 */
const onRender = (scene) => {
  // if (ball !== undefined) {
  //   var deltaTimeInMillis = scene.getEngine().getDeltaTime();

  //   const rpm = 4;
  //   ball.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }
};

export default () => (
  <div>
    <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
  </div>
);
