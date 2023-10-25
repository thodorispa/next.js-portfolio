import React from "react";
import App from 'next/app'
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react' ;

import { store } from "../store/index";

import NavMenu from "../components/NavMenu"
import Init from "../components/Init"
import Transition from "../components/Transition"

import "../styles/main.css"
import "../styles/home.css"
import "../styles/navmenu.css"
import "../styles/projects.css"
import "../styles/globals.css";
import "../styles/panel.css";
import "../styles/quill.css";
import "../styles/admin.css";
import "../styles/contact.css";
import { getSessionFromCookie } from "../helpers/getSessionFromCookie";

const MyApp = ({ Component, pageProps, router }) => {

  const { user, nav, view, hideNav, session } = pageProps

  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <link rel="stylesheet" href="https://use.typekit.net/kgg4bts.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
          <Init {...pageProps} user={user} nav={nav} view={view} hideNav={hideNav} />
            <NavMenu {...pageProps} />
            <Transition>
              <main data-scroll-container>
                <Component {...pageProps} key={router.route}/>
              </main>
            </Transition>
        </Provider>
      </SessionProvider>
    </>
  )


}

MyApp.getInitialProps = async (ctx) => {
  const { pageProps } = await App.getInitialProps(ctx)
  const session = await getSessionFromCookie(ctx.ctx);

  return { pageProps: { ...pageProps, session } }
}

export default MyApp;
