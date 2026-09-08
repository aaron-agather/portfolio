import React, { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP,SplitText,ScrambleTextPlugin);

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

  const skillRef = useRef<HTMLDivElement>(null);

  if (amount > 10) {
    amount = 10
  }

  useGSAP(() => {

    if (!skillRef.current) return;

    console.log("GSAP START:", skill);

    let splitSkillText = SplitText.create(skillRef.current, { type: "chars, words" })
    let textanim = gsap.timeline({})
    textanim.to(splitSkillText.chars, {
      color: "red", stagger: .05, rotateZ: 180
    }).to({}, 2, {}).to(splitSkillText.chars, {
      color: "white", stagger: .05, rotateZ: 360
    }).set(splitSkillText.chars, { rotateZ: 0 })

    return () => {
          console.log("GSAP CLEANUP:", skill);

          textanim.kill();
          splitSkillText.revert();
        };
  }, [])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div ref={skillRef}>{skill}</div>

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
            zIndex: 1,
            position: "relative"
          }}
        >
        </div>
        <div style={{
          width: 100,
          zIndex: 5,
          position: "relative",
          top: -20,
          color: "black"
        }}>
          {amount * 10}%
        </div>
      </div>
    </div>
  );
}

function ThreeDPart() {
  const areaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
    const geometry = new THREE.OctahedronGeometry(2, 0);

    const colors: number[] = [];
    const position = geometry.attributes.position;

    const topColor = new THREE.Color("darkgray");    // red
    const middleColor = new THREE.Color("brown"); // purple
    const bottomColor = new THREE.Color("pink"); // blue

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

    const edge = new THREE.EdgesGeometry(geometry, 2)

    const cube = new THREE.Mesh(geometry, material);

    // scene.add(cube);

    var lineColor = new THREE.Color("blue")
    const lineMaterial = new THREE.LineBasicMaterial({color: lineColor})

    const line = new THREE.Line(
      edge, lineMaterial
    )

    scene.add(line)

    const animation = gsap.timeline()
    animation.timeScale(.1)

    animation.to(line.rotation, { x: .2 })
    animation.to(lineMaterial.color, { r: 10, b: 0, g: 0 })
    animation.to(line.rotation, { y: 360, duration: 60, repeat: -1 })

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
    <>
      <div style={{ height: "20%", width: "100%" }}></div>
     <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
       <div
         style={{
           display: "grid",
           justifyContent: "center",
           alignItems: "center",
           paddingTop: 20,
           gap: 10
         }}
        >
         <Card>
           <div>Skills</div>

           <SkillLine skill="HTML" amount={8} />
           <SkillLine skill="CSS" amount={8} />
           <SkillLine skill="JS" amount={5} />
         </Card>
         <Card>
           <div>Languages</div>
           <SkillLine skill="German (Native)" amount={11} />
           <SkillLine skill="English (Fluent)" amount={10} />
           <SkillLine skill="Danish (Intermediate)" amount={5} />
         </Card>
       </div>

       <div style={{ justifyContent: "center", alignItems: "center" }}>
         <ThreeDPart />
       </div>
     </div>
    </>
  );
}
