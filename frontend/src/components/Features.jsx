import NodeJSLogo from "../assets/nodejs.svg"
import ViteLogo from "../assets/vite.svg"
import VercelLogo from "../assets/vercel.svg"
import ReactLogo from "../assets/react.svg"
import TailwindCSSLogo from "../assets/tailwindcss.svg"
import MongoDBLogo from "../assets/mongodb.svg"
import FadeInLeftOnScroll from "../components/FadeInLeftOnScroll"
import FadeInRightOnScroll from "./FadeInRightOnScroll"

const Features = () => {
  return <div className="w-4/5 mx-auto flex flex-col items-center">
    <h2 className="text-4xl text-zinc-200 font-bold">Tech Stack</h2>
    <div className="flex justify-center gap-4 mb-20 mt-10">
      {[NodeJSLogo, ViteLogo, VercelLogo, ReactLogo, TailwindCSSLogo, MongoDBLogo].map((logo, i) => (
        <FadeInLeftOnScroll key={i} delay={i * 0.2}>
          <div className="border border-zinc-600 rounded-xl size-24 flex justify-center relative">
            <img src={logo} alt="logo" className="size-16 self-center absolute z-10" />
            <img src={logo} alt="logo" className="size-16 self-center blur-md opacity-50" />
          </div>
        </FadeInLeftOnScroll>
      ))}
    </div>    
  </div> 
}

export default Features