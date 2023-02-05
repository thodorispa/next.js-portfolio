import React, { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from 'next/link'
import { withRouter } from 'next/router';
import {
  containerFeed,
  itemFeed,
} from "../../styles/framer-motion/AnimateMain";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const Projects = ({ projects, router }) => {

  const dispatch = useDispatch()
  const { panel } = useSelector(x => x)
  const { view } = useSelector(x => x)
  const { hideNav } = useSelector(x => x)

  useEffect(() => {
    if (view && hideNav) {
      dispatch({ type: "HIDE_NAV", payload: false });
    }
  }, [])

  return projects.length > 0 ? (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div data-scroll-section className="master-container">
      {!view ? (
          <motion.article
            variants={containerFeed}
            initial="hidden"
            animate="show"
            className="name">
            <motion.h1 className="project-title" variants={itemFeed}>
              Projects
            </motion.h1>
          </motion.article> ) : ""}
          <motion.article variants={containerFeed} initial="hidden" animate="show" className="project-feed">

            {router.pathname == '/admin' ?
              (<>
                {projects.map((project, i) => (
                  <motion.section
                    key={i}
                    className="project"
                    variants={itemFeed}
                    whileHover={ view ? { scale: 1.1 } : ""}
                    transition={{ type: "spring", stiffness: 400, damping: 100 }}
                    onClick={() => {
                      dispatch({ type: "SET_PANEL", payload: !panel })
                      dispatch({ type: "SET_PROJECT", payload: project })
                    }}
                  >
                    <Image
                      className="thumbnail" 
                      blurDataURL={project.images[0]?.base64}
                      placeholder="blur"
                      src={project.images[0]?.url}
                      width={project.images[0]?.width}
                      height={project.images[0]?.height}
                      alt={project.images[0]?.name}
                      unoptimized
                      loading="lazy"
                    />
                    <h1 style={{ padding: "10px  " }}>{project.title}</h1>
                  </motion.section>
                ))}
              </>
              )
              :
              (<>
                {projects.map((project, i) => (
                  <Link key={i} href={`projects/${project.slug}`}>
                    <motion.section
                      className="project"
                      variants={itemFeed}
                      whileHover={ view ? { scale: 1.1 } : ""}
                      transition={{ type: "spring", stiffness: 400, damping: 100 }}
                    >
                      <Image
                        className="thumbnail"
                        priority
                        blurDataURL={project.images[0]?.base64}
                        placeholder="blur"
                        src={project.images[0].url}
                        width={project.images[0].width}
                        height={project.images[0].height}
                        alt={project.images[0].name}
                        unoptimized
                      />
                      <h1 style={{ padding: "10px" }}>{project.title}</h1>
                    </motion.section>
                  </Link>
                ))}
              </>)}
          </motion.article>
        </div>
    </>
  ) : (
    <div style={{padding: "160px 40px 80px"}}>
      <motion.article
        variants={containerFeed}
        initial="hidden"
        animate="show"
        className="project-feed">
        <motion.h1 variants={itemFeed}>
          There are no projects yet.
        </motion.h1>
      </motion.article>
    </div>
  );
};

export default withRouter(Projects);
