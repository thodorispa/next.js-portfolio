import React from 'react';
import Head from 'next/head'

const NotFound = () => {
  return ( 
    <>
    <Head>
      <title>Page Not Found</title>
    </Head>
    <div className="master-container">
    <header>
      <h1>Looks like there is nothing here.</h1>
    </header>
    <article className="banner-not-found">
      <h1>404</h1>
    </article>
    </div>
    </>
   );
}
 
export default NotFound;