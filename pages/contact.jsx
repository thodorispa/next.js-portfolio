import React from 'react'
import Head from 'next/head'
import { container, item } from '../styles/framer-motion/AnimateContact'
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  return (
    <AnimatePresence>
      <>
      <Head>
        <title>Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta charset="UTF-8"/>
        <meta name="description" content="Contact information of Anna Papadopoulou"/>
        <meta name="keywords" content="HTML,CSS,JavaScript,Next.js, Node.js"/>
        <meta name="author" content="TDE Studio"/>
        <meta name="robots" content="noindex, nofollow"/>
      </Head>
        <motion.section
          className="contact-container"
          variants={container}
          initial="hidden"
          animate="show">
          <motion.h1 className="contact-title" variants={item}>Contact Info</motion.h1>
          <motion.h2 className="contact-subtitle" variants={item}>Anna Papadopoulou</motion.h2>
          <motion.section className="social-info" variants={item}>
            <motion.article
              className="contact-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 100 }}>
              <i className="fa-brands fa-instagram" style={{ padding: "0px 10px" }}></i>
              <a href="https://www.instagram.com/anna_on_camera/" target="_blank" rel="noreferrer">@anna_on_camera</a>
            </motion.article>
            <motion.article
              className="contact-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 100 }}>
              <i className="fa-regular fa-envelope" style={{ padding: "0px 10px" }}></i>
              <a href="mailto:annapap.photography@gmail.com">annapap.photography@gmail.com</a>
            </motion.article>
          </motion.section>
          <motion.article
            className="copyright"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 1.1
              }
            }}
            exit={{ opacity: 0 }}>
            <h4>&copy; All Rights Reserved 2023</h4>
            <h4>&nbsp;Developed by TDE Studio</h4>
          </motion.article>
        </motion.section>
      </>
    </AnimatePresence>
  );
}

export default Contact;