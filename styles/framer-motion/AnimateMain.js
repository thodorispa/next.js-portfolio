export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      duration: 1,
      type: "spring",
      delayChildren: 0.3,
      staggerChildren: 0.5,
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
      delayChildren: 1,
      staggerChildren: 0.5,}
  }
}
export const containerFeed = {
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

export const itemFeed = {
  hidden: { opacity: 0, y: 40, },
  show: {
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.3,
      type: "spring",
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
}