import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const Github = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My GitHub Contributions</p>
        <h2 className={styles.sectionHeadText}>Days I Code.</h2>
      </motion.div>
      <div className="w-full flex justify-center mt-10 pt-5 pb-5 rounded-[20px] bg-tertiary">
        <GitHubCalendar
          username="Itsvrajpatel"
          blockSize={15}
          blockMargin={5}
          fontSize={16}
          colorScheme="dark"
        />
      </div>
    </>
  );
};

export default SectionWrapper(Github, "github");
