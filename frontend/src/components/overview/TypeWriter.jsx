import { useState, useEffect, useRef } from 'react'

const Typewriter = ({ text, className = "", speed = 400 }) => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (currentIndex < text.length) {
      if (!visible) return
      const typingInterval = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, speed);
      return () => clearTimeout(typingInterval)
    }
  }, [currentIndex, text, speed, visible])

  return (
    <div>
      <div ref={ref} className={`font-mono ${className}`}>{displayText}<span className="ml-1 blinking-caret translate-x-2"></span></div>
    </div>
  ) 
};

export default Typewriter
