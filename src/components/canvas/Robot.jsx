import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader';

const Baymax = ({ isMobile }) => {
  const headRef = useRef();
  const rightArmRef = useRef();
  const rightEyeRef = useRef();
  
  // Track mouse coordinates globally
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: '#ffffff', 
    roughness: 0.4, 
    metalness: 0.1,
  });
  
  const blackMaterial = new THREE.MeshBasicMaterial({ color: '#111111' });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Pointer coordinates are normalized between -1 and 1
    const targetX = (mouse.current.x * Math.PI) / 4;
    const targetY = (mouse.current.y * Math.PI) / 6; // Less vertical movement

    if (headRef.current) {
        // Smoothly rotate the head toward the pointer
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
    }
    
    // Greeting Waving Animation
    if (rightArmRef.current) {
        if (t > 0.5 && t < 2.5) {
            let progress = (t - 0.5) / 2.0; 
            let waveEnvelope = Math.sin(progress * Math.PI); 
            // Lift arm (rotate z to negative)
            let baseAngle = 0.4 - (waveEnvelope * 2.2); 
            // Waving oscillations
            let waveMotion = Math.sin(progress * Math.PI * 8) * 0.5 * waveEnvelope;
            rightArmRef.current.rotation.z = baseAngle + waveMotion;
        } else {
            // Calmly return arm to rest
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.4, 0.1);
        }
    }
    
    // Winking Animation
    if (rightEyeRef.current) {
        // Wink the right eye at a specific moment
        const isWink = (t > 1.0 && t < 1.3);
        rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
            rightEyeRef.current.scale.y, 
            isWink ? 0.05 : 1.0, 
            0.4
        );
    }
  });

  return (
    // Scaled down significantly and positioned lower to avoid covering the text
    <group scale={isMobile ? 0.9 : 1.2} position={[0, isMobile ? -2.8 : -3.2, 0]}>

      {/* Head Group */}
      <group ref={headRef} position={[0, 2.5, 0]}>
        {/* Head Base Sphere */}
        <mesh material={bodyMaterial} scale={[1, 0.7, 0.8]}>
          <sphereGeometry args={[0.7, 32, 32]} />
        </mesh>
        
        {/* Right Eye (winking side) */}
        <mesh ref={rightEyeRef} position={[0.25, 0, 0.54]} material={blackMaterial}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
        
        {/* Left Eye */}
        <mesh position={[-0.25, 0, 0.54]} material={blackMaterial}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>

        {/* Eye Connector Line */}
        <mesh position={[0, 0, 0.55]} material={blackMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        </mesh>
      </group>

      {/* Chest/Torso */}
      {/* We make the torso wide and tall, but it goes off screen at the bottom */}
      <mesh position={[0, 0.5, 0]} material={bodyMaterial} scale={[1.2, 1.2, 0.9]}>
        <sphereGeometry args={[1.5, 32, 32]} />
      </mesh>

      {/* Shoulders / Upper Arms */}
      {/* Right Shoulder (waving side) */}
      <group ref={rightArmRef} position={[1.5, 1.2, 0]} rotation={[0, 0, 0.4]}>
        <mesh material={bodyMaterial}>
          <capsuleGeometry args={[0.4, 0.8, 32, 32]} />
        </mesh>
      </group>

      {/* Left Shoulder */}
      <group position={[-1.5, 1.2, 0]} rotation={[0, 0, -0.4]}>
        <mesh material={bodyMaterial}>
          <capsuleGeometry args={[0.4, 0.8, 32, 32]} />
        </mesh>
      </group>

      {/* Subtle Badge/Emblem on heart */}
      <mesh position={[0.6, 1.2, 1.3]} material={bodyMaterial} rotation={[0, 0.3, 0]}>
        <circleGeometry args={[0.15, 32]} />
      </mesh>
    </group>
  );
};

const RobotCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaQueryChange);
    } else {
      mediaQuery.addListener(handleMediaQueryChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      } else {
        mediaQuery.removeListener(handleMediaQueryChange);
      }
    };
  }, []);

  return (
    // absolute positioning in CSS at parent handles bottom center
    <div className="absolute bottom-0 w-full h-full pointer-events-none">
      <Canvas
        frameloop='always'
        shadows
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Soft, even lighting for a more "2D / flat" look while retaining depth */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[0, 2, 5]} 
            intensity={0.8} 
          />
          
          {/* We omitted OrbitControls so the model stays completely fixed relative to the screen */}
          <Baymax isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default RobotCanvas;
