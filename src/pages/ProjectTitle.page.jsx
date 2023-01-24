import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { container, item } from "../../styles/framer-motion/AnimateProject";
import ImageModal from "../../components/ImageModal";
import { SmoothScrollContext } from "../contexts/SmoothScroll.context";
import OptImage from "../../components/OptImage";

const ProjectTitle = ({ project }) => {

  const { scroll } = useContext(SmoothScrollContext);
  const { view } = useSelector((x) => x);
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

  return project ? (
    <>
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
            {project.title}{" "}
          </motion.h1>
          <motion.h3 className="project-subtitle" variants={item}>
            {" "}
            {project.subTitle}{" "}
          </motion.h3>
          <motion.img
            className="header-image"
            src={project.images[0].url}
            alt={project.images[0].alt}
            variants={item}
          />
          <motion.div
            dangerouslySetInnerHTML={{ __html: project.description }}
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
          {project?.images
            .sort((a, b) => a.index - b.index)
            .slice(1)
            .map((image, i) => (
              <section key={i} className="project-images">
                <OptImage 
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  placeholder="blur"
                  blurDataURL={image.base64}
                  unoptimized
                  loading="lazy"
                  onClick={() => handleClick(image, i)}
                />
                <span dangerouslySetInnerHTML={{__html:image.caption}}></span>
              </section>
            ))}
        </section>
      </div>

     {/* BACK TO TOP */}
     <a
        href="#top"
        className="back-to-top-btn"
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
              images={project.images}
              setClickedImg={setClickedImg}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ) : (
    <div className="master-container">
      <h1>Project not found.</h1>
    </div>
  );
  };

export default ProjectTitle;
