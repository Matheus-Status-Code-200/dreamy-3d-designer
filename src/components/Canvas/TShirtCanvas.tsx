import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { TShirt } from './TShirt';

const TShirtCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2.5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Center>
        <TShirt />
      </Center>
    </Canvas>
  );
};

export default TShirtCanvas;