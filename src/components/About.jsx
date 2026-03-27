import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'

import { Code2, Blocks, Server, Bot } from 'lucide-react';

const getIconForTitle = (title, defaultIcon) => {
  if (title === "Full Stack Developer") return <Code2 size={80} color="#915eff" />;
  if (title === "React & Next.js Ecosystem") return <Blocks size={80} color="#915eff" />;
  if (title === "Backend & REST APIs") return <Server size={80} color="#915eff" />;
  if (title === "AI Tools & Automation") return <Bot size={80} color="#915eff" />;
  return <img src={defaultIcon} alt={title} className='w-16 h-16 object-contain' />;
};

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className='w-full'>
      <motion.div variants={fadeIn("right", "spring", 0.5 * index, 0.75)} className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card h-full'>
        <div options={{
          max: 45,
          scale: 1,
          speed: 450,
        }} className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col h-full'
        >
          {getIconForTitle(title, icon)}
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>

    </Tilt>
  )
}
const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secondary text-[17px] w-full text-justify leading-[30px]'>
        I’m a Full Stack Developer with hands-on experience building scalable and user-focused web applications using modern technologies like Next.js, React, Node.js, and PostgreSQL.

        Currently working at DigiBenders Inc., I contribute to production-level applications by developing reusable components, designing efficient APIs, and optimizing performance to deliver seamless user experiences.

        I enjoy solving real-world problems through clean code and thoughtful system design. Alongside development, I actively explore AI tools and automation to build smarter, more efficient digital solutions.

        I’m passionate about creating impactful products, continuously improving my skills, and working on ideas that combine technology, usability, and innovation.
      </motion.p>

      <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full'>
        {services.map((service, index) => (<ServiceCard key={service.title} index={index} {...service} />))}

      </div>
    </>
  )
}

export default SectionWrapper(About, "about")