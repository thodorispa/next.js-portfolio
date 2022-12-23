export const container = {
  hidden: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 350,
      damping: 50,
    }
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 350,
      damping: 50,
      staggerChildren: 0.5
    }
  }
}
export const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.3,
      type: "spring",
      delayChildren: 0.3,
      staggerChildren: 0.5,}
  }
}