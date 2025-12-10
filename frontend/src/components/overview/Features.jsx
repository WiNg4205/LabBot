import NodeJSLogo from "../../assets/nodejs.svg"
import ViteLogo from "../../assets/vite.svg"
import VercelLogo from "../../assets/vercel.svg"
import ReactLogo from "../../assets/react.svg"
import TailwindCSSLogo from "../../assets/tailwindcss.svg"
import MongoDBLogo from "../../assets/mongodb.svg"
import FadeInLeftOnScroll from "./FadeInLeftOnScroll"
import FadeInRightOnScroll from "./FadeInRightOnScroll"
import HorizontalStack from "./HorizontalStack"
import TypeWriter from "./TypeWriter"
import TableAnimation from "./TableAnimation"
import CalendarAnimation from "./CalendarAnimation"
import AdminAnimation from "./AdminAnimation"


const Features = () => {
  return <div className="max-w-[80%] mx-auto flex flex-col items-center mb-20">
    <h2 className="text-4xl lg:text-5xl text-zinc-200 font-bold">Tech Stack</h2>
    <div className="flex justify-center gap-3 lg:gap-4 mt-10">
      {[NodeJSLogo, ViteLogo, VercelLogo, ReactLogo, TailwindCSSLogo, MongoDBLogo].map((logo, i) => (
        <HorizontalStack key={i} delay={i * 0.2}>
          <div className="border border-zinc-600 rounded-xl size-12 lg:size-24 flex justify-center relative">
            <img src={logo} alt="logo" className="size-8 lg:size-16 self-center absolute z-10" />
            <img src={logo} alt="logo" className="size-8 lg:size-16 self-center blur-md opacity-50" />
          </div>
        </HorizontalStack>
      ))}
    </div>

    <h2 className="text-4xl lg:text-5xl font-bold mt-20 lg:mt-40 text-zinc-200">Features</h2>
    <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-3 lg:grid-rows-2 w-full lg:h-120 gap-6 mt-12">
      <FadeInRightOnScroll className="bg-zinc-800 border border-zinc-700 rounded-lg size-full p-4">
        <div className="text-center text-xl font-bold">Slash Commands</div>
        <TypeWriter className="mt-8 mx-8 text-2xl text-zinc-400" text="/command" />
      </FadeInRightOnScroll>
      <FadeInLeftOnScroll className="flex flex-col items-center bg-zinc-800 border border-zinc-700 rounded-lg lg:col-span-2 p-4">
        <div className="text-center text-xl font-bold mb-4">Score Tracking</div>
        <TableAnimation />
      </FadeInLeftOnScroll>
      <FadeInRightOnScroll className="bg-zinc-800 border border-zinc-700 rounded-lg size-full lg:col-span-2 p-4">
        <div className="text-center text-xl font-bold">Calendar UI</div>
        <div className="-mt-16">
          <CalendarAnimation />
        </div>
      </FadeInRightOnScroll>
      <FadeInLeftOnScroll className="flex flex-col items-center bg-zinc-800 border border-zinc-700 rounded-lg p-4">
        <div className="text-center text-xl font-bold">Admin</div>
        <AdminAnimation />
      </FadeInLeftOnScroll>
    </div>
  </div> 
}

export default Features