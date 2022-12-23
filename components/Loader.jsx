import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'

const Loader = () => {

  return ( 
    <AnimatePresence>
    <motion.body
      initial={{opacity: 0}}
      animate={{
        opacity: 1,
        transition: {
          duration: .4,
          type: "spring",
          stiffness: 300,
          damping: 90,
        }
      }}
      exit={{opacity: 0}}
      className="loader">
    </motion.body>
    </AnimatePresence>
   );
}
 
export default Loader;