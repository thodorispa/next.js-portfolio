import React from 'react';
import ProjectTitle from '../../src/pages/ProjectTitle.page'
import axios from 'axios'
import { SmoothScrollProvider } from '../../src/contexts/SmoothScroll.context'
import Loader from '../../components/Loader'

 const Project = ({ project }) => {

  return project ? ( 
    <SmoothScrollProvider options={{ smooth: true }}>
      <ProjectTitle project={project} />
    </SmoothScrollProvider>
   ) : (
    <Loader/>
   );
 }
  
 export default Project;

 export async function getServerSideProps(ctx) {
  const slug = ctx.resolvedUrl.split("projects/")[1]

  const baseURI = process.env.NODE_ENV=== 'production' ? "https://anna-papadopoulou-6bt9.vercel.app" : 'http://localhost:3000'
  const { data } = await axios.get(baseURI + "/api/project/" + slug)
  const { project } = data || []

  return {
    props: {
      project,
    }
  }
}
