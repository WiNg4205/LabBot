import NodeJSLogo from "../assets/nodejs.svg"
import ViteLogo from "../assets/vite.svg"
import VercelLogo from "../assets/vercel.svg"
import ReactLogo from "../assets/react.svg"
import TailwindCSSLogo from "../assets/tailwindcss.svg"
import MongoDBLogo from "../assets/mongodb.svg"
import FadeInLeftOnScroll from "./FadeInLeftOnScroll"
import FadeInRightOnScroll from "./FadeInRightOnScroll"
import HorizontalStack from "./HorizontalStack"


const Features = () => {
  return <div className="max-w-[80%] mx-auto flex flex-col items-center">
    <h2 className="text-5xl text-zinc-200 font-bold">Tech Stack</h2>
    <div className="flex justify-center gap-4 mt-10">
      {[NodeJSLogo, ViteLogo, VercelLogo, ReactLogo, TailwindCSSLogo, MongoDBLogo].map((logo, i) => (
        <HorizontalStack key={i} delay={i * 0.2}>
          <div className="border border-zinc-600 rounded-xl size-24 flex justify-center relative">
            <img src={logo} alt="logo" className="size-16 self-center absolute z-10" />
            <img src={logo} alt="logo" className="size-16 self-center blur-md opacity-50" />
          </div>
        </HorizontalStack>
      ))}
    </div>
    <h2 className="text-5xl font-bold mt-40">Features</h2>
    <div className="grid grid-cols-3 grid-rows-2 w-full h-120 gap-4 mt-12">
      <FadeInRightOnScroll className="bg-zinc-800 rounded-lg size-full">
        <div className="text-center mt-4 text-lg">Slash Commands</div>
      </FadeInRightOnScroll>
      <FadeInLeftOnScroll className="bg-zinc-800 rounded-lg col-span-2">
        <div className="text-center mt-4 text-lg">Score Tracking</div>
      </FadeInLeftOnScroll>
      <FadeInRightOnScroll className="bg-zinc-800 rounded-lg size-full col-span-2">
        <div className="text-center mt-4 text-lg">Calendar UI</div>
      </FadeInRightOnScroll>
      <FadeInLeftOnScroll className="bg-zinc-800 rounded-lg">
        <div className="text-center mt-4 text-lg">Admin</div>
      </FadeInLeftOnScroll>
    </div>

  </div> 
}

export default Features