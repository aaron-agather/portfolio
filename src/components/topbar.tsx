import React, {RefObject, useRef} from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, Observer);

type TextWithgGlowProps = {
  glowText: string;
  glowSize: number;
  glowColor: string;
  ref: RefObject<HTMLDivElement | null>
}

function TextWithGlow({ glowText, glowSize, glowColor, ref }: TextWithgGlowProps) {
  return (
    <>
      <div ref={ref} style={{
        textShadow: `
          0 0 5px white,
          0 0 ${glowSize}px ${glowColor},
          0 0 ${glowSize * 2}px ${glowColor},
          0 0 ${glowSize * 4}px ${glowColor},
          0 0 ${glowSize * 6}px ${glowColor},
          0 0 ${glowSize * 8}px ${glowColor},
          0 0 ${glowSize * 10}px ${glowColor}
        `, zIndex: 1
      }}>{glowText}</div>
    </>
  )
}

export function Topbar() {
  const topbarRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);

  const homeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const topbar = topbarRef.current;
    const follow = followRef.current;

    const home = homeRef.current;

    if (!topbar || !follow || !home) return;

    let anchored = false;

    gsap.set(follow, {
      xPercent: -50,
      yPercent: -50,
      scale: 1
    });

    type mousemoveProp = {
      x: number,
      y: number
    }

    const handleMouseMove = ({x, y}: mousemoveProp) => {
      if (anchored) return;
      const rect = topbar.getBoundingClientRect();

      gsap.to(follow, {
        duration: 0.5,
        overwrite: "auto",
        x: x - rect.left,
        y: y - rect.top,
        ease: "none",
      });
    };

    const anchorTo = (element: HTMLElement) => {
      anchored = true;

      gsap.killTweensOf(follow)

      const x = element.offsetLeft + element.offsetWidth / 2;
      const y = element.offsetTop + element.offsetHeight / 2;

      gsap.to(follow, {
        x,
        y,
        width: 100,
        height: 25,
        background: "red",
        duration: 0.3,
        ease: "power2.out",
      });
    };

     const unanchor = () => {
       anchored = false;
       gsap.to(follow, {
         width: 20,
         height: 20,
         background: "rgba(100, 0, 0, .5)",
         duration: 0.3,
         ease: "power2.out",
       });
     };

     topbar.addEventListener("mousemove", handleMouseMove);

     const links = topbar.querySelectorAll<HTMLElement>(".topbarItem");

     links.forEach((link) => {
       link.addEventListener("mouseenter", () => anchorTo(link));
       link.addEventListener("mouseleave", unanchor);
     });

    return () => {
      topbar.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);



  return (
    <div className="topbar"
      ref={topbarRef}
      style={{
        background: "black",
        padding: 50,
        color: "white",
        display: "flex",
        justifyContent: "center",
        gap: 50,
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomColor: "white",
        borderBottomWidth: 2,
        borderBottomStyle: "solid"
        // zIndex: -2
      }}>
      <div
        ref={followRef}
        className="purpleFollow"
        style={{
          height: 20,
          width: 20,
          background: "rgba(100, 0, 0, .5)",
          position: "absolute",
          top: 0,
          left: 0,
          boxShadow: "0 0 20px red",
          borderRadius: 50
          // zIndex: -1
        }}></div>
      {/*<TextWithGlow glowText="Home" glowColor="purple" glowSize={10} ref={homeRef} />*/}
      <div className="topbarItem" style={{ zIndex: 1, padding: 10 }}>
        <a href="." style={{color: "white", textDecoration: "none"}}>
          <div ref={homeRef}>Home</div>
        </a>
      </div>
      <div className="topbarItem" style={{ zIndex: 1, padding: 10 }}>
        <a href="." style={{color: "white", textDecoration: "none"}}>
          <div ref={homeRef}>Skills</div>
        </a>
      </div>
      <div className="topbarItem" style={{ zIndex: 1, padding: 10 }}>
        <a href="." style={{color: "white", textDecoration: "none"}}>
          <div ref={homeRef}>About Me</div>
        </a>
      </div>
      {/*<TextWithGlow glowText="Skills" glowColor="purple" glowSize={10} />
      <TextWithGlow glowText="About Me" glowColor="purple" glowSize={10} />*/}
    </div>
  )
}
