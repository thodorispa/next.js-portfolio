import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion";
import { container, item } from '../styles/framer-motion/AnimateModal'
import { useDispatch } from 'react-redux'

const ImageModal = ({ image, setImage, images, setClickedImg }) => {

  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (e.target.classList.contains("close-modal")) {
      dispatch({ type: "TOGGLE_MODAL", payload: false });
      setImage(null)
      setClickedImg(null)
    }
  }
  
  const handleRotationRight = () => {
    const totalLength = images.length

    if (image.index + 1 >= totalLength) {
      image = images[0]
      setImage(images[0])
      return;
    }

    const index = image.index + 1;
    image = images[index]
    setImage(images[index])
    return;
  }

  const handleRotationLeft = () => {
    if (image.index === 0) {
      image = images[images.length - 1]
      setImage(images[images.length - 1])
      return;
    }

    const index = image.index - 1;
    image = images[index]
    setImage(images[index])
    return;
  }

  const handleKeyNav = e => {
    const key = e.key || 0;
    switch (key) {
      case 'ArrowLeft':
        handleRotationLeft()
        break;
      case 'ArrowRight':
        handleRotationRight()
        break;
      case 'Escape':
        dispatch({ type: "TOGGLE_MODAL", payload: false });
        setImage(null)
        setClickedImg(null)
        image = null
        break;
      default:
        break;
    }
  }
  
  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyNav, { passive: true })
    return () => {
      document.body.removeEventListener('keydown', handleKeyNav, { passive: true })
    }
  }, [])


  return (
    <AnimatePresence>
      <article>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="modal-container">

          <article
            className="inner-modal" >

            <motion.i
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fa-solid fa-xmark close-modal"
              onClick={closeModal}>
            </motion.i>

            <motion.i
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fa-solid fa-arrow-right next-slide"
              onClick={handleRotationRight}>
            </motion.i>

            <motion.i
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fa-solid fa-arrow-left prev-slide"
              onClick={handleRotationLeft}>
            </motion.i>

            <Image
              className="img-modal-container"
              draggable={false}
              priority
              src={image.url}
              alt={image.alt || 'image zoom'}
              width={600}
              height={600}
              unoptimized={() => { n.objectUrl }}
            />
          </article>
        </motion.div>
      </article>
    </AnimatePresence>
  );
}

export default ImageModal;