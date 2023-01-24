import Head from 'next/head'
import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';

import { getSession, useSession } from "next-auth/react";
import ProjectPanel from "../../components/ProjectPanel"
import CollabPanel from "../../components/CollabPanel"
import FrontPagePanel from "../../components/FrontPagePanel"
import Projects from '../../src/pages/Projects.page'
import Collaborations from '../../src/pages/Collaborations.page';
import { signOut } from "next-auth/react"

import { Editor, Quill } from '../../components/Editor';


export default function Dashboard({ _projects, _media, _collaborations }) {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const router = useRouter()
  const { panel, collabPanel, frontPanel } = useSelector(x => x)

  async function logout(e) {
    e.preventDefault()
    try {
      const data = await axios.post("api/account/logout")
      if (data) {
        router.push('/')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="admin-container">

      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {panel && <ProjectPanel />}
      {collabPanel && <CollabPanel />}
      {frontPanel && <FrontPagePanel _media={_media} />}


      <Projects projects={_projects} />
      <hr data-dashed />
      <Collaborations collaborations={_collaborations} />

      <article>
        <article className="admin-actions">
          <button
            className={'rounded-full  w-[35px] h-[35px] pl-[5px] bg-[gold]'}
            style={{ flex: '0 0 auto' }}
            onClick={() => signOut()}
          />
          <button
            style={{ flex: '0 1 auto' }}
            className={'rounded-full'}
            onClick={() => (dispatch({ type: "SET_FRONT_PANEL", payload: !frontPanel }))}
          >
            Edit homepage
          </button>

          <button
            style={{ flex: '0 1 auto' }}
            className={'rounded-full'}
            onClick={() => {
              dispatch({ type: "SET_COLLAB_PANEL", payload: !collabPanel })
              dispatch({ type: "SET_PROJECT" })
            }
            }
          >
            Create New Collab
          </button>

          <button
            style={{ flex: '0 1 auto' }}
            className={'rounded-full'}
            onClick={() => {
              dispatch({ type: "SET_PANEL", payload: !panel })
              dispatch({ type: "SET_PROJECT" })
            }
            }
          >
            Create New Project
          </button>
        </article>

      </article>

    </div>
  )
}

export async function getServerSideProps(req) {

  const session = await getSession({ req: req.req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const baseURI = process.env.NODE_ENV=== 'production' ? "https://annapapadopoulou.me" : 'http://localhost:3000'

  const projects = await axios.get(baseURI + '/api/project')
  const collaborations = await axios.get(baseURI + '/api/collab')
  const media = await axios.get(baseURI + '/api/media')

  return {
    props: {
      _projects: projects.data || [],
      _collaborations: collaborations.data || [],
      _media: media.data[0] || { name: '', images: [] }
    }
  }
}