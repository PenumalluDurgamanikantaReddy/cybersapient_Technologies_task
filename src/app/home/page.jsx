

'use client'
import { Canvas } from '@react-three/fiber'
import Scene from '../components/Scene'
import SceneWrap from '../components/ScenceWrap'

const Home=()=>{





    return(
        <div className="app">
<div className="scroll-container relative   h-[400vh]">
    <div className="canvas-container sticky top-0 left-0" >
{/* <Canvas style={{height:"100vh"}}>
    <Scene/>
</Canvas> */}
<SceneWrap/>
    </div>

</div>

        </div>
    )
}

export default Home