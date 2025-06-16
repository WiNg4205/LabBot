import NodeJSLogo from "../assets/nodejs.svg"
import ViteLogo from "../assets/vite.svg"
import VercelLogo from "../assets/vercel.svg"
import ReactLogo from "../assets/react.svg"
import TailwindCSSLogo from "../assets/tailwindcss.svg"
import MongoDBLogo from "../assets/mongodb.svg"
import FadeInLeftOnScroll from "../components/FadeInLeftOnScroll"
import FadeInRightOnScroll from "./FadeInRightOnScroll"

const Features = () => {
  return <div className="flex w-4/5 mx-auto justify-between">
    <div>
      {[NodeJSLogo, ViteLogo, VercelLogo].map((logo, i) => (
        <FadeInLeftOnScroll key={i}>
          <img src={logo} alt="logo" className="size-20" />
        </FadeInLeftOnScroll>
      ))}      
    </div>
    <div>
      {[ReactLogo, TailwindCSSLogo, MongoDBLogo].map((logo, i) => (
        <FadeInRightOnScroll key={i}>
          <img src={logo} alt="logo" className="size-20" />
        </FadeInRightOnScroll>
      ))}      
    </div>
  </div>
}

export default Features