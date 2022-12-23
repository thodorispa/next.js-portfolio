
export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      duration: 1,
      type: "spring",
      delayChildren: 0.3,
      staggerChildren: 0.3,
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
      staggerChildren: 0.3,}
  }
}