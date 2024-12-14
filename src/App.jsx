import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useGLTF, ContactShadows } from "@react-three/drei";
import { easing } from "maath";
import Lenis from "@studio-freight/lenis";
import "./App.css";

function Model({ url, targetPosition, targetRotation }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      easing.damp3(ref.current.position, targetPosition, 0.25, delta);
      easing.dampE(ref.current.rotation, targetRotation, 0.25, delta);
    }
  });

  return <primitive ref={ref} object={scene} castShadow />;
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 3,
        state.pointer.y * 2.5,
        8 + Math.cos(state.pointer.x) * 5,
      ],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}

export default function App() {
  const [modelState, setModelState] = useState({
    position: [0, -2, 0],
    rotation: [0, 0, 0],
  });
  const lenisRef = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      direction: "vertical",
    });
    lenisRef.current = lenis;

    const onScroll = ({ scroll }) => {
      const isMobile = window.innerWidth <= 768;

      if (scroll > 500 && scroll <= 1000) {
        setModelState({
          position: isMobile ? [0, -2.5, -3] : [0, -3, -5],
          rotation: [0, 0, 0],
        });
      } else if (scroll > 1000 && scroll <= 1500) {
        setModelState({
          position: [0, -2, 0],
          rotation: [0, 0, 0],
        });
      } else if (scroll > 1500 && scroll <= 2000) {
        setModelState({
          position: isMobile ? [2, -2, -1.5] : [3, -2, -2],
          rotation: [-0.3, -0.8, -0.3],
        });
      } else if (scroll > 2000) {
        setModelState({
          position: isMobile ? [-2, -2, -1.5] : [-3, -2, -2],
          rotation: [-0.3, 0.8, 0.3],
        });
      } else {
        setModelState({ position: [0, -2, 0], rotation: [0, 0, 0] });
      }
    };

    lenis.on("scroll", onScroll);
    const animationLoop = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animationLoop);
    };
    requestAnimationFrame(animationLoop);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="container">
      <div className="animation">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
          <ambientLight intensity={0.5} />

          <Float floatIntensity={2} speed={2} rotationIntensity={0.5}>
            <Model
              url="/model/black.glb"
              targetPosition={modelState.position}
              targetRotation={modelState.rotation}
            />
          </Float>

          <ContactShadows
            position={[0, -3.5, 0]}
            scale={10}
            blur={2}
            far={10}
            opacity={0.75}
          />

          <Environment files="/ShowcaseEnvy.hdr" />

          <Rig />
        </Canvas>
      </div>
      <div>
        <section className="section1" style={{ height: "100vh" }}></section>
        <section className="section2" style={{ height: "100vh" }}></section>
        <section className="section3" style={{ height: "100vh" }}></section>
        <section className="section4" style={{ height: "100vh" }}></section>
        <section className="section5" style={{ height: "100vh" }}></section>
      </div>
    </div>
  );
}