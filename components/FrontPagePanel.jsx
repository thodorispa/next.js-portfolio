import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { filesToDataUrl } from "../helpers/helpers";
import { SortableItem } from "./SortableItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner"

import isEqual from "lodash.isequal"

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

export default function FrontPagePanel({ _media }) {
  const dispatch = useDispatch();
  const { frontPanel } = useSelector(x => x)

  const [media, setMedia] = useState(_media);
  const [editedMedia, setEditedMedia] = useState(_media);
  const [isLoading, setIsLoading] = useState(false);


  const accept = ['image/jpeg', 'image/png']
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setMedia(_media);
    setEditedMedia(_media);
  }, [_media])

  const onUpdate = async () => {
    setIsLoading(true);
    if (!isEqual(media, editedMedia)) {
      try {
        await axios.post('/api/media/update', editedMedia)

        setMedia(editedMedia);

        setTimeout(() => {
          setIsLoading(false)
        }
          , 1000);
      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }
    }
  }

  const handleFileChange = (e) => {
    filesToDataUrl(e.target.files, 0, accept, (images) => {
      setEditedMedia({ ...editedMedia, images: updateImageIndexes([...(editedMedia?.images || []), ...images]) })
    })
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

    if (active.id !== over.id) {
      setEditedMedia((editedMedia) => {
        const activeImage = editedMedia?.images.find(n => n.url === active.id)
        const oldIndex = editedMedia?.images.indexOf(activeImage);
        const overImage = editedMedia?.images.find(n => n.url === over.id)
        const newIndex = editedMedia?.images.indexOf(overImage);

        return { ...editedMedia, images: updateImageIndexes(arrayMove(editedMedia?.images, oldIndex, newIndex)) }
      })
    }
  }

  function handleImageDelete(index) {
    const _ = [...(editedMedia?.images || [])]
    _.splice(index, 1)
    setEditedMedia({ ...editedMedia, images: updateImageIndexes(_) })
  }

  return (
    <div className={`panel ${frontPanel ? '' : 'hidden'}`}>
      <header>
        <h1>Manage Front Page Media</h1>
      </header>

      <main style={{ width: 'calpoc(100% - 100px)' }}>

        <div className="spacer" />

        {/* Media */}
        <section className="fw">
          <article>

            <h2>Images</h2>
            <div className="spacer" />


            {media.images && media.images.length > 0 ? (
              <button
                className="positive negative"
                style={{ padding: '0px 5px' }}
                onClick={() => {
                  const c = confirm("Are you sure you want remove uploaded files?")
                  if (c) {
                    setEditedMedia({ ...media, images: [] })
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
                  items={editedMedia?.images?.map(n => n.url)}
                  strategy={rectSortingStrategy}
                >
                  <section>

                    {editedMedia?.images?.map((n, i) => (
                      <article key={i}>
                        <SortableItem
                          key={n.url}
                          id={n.url}
                          new={editedMedia?.id === -1 ? true : false}
                          removable={true}
                          style={{
                            position: 'relative',
                            margin: '2.5px',
                            width: '130px',
                            height: '120px',
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
                          <textarea
                            type="text"
                            rows={2}
                            cols={30}
                            placeholder='Caption'
                            value={{ ...n }.caption || ''}
                            onChange={(e) => {
                              const _ = [...(editedMedia?.images || [])]
                              _.splice(i, 1, { ...n, caption: e.target.value })
                              setEditedMedia({ ...editedMedia, images: _ })
                            }}
                          />
                          <div className='spacer'></div>
                          <textarea
                            type="text"
                            rows={2}
                            cols={30}
                            value={{ ...n }.alt || ''}
                            onChange={(e) => {
                              const _ = [...(editedMedia?.images || [])]
                              _.splice(i, 1, { ...n, alt: e.target.value })
                              setEditedMedia({ ...editedMedia, images: _ })
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

      <footer>
        <button
          className="positive negative"
          onClick={() => dispatch({ type: "SET_FRONT_PANEL", payload: !frontPanel })}
        >
          Close
        </button>

        <article>

          {isLoading ? <Spinner /> :
            (
              <>
                {!isEqual(media, editedMedia) ? (
                  <button
                    className="positive primary"
                    disabled={isLoading}
                    onClick={onUpdate}
                  >
                    Update
                  </button>
                ) : ''}
              </>
            )
          }



        </article>
      </footer>
    </div>

  )
}