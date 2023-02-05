import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, Variants } from "framer-motion";
import { container, containerSmall, item, itemSmall } from '../styles/framer-motion/AnimateNav'
import Link from "next/link";
import UseOutsideHandler from "../helpers/clickOutsideWrapper";

const NavMenu = () => {
  const dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const { nav } = useSelector((x) => x);
  const { view } = useSelector((x) => x);
  const { modal } = useSelector((x) => x);
  const { hideNav } = useSelector((x) => x);
  const [selection, setSelection] = useState(0);
  const [selectedLink, setSelectedLink] = useState(0);


  useEffect(() => { 
    setSelection(localStorage.getItem("nav"));
    setSelectedLink(localStorage.getItem("nav"));
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize?.innerWidth > 430 && windowSize?.innerHeight > 430) {
      dispatch({ type: "SET_VIEW", payload: true })
    } else {
      dispatch({ type: "SET_VIEW", payload: false })
    }
  }, [windowSize]);

  const wrapperRef = useRef(null);
  UseOutsideHandler(wrapperRef);

  return view && !hideNav ? (
    <header>
      <nav className={`navmenu ${modal ? 'hide-nav' : ''}`}>
        <motion.ul
          className="navlinks"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Link href="/">
            <motion.li
              className={`link ${selection === 1 ? "link-active" : ""}`}
              variants={item}
              initial="hidden"
              animate="show"
              onClick={() => {
                setSelectedLink(1);
                localStorage.setItem("nav", 1);
              }}
              onMouseEnter={() => setSelection(0)}
              onMouseLeave={() => setSelection(selectedLink)}
            >
              Anna Papadopoulou
            </motion.li>
          </Link>
          <Link href="/projects">
            <motion.li
              className={`link ${selection === 2 ? "link-active" : ""}`}
              variants={item}
              initial="hidden"
              animate="show"
              onClick={() => {
                setSelectedLink(2);
                localStorage.setItem("nav", 2);
              }}
              onMouseEnter={() => setSelection(0)}
              onMouseLeave={() => setSelection(selectedLink)}
            >
              Projects
            </motion.li>
          </Link>
          <Link href="/collaborations">
            <motion.li
              className={`link ${selection ===  3? "link-active" : ""}`}
              variants={item}
              initial="hidden"
              animate="show"
              onClick={() => {
                setSelectedLink(3);
                localStorage.setItem("nav", 3);
              }}
              onMouseEnter={() => setSelection(0)}
              onMouseLeave={() => setSelection(selectedLink)}
            >
              Collaborations
            </motion.li>
          </Link>
          <Link href="/contact">
            <motion.li
              className={`link ${selection === 4 ? "link-active" : ""}`}
              variants={item}
              initial="hidden"
              animate="show"
              onClick={() => {
                setSelectedLink(4);
                localStorage.setItem("nav", 4);
              }}
              onMouseEnter={() => setSelection(0)}
              onMouseLeave={() => setSelection(selectedLink)}
            >
              Contact
            </motion.li>
          </Link>
        </motion.ul>
      </nav>
    </header>
  ) : (
    view ? 
      <>
      <header>
      <nav ref={wrapperRef} className={`navmenu ${modal ? 'hide-nav' : ''}`}>
        <motion.ul
          className="navlinks"
          variants={containerSmall}
          initial="hidden"
          animate={nav ? "show" : "hide"}
        >
          <Link href="/">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Anna Papadopoulou
            </motion.li>
          </Link>
          <Link href="/projects">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Projects
            </motion.li>
          </Link>
          <Link href="/collaborations">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Collaborations
            </motion.li>
          </Link>
          <Link href="/contact">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Contact
            </motion.li>
          </Link>
        </motion.ul>
        <motion.div
          className="bar-toggle"
          initial={{
            x: -150,
            transition: {
              duration: 0.4,
              type: "tween",
            },
          }}
          animate={
            nav
              ? {
                  x: -5,
                  y: -1.5,
                  transition: {
                    duration: 0.4,
                    type: "tween",
                    stiffness: 100,
                  },
                }
              : {
                  x: -260,
                  transition: {
                    duration: 0.4,
                    type: "tween",
                  },
                }
          }
        >
          <motion.i
            className={
              nav
                ? "fa-solid fa-xmark icon-default"
                : "fas fa-bars fa-lg icon-hover"
            }
            style={{
              marginLeft: nav
              ? ""
              : "20px",
              fontSize: nav
              ? "23px"
              : ""
            }}
            onClick={() => dispatch({ type: "SET_NAV", payload: !nav })}
          />
        </motion.div>
      </nav>
    </header>
    </>
    : 
    <>
    <header>
      <motion.nav 
      ref={wrapperRef} 
      className={`navmenu wide ${modal ? 'hide-nav' : ''}`}
      initial={{x: "-100%"}}
      animate={
        nav
          ? {
              x: "0%",
              transition: {
                duration: 0.4,
                type: "spring",
                stiffness: 400,
                damping: 50,
                bounce: 0,
              },
            }
          : {
            transition: {
              duration: 1,
              type: "spring",
              stiffness: 400,
              damping: 50,
              bounce: 0,
            },
          }
      }>
        <motion.ul
          className="navlinks add-background wide"
          variants={containerSmall}
          initial="hidden"
          animate={nav ? "show" : "hide"}
          transition={{duration: 1, bounce: 0}}
        >
          <Link href="/">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Anna Papadopoulou
            </motion.li>
          </Link>
          <Link href="/projects">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Projects
            </motion.li>
          </Link>
          <Link href="/collaborations">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Collaborations
            </motion.li>
          </Link>
          <Link href="/contact">
            <motion.li
              className="link"
              variants={itemSmall}
              onClick={() => dispatch({ type: "SET_NAV", payload: false })}
            >
              Contact
            </motion.li>
          </Link>
        </motion.ul>
        <motion.div
          className="bar-toggle"
          initial={{
            x: -10,
            transition: {
              duration: 1.4,
              type: "tween",
              stiffness: 400,
              damping: 90,
              bounce: 0,
            },
          }}
          animate={
            nav
              ? {
                  x: -50,
                  transition: {
                    duration: 0.4,
                    type: "tween",
                    stiffness: 400,
                  },
                }
              : {
                  x: -10,
                  transition: {
                    duration: 0.4,
                    stiffness: 400,
                    damping: 90,
                    type: "tween",
                    bounce: 0,
                  },
                }
          }
          exit={{transition: {
            duration: 0.4,
            type: "tween",
          },}}
          // transition= {{
          //   duration: 0.4,
          //   type: "spring",
          //   stiffness: 300,
          //   damping: 40,
          //   bounce: 0,
          // }}
        >
          <motion.i
          initial={{transition: {
            duration: 0.4,
            type: "tween",
          },}}
            className={
              nav
                ? "fa-solid fa-xmark icon-default"
                : "fas fa-bars fa-lg icon-hover"
            }
            style={{
              marginLeft: nav
              ? ""
              : "20px",
              fontSize: nav
              ? "23px"
              : ""
            }}
            onClick={() => dispatch({ type: "SET_NAV", payload: !nav })}
          />
        </motion.div>
      </motion.nav>
    </header>
    </>
  );
};
export default NavMenu;

function getWindowSize() {
  if (typeof window != "undefined") {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
}
