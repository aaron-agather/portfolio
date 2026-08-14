import React, { ReactNode, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap"

function Card({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(100, 100, 100, .25)",
        borderRadius: 25,
        padding: 50,
        gap: 20,
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      {children}
    </div>
  );
}

function SkillLine({
  skill,
  amount,
}: {
  skill: string;
  amount: number;
}) {
  return (
    <div>
      <div>{skill}</div>

      <div
        style={{
          background: "darkgray",
          height: 15,
          width: 100,
        }}
      >
        <div
          style={{
            background: "white",
            height: 15,
            width: amount * 10,
            fontSize: 12,
            color: "black",
          }}
        >
          {amount * 10}%
        </div>
      </div>
    </div>
  );
}

function ThreeDPart() {
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;

    if (!area) return;

    const { width, height } = area.getBoundingClientRect();

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );

    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(width, height);

    area.appendChild(renderer.domElement);

    // Test cube
    const geometry = new THREE.SphereGeometry(1.5, 50, 16);

    const colors: number[] = [];
    const position = geometry.attributes.position;

    const topColor = new THREE.Color(0xff0000);    // red
    const middleColor = new THREE.Color(0x800080); // purple
    const bottomColor = new THREE.Color(0x0000ff); // blue

    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i);

      let color: THREE.Color;

      if (y > 0.5) {
        color = topColor;
      } else if (y < -0.5) {
        color = bottomColor;
      } else {
        color = middleColor;
      }

      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
    });

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);


    gsap.to(cube.rotation, { y: 10, repeat: -1, duration: 10})

    renderer.setAnimationLoop(() => {renderer.render(scene, camera)});

    // Cleanup
    return () => {
      renderer.setAnimationLoop(null);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      area.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={areaRef}
      style={{
        width: "500px",
        height: "500px",
      }}
    />
  );
}

export function Content() {
  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Card>
          <div>Skills</div>

          <SkillLine skill="HTML" amount={8} />
          <SkillLine skill="CSS" amount={8} />
        </Card>
      </div>

      <div style={{ background: "red", justifyContent: "end", alignItems: "end" }}>
        <ThreeDPart />
      </div>
    </div>
  );
}
