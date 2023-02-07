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

const Collaborations = ({ collaborations, router }) => {

  const dispatch = useDispatch()
  const { panel } = useSelector(x => x)
  const { view } = useSelector(x => x)
  const { hideNav } = useSelector(x => x)

  useEffect(() => {
    if (view && hideNav) {
      dispatch({ type: "HIDE_NAV", payload: false });
    }
  }, [])

  return collaborations?.length > 0 ? (
    <>
      <Head>
        <title>Collaborations</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="Photography collaborations of Anna Papadopoulou with other organisms"/>
        <meta name="keywords" content="HTML,CSS,JavaScript,Next.js, Node.js"/>
        <meta name="author" content="TDE Studio"/>
        <meta name="robots" content="index, follow"/>
      </Head>
      <div data-scroll-section className="master-container">
      {!view ? (
          <motion.article
            variants={containerFeed}
            initial="hidden"
            animate="show"
            className="name">
            <motion.h1 className="project-title" variants={itemFeed}>
              Collaborations
            </motion.h1>
          </motion.article> ) : ""}
          <motion.article variants={containerFeed} initial="hidden" animate="show" className="project-feed">

            {router.pathname == '/admin' ?
              (<>
                {collaborations.map((collab, i) => (
                  <motion.section
                    key={i}
                    className="project"
                    variants={itemFeed}
                    whileHover={ view ? { scale: 1.1 } : ""}
                    transition={{ type: "spring", stiffness: 400, damping: 100 }}
                    onClick={() => {
                      dispatch({ type: "SET_COLLAB_PANEL", payload: !panel })
                      dispatch({ type: "SET_PROJECT", payload: collab })
                    }}
                  >
                    <Image
                      className="thumbnail" 
                      blurDataURL={collab.images[0]?.base64}
                      placeholder="blur"
                      src={collab.images[0]?.url}
                      width={collab.images[0]?.width}
                      height={collab.images[0]?.height}
                      alt={collab.images[0]?.name}
                      unoptimized
                      loading="lazy"
                    />
                    <h1 style={{ padding: "10px  " }}>{collab.title}</h1>
                  </motion.section>
                ))}
              </>
              )
              :
              (<>
                {collaborations.map((collab, i) => (
                  <Link key={i} href={`collaborations/${collab.slug}`}>
                    <motion.section
                      className="project"
                      variants={itemFeed}
                      whileHover={ view ? { scale: 1.1 } : ""}
                      transition={{ type: "spring", stiffness: 400, damping: 100 }}
                    >
                      <Image
                        className="thumbnail"
                        priority
                        blurDataURL={collab.images[0]?.base64}
                        placeholder="blur"
                        src={collab.images[0]?.url}
                        width={collab.images[0]?.width}
                        height={collab.images[0]?.height}
                        alt={collab.images[0]?.name}
                        unoptimized
                      />
                      <h1 style={{ padding: "10px  " }}>{collab.title}</h1>
                    </motion.section>
                  </Link>
                ))}
              </>)}
          </motion.article>
        </div>
    </>
  ) : (
    <>
    <Head>
        <title>Collaborations</title>
      </Head>
    <div style={{padding: "160px 40px 80px"}}>
      <motion.article
        variants={containerFeed}
        initial="hidden"
        animate="show"
        className="project-feed">
        <motion.h1 variants={itemFeed}>
          There are no collaborations yet.
        </motion.h1>
      </motion.article>
    </div>
    </>
  );
};

export default withRouter(Collaborations);
