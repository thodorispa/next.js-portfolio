import Image from 'next/image'
import axios from "axios";
import cloneDeep from 'lodash.clonedeep'
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filesToDataUrl } from "../helpers/helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import isEqual from "lodash.isequal"
import Spinner from "./Spinner"

import { SortableItem } from "./SortableItem";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';


const defaultProject = {
  id: -1,
  title: "",
  subTitle: "",
  description: "",
  images: [],
  active: true
};

import { useQuill } from 'react-quilljs';

export default function CollabPanel() {

  const { quill, quillRef } = useQuill();

  const dispatch = useDispatch();
  const { collabPanel } = useSelector(x => x)
  const { project } = useSelector(x => x)

  const [originalProject, setOriginalProject] = useState(cloneDeep(project) || defaultProject);
  const [editedProject, setEditedProject] = useState(cloneDeep(project) || defaultProject);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (quill) {
      quill.on('text-change', function (delta, oldDelta, source) {
        if (source === 'user') {
          setEditedProject({ ...editedProject, description: quill.root.innerHTML })
          // show description in the editor of quill

        }
      });
    }
  }, [quill, editedProject]);

  const accept = ['image/jpeg', 'image/png']
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleFileChange = (e) => {
    const input = e.target.files;
    filesToDataUrl(input, 0, accept, (images) => {
      setEditedProject({ ...editedProject, images: updateImageIndexes([...(editedProject?.images || []), ...images]) })
    })
  }

  const handleUpload = async () => {
    setIsLoading(true)

    if (!isEqual(originalProject, editedProject)) {
      try {
        if (editedProject?.id === -1) {
          const { data } = await axios.post('/api/collab/upload', editedProject)
          setOriginalProject(cloneDeep(data.collaboration));
          setEditedProject(cloneDeep(data.collaboration));
        } else {
          const { data } = await axios.post('/api/collab/update', editedProject)
          setOriginalProject(cloneDeep(data.collaboration));
          setEditedProject(cloneDeep(data.collaboration));
        }

        dispatch({ type: 'PING' })
        setTimeout(() => {
          setIsLoading(false)
        }
          , 1000);
      } catch (error) {
        setIsLoading(false)
        setError(error.response?.data)
        console.log(error);
      }
    }
  }

  function updateImageIndexes(images) {
    const _ = [...images]
    for (let i = 0; i < _.length; i++) {
      _[i].index = i;
    }
    return _
  }

  function handleDragEnd(e) {
    const { active, over } = e
    try {
      if (active.id !== over.id) {
        setEditedProject((editedProject) => {
          const activeImage = editedProject?.images.find(n => n.url === active.id)
          const oldIndex = editedProject?.images.indexOf(activeImage);
          const overImage = editedProject?.images.find(n => n.url === over.id)
          const newIndex = editedProject?.images.indexOf(overImage);

          return { ...editedProject, images: updateImageIndexes(arrayMove(editedProject?.images, oldIndex, newIndex)) }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageDelete(index) {
    const _ = [...(editedProject?.images || [])]
    _.splice(index, 1)
    setEditedProject({ ...editedProject, images: updateImageIndexes(_) })
  }

  return (
    <div className={`panel ${collabPanel ? '' : 'hidden'}`}>
      <header>
        <h1>{project._id ? "Edit collab" : "Create new collab"}</h1>
        <label className="switch">
          <input
            className='switch'
            type='checkbox'
            checked={editedProject?._id ? editedProject?.active : true}
            value={editedProject?._id ? editedProject?.active : true}
            onChange={() => setEditedProject({ ...editedProject, active: !editedProject?.active })}
          />
          <span className="slider round"></span>
        </label>
      </header>

      <main style={{ width: 'calpoc(100% - 100px)' }}>

        {/* Title */}
        <section className="fw">
          <h2>Title</h2>
          <input
            style={{ backgroundColor: 'white' }}
            type='text'
            value={editedProject?.title}
            onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
          />
        </section>

        <div className="spacer" />

        {/* Title */}
        <section className="fw">
          <h2>Sub Title</h2>
          <input
            style={{ backgroundColor: 'white' }}
            type='text'
            value={editedProject?.subTitle}
            onChange={(e) => setEditedProject({ ...editedProject, subTitle: e.target.value })}
          />
        </section>

        <div className="spacer" />

        {/* Description */}
        <section className="fw">
          <h2>Description</h2>
          <div ref={quillRef}></div>
        </section>

        <div className="spacer" />

        {/* Media */}
        <section className="fw">
          <article>

            <h2>Images</h2>
            <div className="spacer" />

            {editedProject?.images && editedProject?.images.length > 0 ? (
              <button
                className="positive negative"
                style={{ padding: '0px 5px' }}
                onClick={() => {
                  const c = confirm("Are you sure you want remove uploaded files?")
                  if (c) {
                    setEditedProject({ ...editedProject, images: [] })
                  }
                }}
              >
                Clear media
              </button>
            ) : null}
          </article>

          <div className="spacer" />

          <section
            className='fw group'
            style={{
              justifyContent: 'flex-start'
            }}
          >
            <article>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={editedProject?.images?.map(n => n.url)}
                  strategy={rectSortingStrategy}
                >
                  <section>

                    {editedProject?.images?.map((n, i) => (
                      <article key={i}>
                        <SortableItem
                          key={n.url}
                          id={n.url}
                          new={editedProject?.id === -1 ? true : false}
                          removable={true}
                          style={{
                            position: 'relative',
                            margin: '2.5px',
                            width: '140px',
                            height: '140px',
                          }}
                          dragHandleStyle={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                          }}
                        >
                          <Image
                            draggable={false}
                            priority
                            src={n.objectUrl ? n.objectUrl : n.url}
                            alt={n.alt || ''}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                            width={n.width}
                            height={n.height}
                            unoptimized={() => { n.objectUrl }}
                          />
                          <button
                            className="negative"
                            style={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                              flex: '0 0 16px',
                              width: '16px',
                              height: '16px',
                              color: 'tomato',
                              padding: '0',
                              border: '0',
                              backgroundColor: 'transparent',
                              transition: 'none',
                              transform: 'none',
                            }}
                            onClick={() => handleImageDelete(i)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>

                        </SortableItem>

                        <section >
                          {/* <Quill
                            value={{ ...n }.caption || ''}
                            onChange={(e) => {
                              const _ = [...(editedProject?.images || [])]
                              _.splice(i, 1, { ...n, caption: e })
                              setEditedProject({ ...editedProject, images: _ })
                            }}
                             /> */}
                          <textarea
                            type="text"
                            rows={2}
                            cols={30}
                            placeholder='Caption'
                            value={{ ...n }.caption || ''}
                            onChange={(e) => {
                              const _ = [...(editedProject?.images || [])]
                              _.splice(i, 1, { ...n, caption: e.target.value })
                              setEditedProject({ ...editedProject, images: _ })
                            }}
                          />
                          <div className='spacer'></div>
                          <textarea
                            type="text"
                            rows={2}
                            cols={30}
                            value={{ ...n }.alt || ''}
                            onChange={(e) => {
                              const _ = [...(editedProject?.images || [])]
                              _.splice(i, 1, { ...n, alt: e.target.value })
                              setEditedProject({ ...editedProject, images: _ })
                            }}
                            placeholder='Alt text'
                          />
                        </section>
                      </article>

                    ))}
                  </section>
                </SortableContext>
              </DndContext>



            </article>

            <label
              htmlFor='file-input'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
                height: '100px',
                border: '2px dashed black',
                textAlign: 'center',
                fontSize: '32px',
                padding: '10px 12px',
                margin: '2.5px',
                cursor: 'pointer',
                color: 'var(--pb-primary-color)',
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </label>

            <input
              id={'file-input'}
              type='file'
              // disabled={hasDrag}
              multiple={true}
              accept={accept.join()}
              name='new-files'
              style={{
                width: 0,
                height: 0,
                opacity: 0,
                padding: 0,
                margin: 0,
                visibility: 'hidden',
                overflow: 'hidden',
              }}
              onChange={e => handleFileChange(e)}
            />
          </section>
        </section>



        <div className="spacer" />
      </main>

      {/* Buttons */}
      <footer>

        <article>
          <button
            className="positive negative"
            onClick={() =>

              dispatch({ type: "SET_COLLAB_PANEL", payload: !collabPanel })}
          >
            Close
          </button>
          <div className="spacer" />

          {editedProject?._id ? (
            <button
              className="negative"
              style={{ background: 'tomato' }}
              onClick={() => {
                const c = confirm('Are you sure you want to delete this collab?')
                if (!c) return
                axios.post('/api/collab/delete', { id: editedProject?._id })
                dispatch({ type: "SET_COLLAB_PANEL", payload: false })
              }}
            >
              Delete
            </button>
          ) : ''}
        </article>

        <h5 className={'text-red-600'}>{error}</h5>

        <article>
          {isLoading ? <Spinner /> :
            (
              <>
                {
                  originalProject.id === -1 ? (
                    <button
                      className="positive primary"
                      disabled={isLoading}
                      onClick={(e) => handleUpload(e)}
                    >
                      Create
                    </button>
                  ) : (
                    <button
                      className="positive primary"
                      disabled={isLoading}
                      style={{ display: isEqual(originalProject, editedProject) ? 'none' : 'block' }}
                      onClick={(e) => handleUpload(e)}
                    >
                      Update
                    </button>
                  )
                }
              </>
            )
          }
        </article>
      </footer>
    </div>
  )
}


