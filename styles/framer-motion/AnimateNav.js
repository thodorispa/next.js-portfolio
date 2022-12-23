export const container = {
  hidden: { opacity: "0" },
  show: {
    opacity: "1",
  }
}

export const item = {
  hidden: { opacity: "0"},
  show: { 
    opacity: "1", 
   }
}
export const containerSmall = {
  hidden: { opacity: "0", x: "-100%"},
  show: {
    opacity: "1",
    x: "0",
    transition: {
      duration: .05,
      staggerChildren: 0.05,
      type: "spring",
      stiffness: 400,
      damping: 60,
      bounce: 0,
    }
  },
  hide: {
    x: "-100%",
    opacity: "0",
    transition: {
      duration: .05,
      type: "spring",
      stiffness: 100,
      damping: 20,
      bounce: 0,
    }
   }
}

export const itemSmall = {
  hidden: { 
    opacity: "0", 
    x: -40,
    transition: {
      staggerChildren: 0.1,
    }
   },
  show: { 
    opacity: "1", 
    x: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
      staggerChildren: 0.1,
    }
   },
}