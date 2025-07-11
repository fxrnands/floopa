import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";

export default function FloopaCanvas() {
  const [fov, setFov] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFov(20);
        
      } else {
        setFov(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Canvas
      className="w-full h-full absolute inset-0"
      camera={{ position: [-7, 2.4, 6], fov: fov }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <FloopaModel />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <CameraMouseFollow />
    </Canvas>
  );
}

function FloopaModel() {
  const { scene } = useGLTF("/floppa.glb");
  const [position, setPosition] = useState(0.3);
 useEffect(() => {
   const handleResize = () => {
     if (window.innerWidth < 768) {
       setPosition(0.4);
     } else {
       setPosition(0.3);
     }
   };

   handleResize();
   window.addEventListener("resize", handleResize);
   return () => window.removeEventListener("resize", handleResize);
 }, []);
  return <primitive object={scene} scale={1} position={[-0.4, position, 0]} />;
}

function CameraMouseFollow() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouse.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const maxOffsetX = 0.5;
    const maxOffsetY = 0.3;

    const targetX = -7 + mouse.current.x * maxOffsetX;
    const targetY = 2.4 + mouse.current.y * maxOffsetY;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    camera.lookAt(0, 0, 0);
  });

  return null;
}
