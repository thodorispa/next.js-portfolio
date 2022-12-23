import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  if (!props.new) {
    return (
      <div
        ref={setNodeRef}
        className={'sortable-item'}
        style={{ ...props.style, ...style }}
      >
        <button
          {...attributes}
          {...listeners}
          className={'sortable-handle'}
          style={props.dragHandleStyle}
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </button>
        {props.children}
      </div>
    );
  } else {
    return (
      <div
        ref={setNodeRef}
        className={'sortable-item'}
        style={{ ...props.style, ...style }}
      >
        

        {props.children}
      </div>
    )
  }
}