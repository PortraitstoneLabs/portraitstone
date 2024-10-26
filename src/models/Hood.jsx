/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "../assets/3d/Hood.glb";

export function Hood({ currentAnimation, ...props }) {
  const group = useRef();
  const { nodes, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);

  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
    <group name="Scene">
      <group
        name="Root"
        position={[0, 64.074, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={28.85}
      >
        <skinnedMesh
          name="Z_Function001"
          geometry={nodes.Z_Function001.geometry}
          material={nodes.Z_Function001.material}
          skeleton={nodes.Z_Function001.skeleton}
        />
        <primitive object={nodes.LegAL001} />
        <primitive object={nodes.IKPoleL001} />
        <primitive object={nodes.IKTargetL001} />
        <primitive object={nodes.IKPoleL002} />
        <primitive object={nodes.IKTargetL002} />
        <primitive object={nodes.IKPoleR001} />
        <primitive object={nodes.IKTargetR001} />
        <primitive object={nodes.IKPoleR002} />
        <primitive object={nodes.IKTargetR002} />
      </group>
    </group>
  </group>
);
}

useGLTF.preload(scene);