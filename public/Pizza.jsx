import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/pizza.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.063, 0.278]} rotation={[-Math.PI, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.Pizza_Pizza_0.geometry} material={materials.Pizza} rotation={[-Math.PI / 2, 0, 0]} scale={1100} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/pizza.gltf')
