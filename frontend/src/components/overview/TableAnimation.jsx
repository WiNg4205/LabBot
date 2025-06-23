import { useRef, useEffect, useState } from "react"

const TableAnimation = () => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  const [showLastRow, setShowLastRow] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowLastRow(true), 500)
      return () => clearTimeout(timer)
    }
  }, [visible])

  return (
    <div ref={ref} className={`rounded ${visible ? "visible" : ""}`}>
      <div className="flex bg-slate-800 text-zinc-100 font-semibold w-72 border border-zinc-500">
        <div className="flex-1 border-r px-3 py-2 border-zinc-500 text-center">Game</div>
        <div className="flex-1 border-r px-3 py-2 border-zinc-500 text-center">Date</div>
        <div className="flex-1 px-3 py-2 text-center">Winner</div>
      </div>
      <div className="flex border-b border-zinc-500 w-72">
        <div className="flex-1 border-x px-3 py-2 border-zinc-500">Bowling</div>
        <div className="flex-1 border-r px-3 py-2 border-zinc-500">16/01/25</div>
        <div className="flex-1 border-r px-3 py-2 border-zinc-500">Player A</div>
      </div>
      {showLastRow && (
        <div className="flex fade-slide-in border-y border-zinc-500 bg-zinc-700 w-72 -mt-[1px]">
          <div className="flex-1 border-x px-3 py-2 border-zinc-500">Pool</div>
          <div className="flex-1 border-r px-3 py-2 border-zinc-500">14/02/25</div>
          <div className="flex-1 border-r px-3 py-2 border-zinc-500">Player B</div>
        </div>
      )}
    </div>
  )
}

export default TableAnimation
