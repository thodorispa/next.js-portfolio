export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
      delayChildren: 0.2,
      staggerChildren: 0.2,
    }
  }
}

export const item = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 100,
      delayChildren: 0.2,
      staggerChildren: 0.2,}
  }
}