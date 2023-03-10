import React from 'react';
import Collaborations from '../../src/pages/Collaborations.page'
import { SmoothScrollProvider } from '../../src/contexts/SmoothScroll.context'
import axios from 'axios'

const AllCollaborations = ({ _collaborations, baseURL }) => {
  return ( 
    <SmoothScrollProvider options={{ smooth: true }}>
      <Collaborations collaborations={_collaborations} baseURL={baseURL}/>
    </SmoothScrollProvider>
   );
}
 
export default AllCollaborations;

export async function getServerSideProps(ctx) {
  const baseURI = process.env.NODE_ENV=== 'production' ? "https://annapapadopoulou.me" : 'http://localhost:3000'
  const { data } = await axios.get(baseURI + '/api/collab')
  const _collaborations = data || []

  return {
    props: {
      _collaborations
    }
  }
}
