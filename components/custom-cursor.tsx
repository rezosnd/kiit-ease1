"use client"

import { useEffect } from "react"

export default function CustomCursor() {
  useEffect(() => {
    const cursorBig = document.createElement("div")
    cursorBig.classList.add("cursor", "big")

    const cursorSmall = document.createElement("div")
    cursorSmall.classList.add("cursor", "small")

    document.body.appendChild(cursorBig)
    document.body.appendChild(cursorSmall)

    // Position the two  in a desired placement
    document.addEventListener("mousemove", (e) => {
      cursorBig.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`

      cursorSmall.style.left = e.clientX + "px"
      cursorSmall.style.top = e.clientY + "px"
    })

    // Adds class when cursor clicks
    document.addEventListener("mousedown", () => {
      cursorBig.classList.add("click")
      cursorSmall.classList.add("hover__small")
    })

    // Removes class when cursor stops clicking
    document.addEventListener("mouseup", () => {
      cursorBig.classList.remove("click")
      cursorSmall.classList.remove("hover__small")
    })

    // Adds and removes class when mouse hovers and stops hovering
    const links = document.querySelectorAll("a, button, [role='button']")
    links.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursorBig.classList.add("hover__big")
        cursorSmall.classList.add("hover__small")
      })

      item.addEventListener("mouseleave", () => {
        cursorBig.classList.remove("hover__big")
        cursorSmall.classList.remove("hover__small")
      })
    })

    // Cleanup function
    return () => {
      document.body.removeChild(cursorBig)
      document.body.removeChild(cursorSmall)
      document.removeEventListener("mousemove", () => {})
      document.removeEventListener("mousedown", () => {})
      document.removeEventListener("mouseup", () => {})
    }
  }, [])

  return null
}
