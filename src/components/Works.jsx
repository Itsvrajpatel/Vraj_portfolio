import { Tilt } from "react-tilt"
import { motion } from "framer-motion"
import { styles } from "../styles"
import { github } from "../assets"
import { SectionWrapper } from "../hoc"
import { projects } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"
import { ExternalLink } from "lucide-react"

const ProjectCard = ({ index, name, description, tags, image, source_code_link, live_link }) => {
  return(
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} className="w-full h-full">
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col justify-between"
      >
        <div className="relative w-full h-[230px]">
          <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl"/>

          <div className="absolute inset-0 flex justify-end gap-2 m-3 card-img_hover">
            {live_link && (
              <div onClick={() => window.open(live_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                title="Live Demo"
              >
                <ExternalLink size={20} color="#fff" />
              </div>
            )}
            <div onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              title="Source Code"
            >
              <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
            </div>
          </div>

        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>#{tag.name}</p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Works = () => {
  return (
   <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>My Work</p>
      <h2 className={styles.sectionHeadText}>Projects.</h2>
    </motion.div>
    
    <div className="w-full flex">
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] w-full text-justify leading-[30px]"
      >
        Following projects showcases my skills and experience through
        real-world examples of my work. Each project is briefly described with
        links to code repositories and live demos in it. It reflects my
        ability to solve complex problems, work with different technologies,
        and manage projects effectively.

      </motion.p>
      
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
      {projects.map((project, index) => (
        <ProjectCard
        key={`prpject-${index}`}
        index={index}
        {...project}
        />
      ))}
    </div>

   </>
  )
}

export default SectionWrapper(Works, "");
