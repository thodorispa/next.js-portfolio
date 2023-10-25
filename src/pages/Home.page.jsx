import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head'
import OptImage from '../../components/OptImage'
import { container, item } from '../../styles/framer-motion/AnimateMain'
import { motion, Variants, AnimatePresence } from "framer-motion";
import { SmoothScrollContext } from '../contexts/SmoothScroll.context'
import ImageModal from '../../components/ImageModal'
import { useDispatch, useSelector } from "react-redux";

export default function Home({ media }) {

  const { scroll } = useContext(SmoothScrollContext)
  const { view } = useSelector(x => x)
  const { hideNav } = useSelector(x => x)
  const { modal } = useSelector(x => x);
  const dispatch = useDispatch();

  const [clickedImg, setClickedImg] = useState(null)
  const [image, setImage] = useState(null)
  const [arrVisible, setArrVisible] = useState(false)
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const flag = media.images.length > 0;
  
  const goToTop = event => {
    event.preventDefault()
    scroll && scroll.scrollTo(0)
  }

  const handleClick = (image) => {
    dispatch({ type: "TOGGLE_MODAL", payload: true });
    setImage(image)
    setClickedImg(image)
  }

  useEffect(() => {
    if (view && hideNav) {
      dispatch({ type: "HIDE_NAV", payload: false });
    }
  }, [])

  useEffect(() => {
    if (clickedImg) {
      scroll?.stop();
    } else {
      scroll?.start();
    }
  }, [clickedImg])

  scroll?.on("scroll", (args) => {  
    if (args.scroll.y > 650) {
      setArrVisible(true)
    }
    else {
      setArrVisible(false)
    }
  });

  return flag ? (
    <>
      <div data-scroll-section className="home-container">
      <Head>
      <title>Anna Papadopoulou | Professional Photography</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href="https://annapapadopoulou.me/" />



      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>


      <meta name="title" content="Anna Papadopoulou | Professional Photography"/>
      <meta name="description" content="Explore the world through the lens of Anna Papadopoulou. Discover captivating photography, portfolios, and the stories behind each shot."/>
      <meta name="keywords" content="Photography, Portraits, Landscape, Anna Papadopoulou, Professional Photography, Next.js, Node.js"/>
      

      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://annapapadopoulou.me/"/>
      <meta property="og:title" content="Anna Papadopoulou | Professional Photography"/>
      <meta property="og:description" content="Explore the world through the lens of Anna Papadopoulou. Discover captivating photography, portfolios, and the stories behind each shot."/>
      <meta property="og:image" content="/path_to_preview_image.jpg"/>


      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content="https://annapapadopoulou.me/"/>
      <meta property="twitter:title" content="Anna Papadopoulou | Professional Photography"/>
      <meta property="twitter:description" content="Explore the world through the lens of Anna Papadopoulou. Discover captivating photography, portfolios, and the stories behind each shot."/>
      <meta property="twitter:image" content="/path_to_preview_image.jpg"/>

      <meta name="author" content="TDE Studio"/>
      <meta name="robots" content="index, nofollow"/>
</Head>

        <AnimatePresence enterBeforeExit>
          {!view ? (
            <motion.article
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="name">
              <motion.h1 className="project-title" variants={item}>
                Anna Papadopoulou
              </motion.h1>
            </motion.article>
          ) : ""}

          {/* Front Page Meida */}
          <article data-scroll-speed="-1" className="intro-feed">
            {flag ? (
              media.images?.map((image, i) => (
                <motion.div
                  data-scroll-repeat
                  key={i}
                  className="img-container"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: .5,
                      type: "tween",
                      ease: "easeIn",
                    }
                  }}
                  viewport={{ once: true }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={imageIsLoaded ?
                      {
                        opacity: 1,
                        transition: {
                          duration: .3
                        }
                      }
                      :
                      {}}>
                    <OptImage
                      className="transition duration-1000"
                      key={image.id}
                      src={image.url}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      placeholder="blur"
                      blurDataURL={image.base64}
                      unoptimized
                      loading="lazy"
                      onClick={() => handleClick(image)}
                      onLoad={event => {
                        const target = event.target;
                        if (image.url.indexOf('data:image/webp;base64') < 0) {
                          setImageIsLoaded(true)
                        }
                      }} />
                      <span className="home-captions" dangerouslySetInnerHTML={{__html:image.caption}}></span>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              ""
            )}
          </article>
        </AnimatePresence>
      </div>
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
              images={media.images}
              setClickedImg={setClickedImg}
            />
          </motion.div>
        )}
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
      </AnimatePresence>
    </>
  ) : (
    <div className="master-container">
      <motion.article
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="project-feed">
        <motion.h1 variants={item}>
          There is nothing to show here.
        </motion.h1>
      </motion.article>
    </div>
  )
}