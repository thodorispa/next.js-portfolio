import React from 'react';
import Projects from '../../src/pages/Projects.page'
import { SmoothScrollProvider } from '../../src/contexts/SmoothScroll.context'
import axios from 'axios'
const AllProjects = ({ _projects }) => {
  return (
    <SmoothScrollProvider options={{ smooth: true }}>
      <Projects projects={_projects} />
    </SmoothScrollProvider>
  );
}

export default AllProjects;

export async function  getStaticProps() {
  const baseURI = process.env.NODE_ENV === 'production' ? "https://annapapadopoulou.me" : 'http://localhost:3000'

  const { data } = await axios.get(baseURI + '/api/project')
  let _projects = data || []

  return {
    props: {
      _projects
    }
  }
}
