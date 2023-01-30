import React from 'react';
import Home from '../src/pages/Home.page'
import { SmoothScrollProvider } from '../src/contexts/SmoothScroll.context'
import axios from 'axios';
import Loader from '../components/Loader'

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
  const baseURI = process.env.NODE_ENV === 'production' ? "https://annapapadopoulou.me" : 'http://localhost:3000'

  const { data } = await axios.get(baseURI + '/api/media')
  const _media = data[0] || { name: '', images: [] }
  
  return {
    props: {
      _media
    }
  }
}
