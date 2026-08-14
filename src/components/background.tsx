import React from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function BackgroundColorEffect() {
  const colors = ["red", "blue", "green", "yellow"]
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".backgroundColor").forEach((item) => {
      gsap.set(
        item,
        {
          background: gsap.utils.random(colors),
          x: gsap.utils.random(100, (window.innerWidth - 100)),
          y: gsap.utils.random(100, (window.innerHeight - 100))
        })
    })
  })
  return (
    <>
      <div className="backgroundColor" style={{
        background: "blue",
        width: 100,
        height: 100,
        position: "absolute",
        borderRadius: 50,
        filter: "blur(70px)"
      }}></div>
      <div className="backgroundColor" style={{
        background: "blue",
        width: 100,
        height: 100,
        position: "absolute",
        borderRadius: 50,
        filter: "blur(70px)"
      }}></div>
      <div className="backgroundColor" style={{
        background: "blue",
        width: 100,
        height: 100,
        position: "absolute",
        borderRadius: 50,
        filter: "blur(70px)"
      }}></div>
      <div className="backgroundColor" style={{
        background: "blue",
        width: 100,
        height: 100,
        position: "absolute",
        borderRadius: 50,
        filter: "blur(70px)"
      }}></div>
      <div className="backgroundColor" style={{
        background: "blue",
        width: 100,
        height: 100,
        position: "absolute",
        borderRadius: 50,
        filter: "blur(70px)"
      }}></div>
      <div className="backgroundColor" style={{
        background: "blue",
        width: 100,
        height: 100,
        position: "absolute",
        borderRadius: 50,
        filter: "blur(70px)"
      }}></div>
    </>
  )
}
