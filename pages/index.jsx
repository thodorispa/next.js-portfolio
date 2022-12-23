import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head'
import Home from '../src/pages/Home.page'
import { SmoothScrollProvider } from '../src/contexts/SmoothScroll.context'
import axios from 'axios';
import Loader from '../components/Loader'

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { NODE_ENV } = publicRuntimeConfig

export default function Index({ _media }) {

  return _media ? (
    <SmoothScrollProvider options={{ smooth: true }}>
      <Home media={_media} />
    </SmoothScrollProvider>
  ) : (
    <Loader />
  )
}

export async function getServerSideProps() {

  const baseURI = NODE_ENV === 'production' ? "https://anna-papadopoulou-6bt9.vercel.app" : 'http://localhost:3000'

  const { data } = await axios.get(baseURI + '/api/media')
  const _media = data[0] || { name: '', images: [] }
  
  return {
    props: {
      _media,
    }
  }
}
