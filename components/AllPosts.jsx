import Head from 'next/head'
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

export default function AllPosts({ projects }) {
  const dispatch = useDispatch();
  const { panel } = useSelector(x => x)
  const { frontPanel } = useSelector(x => x)

  return (
    <>
      <div className={'w-full flex flex-col p-4 min-h-[92vh] justify-center items-center'}>

        <button className={'rounded-full'} onClick={e => (dispatch({ type: "SET_PANEL", payload: !panel }))}> Create New</button>


        <button className={'rounded-full'} onClick={e => (dispatch({ type: "SET_FRONT_PANEL", payload: !frontPanel }))}> Edit front page photos</button>

        <p className={'flex'}>POSTS</p>

        {projects.map((project, i) => (
          <div key={i} className={'flex flex-col'}>
            <p>{project.title}</p>
            <div dangerouslySetInnerHTML={{__html:project.description}}></div>
              </div>
        ))}

      </div>
    </>
  )
}


