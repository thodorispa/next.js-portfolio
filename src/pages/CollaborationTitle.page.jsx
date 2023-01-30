import React, { useState, useEffect, useContext } from "react";
import Head from 'next/head'
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { container, item } from "../../styles/framer-motion/AnimateProject";
import ImageModal from "../../components/ImageModal";
import { SmoothScrollContext } from "../contexts/SmoothScroll.context";
import OptImage from "../../components/OptImage";

const CollaborationTitle = ({ collaboration }) => {

  const { scroll } = useContext(SmoothScrollContext);
  const { view } = useSelector((x) => x);
  const { modal } = useSelector(x => x);
  const dispatch = useDispatch();

  const [clickedImg, setClickedImg] = useState(null);
  const [image, setImage] = useState(null);
  const [arrVisible, setArrVisible] = useState(false);

  const handleClick = (image, i) => {
    dispatch({ type: "TOGGLE_MODAL", payload: true });
    setClickedImg(image);
    setImage(image);
  };

  scroll?.on("scroll", (args) => {  
    if (view) {
      if (args.scroll.y > 650) {
        dispatch({ type: "HIDE_NAV", payload: true });
        setArrVisible(true)
      } else {
        dispatch({ type: "HIDE_NAV", payload: false });
        setArrVisible(false)
      }
    }
  });

  const goToTop = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo(0);
  };

  useEffect(() => {
    if (clickedImg) {
      scroll?.stop();
    } else {
      scroll?.start();
    }
  }, [clickedImg]);

  return collaboration ? (
    <>
     <Head>
        <title>{collaboration.title}</title>
      </Head>
      <div data-scroll-section className="project-container">
        <motion.header
          data-scroll
          data-scroll-position="top"
          data-scroll-speed="-1"
          className="header-project"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="project-title" variants={item}>
            {" "}
            {collaboration.title}{" "}
          </motion.h1>
          <motion.h3 className="project-subtitle" variants={item}>
            {" "}
            {collaboration.subTitle}{" "}
          </motion.h3>
          <motion.div
            dangerouslySetInnerHTML={{ __html: collaboration.description }}
            variants={item}
            className="description"
          />
        </motion.header>

        <section
          data-scroll
          data-scroll-repeat
          data-scroll-call="hide"
          className="project-details"
        >
          {collaboration?.images
            .sort((a, b) => a.index - b.index)
            .map((image, i) => (
              
              <motion.section 
              key={i} 
              className="project-images"
              initial={{opacity: 0}}
              animate={{
                opacity: 1,
                transition: {
                  delay: 1.2
                }
              }}>
                <OptImage
                  src={image.url}
                  alt={image.alt}
                  placeholder="blur"
                  blurDataURL={image.base64}
                  width={image.width}
                  height={image.height}
                  unoptimized
                  loading="lazy"
                  onClick={() => handleClick(image, i)}
                />
                <span style={{textAlign: "center"}} dangerouslySetInnerHTML={{__html:image.caption}}></span>
              </motion.section>
            ))}
        </section>
      </div>

      {/* BACK TO TOP */}
     <a
        href="#top"
        className={ !modal ? "back-to-top-btn" : "hide-back-to-top"}
        onClick={goToTop}
      >
        <AnimatePresence>
        {arrVisible && ( 
        <motion.i
        key="back-to-top"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fa-solid fa-arrow-up"/>
        )}
        </AnimatePresence>
      </a>

      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageModal
              image={image}
              setImage={setImage}
              images={collaboration.images}
              setClickedImg={setClickedImg}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ) : (
    <div className="master-container">
      <h1>Collaboration not found.</h1>
    </div>
  );
  };

export default CollaborationTitle;
