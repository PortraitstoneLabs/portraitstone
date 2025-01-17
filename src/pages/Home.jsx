import {Suspense, useState, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Tetrahedron from '../models/Tetrahedron'
import HomeInfo from '../components/HomeInfo'



const Home = () => {


//import sakura from '../assets/sakura.mp3'
//import { soundoff, soundon } from "../assets/icons";

// const Home = () => {
  //const audioRef = useRef(new Audio(sakura));
  //audioRef.current.volume = 0.4;
  //audioRef.current.loop = true;
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic){
      audioRef.current.play();
    }
    // return() => {
    //   audioRef.current.pause();
    // }
  }, [isPlayingMusic])

  const adjustTetrahedronForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -143];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };
  const [tetrahedronScale, tetrahedronPosition, tetrahedronRotation] = adjustTetrahedronForScreenSize();



  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      {currentStage && <HomeInfo currentStage={currentStage}/>}
    </div>
            <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.01, far: 10000 }}
      >
        <Suspense fallback={<Loader />}>
        <directionalLight position={[100, 1, 1]} intensity={2} />
        <ambientLight intensity={5.5} />
        <pointLight position={[100, 5, 10]} intensity={20} />
        <spotLight
            position={[10, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={10}
          />
            
          <Tetrahedron 
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={tetrahedronPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={tetrahedronScale}
            />
          
        </Suspense>
      </Canvas>
 
      {/* <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div> */}
    </section>
  );
};

export default Home;