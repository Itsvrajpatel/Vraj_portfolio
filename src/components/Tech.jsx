import { SectionWrapper } from "../hoc"
import { technologies, tools } from "../constants"
import { ScrollVelocity } from "@/components/ui/scroll-velocity"

// Duplicate technologies to ensure seamless infinite scroll (handles wide screens)
const extendedTechs = [...technologies, ...technologies, ...technologies, ...technologies]
const extendedTools = [...tools, ...tools, ...tools, ...tools]

const Tech = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col space-y-0 py-10">
        <ScrollVelocity velocity={0.5} movable={true} className="py-6">
          {extendedTechs.map((technology, index) => (
            <div
              key={`${technology.name}-${index}`}
              className="relative flex items-center justify-center p-4 bg-tertiary/10 border border-white/10 rounded-full mx-6 h-24 w-24 md:h-28 md:w-28 flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(145,94,255,0.8)] hover:border-[#915eff] hover:z-10"
              title={technology.name}
            >
              <img
                src={technology.icon}
                alt={technology.name}
                className="h-[60%] w-[60%] object-contain"
              />
            </div>
          ))}
        </ScrollVelocity>
        
        <ScrollVelocity velocity={-0.5} movable={true} className="py-6">
          {extendedTools.map((tool, index) => (
            <div
              key={`${tool.name}-reverse-${index}`}
              className="relative flex items-center justify-center p-4 bg-tertiary/10 border border-white/10 rounded-full mx-6 h-24 w-24 md:h-28 md:w-28 flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(145,94,255,0.8)] hover:border-[#915eff] hover:z-10"
              title={tool.name}
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="h-[60%] w-[60%] object-contain"
              />
            </div>
          ))}
        </ScrollVelocity>
      </div>
    </div>
  )
}

export default SectionWrapper(Tech, "");