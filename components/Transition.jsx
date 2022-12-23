import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Transition = ({ children }) => {

  const variants = {
    out: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.35
      }
    },
    in: {
      opacity: 1,
      y: 0
    }
  };
  
  const { asPath } = useRouter();

  return (
    <AnimatePresence
	      initial={false}
	      exitBeforeEnter
    >
      <motion.div
      key={asPath}
      variants={variants}
      initial="out"
      animate="in"
      exit="out">
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;