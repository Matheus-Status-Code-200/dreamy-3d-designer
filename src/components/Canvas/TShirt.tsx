import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { state } from '../../store';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial, Mesh } from 'three';

// Define the type for our GLTF result
interface CustomGLTFResult extends GLTF {
  nodes: {
    T_Shirt_male: Mesh
  }
  materials: {
    lambert1: MeshStandardMaterial
  }
}

export function TShirt() {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb') as CustomGLTFResult;

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
          />
        )}
      </mesh>
    </group>
  );
}

// Preload the model
useGLTF.preload('/shirt_baked.glb');