import React from 'react';
import CollaborationTitle from '../../src/pages/CollaborationTitle.page'
import axios from 'axios'
import { SmoothScrollProvider } from '../../src/contexts/SmoothScroll.context'
import Loader from '../../components/Loader'

 const Project = ({ collaboration }) => {

  return collaboration ? ( 
    <SmoothScrollProvider options={{ smooth: true }}>
      <CollaborationTitle collaboration={collaboration} />
    </SmoothScrollProvider>
   ) : (
    <Loader/>
   );
 }
  
 export default Project;

 export async function getServerSideProps(ctx) {
  const slug = ctx.resolvedUrl.split("collaborations/")[1]

  const baseURI = process.env.NODE_ENV=== 'production' ? "https://annapapadopoulou.me" : 'http://localhost:3000'
  const { data } = await axios.get(baseURI + "/api/collab/" + slug)
  const { collaboration } = data || []
  
  return {
    props: {
      collaboration : collaboration || null,
    }
  }
}
