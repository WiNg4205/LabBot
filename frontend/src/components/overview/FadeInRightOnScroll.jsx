import { useRef, useEffect, useState } from "react"

const FadeInRightOnScroll = ({ children, className = "" }) => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`fade-in-right ${className} ${visible ? "visible" : ""}`}>
      {children}
    </div>
  )
}

export default FadeInRightOnScroll
