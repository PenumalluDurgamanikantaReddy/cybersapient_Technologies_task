import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Model } from './Modal';
import {useFrame, useThree} from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier';

import { useScroll, useTransform } from 'framer-motion';

const Scene=()=>{


const {scrollYProgress}=useScroll()

  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [3, -5, 0, 4, 0]);
  const z = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 2, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [6, 5, -5, 6, 5]);
  const Lookx = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, -0.8, 0, 0]);
  const Lookz = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0, 0]);
  const Looky = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0, 0]);
    const {camera} = useThree()
   

    useFrame(()=>{

        const xPos = x.get()
        const zPos = z.get()
        const yPos = y.get()
            const xLook = Lookx.get();
    const zLook = Lookz.get();
    const yLook = Looky.get();
         camera.position.set(xPos,zPos,yPos)
    camera.lookAt(xLook,zLook,yLook)
    })
    return(
  <Physics>
          <Environment preset="city" environmentIntensity={0.2} />

         <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={1}
        // castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />
        <PerspectiveCamera makeDefault fov={(window.innerWidth<768)?40:20}/>
        <ambientLight/>
        <Model/>
           <RigidBody type="fixed">
        <mesh position={[0, -1, 0]} receiveShadow>
          <cylinderGeometry args={[100, 100, 1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </RigidBody>

      {/* Model */}
      <RigidBody colliders="trimesh">
        <Model castShadow receiveShadow />
      </RigidBody>
         </Physics>
    )
}

export default Scene