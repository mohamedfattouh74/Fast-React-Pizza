import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import Pizza from '../../../public/Pizza'

import { Suspense } from 'react';

export default function PizzaModel(){
    return    <div className='w-full h-[250px]'>
    <Canvas camera={{ fov: 75, position: [0, 15, 20] }}>
      <Suspense fallback={null}>
        <ambientLight/>
        <OrbitControls 
        autoRotate
        enableZoom={false}
        />
        <Environment preset='night'></Environment>
        <ContactShadows position={[0,-2.5,0]} opacity={0.5} scale={40} blur={1} far={10} resolution={256} color='#000000'></ContactShadows>
        <Pizza></Pizza>
      </Suspense>
    </Canvas>
  </div>
}