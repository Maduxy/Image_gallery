import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// import { Card } from 'react-bootstrap'
import styled from "styled-components";

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id:props.id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return(
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
        <Card >
            <img src={props.image} alt={props.id} />
            <p><b>{props.tags}</b></p>
        </Card>
    </div>
  )
}
const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-style: ridge;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  height:100%;
  width: 300px; /* Set a constant width */
  max-width: 100%; /* Ensure it doesn't exceed the container's width */

  img {
    border-radius: 1rem;
    width: 100%;
    height:100%;
    max-height: 200px; /* Set a max height for the image */
    object-fit: cover; /* Maintain aspect ratio */
  }

  a {
    text-decoration: none;
  }

  p {
    text-align: center;
    padding: 1rem;
    width: 200px; /* Set a fixed width for the h3 element */
    height: 80px; /* Set a fixed height for the h3 element */
    overflow: hidden; /* Hide overflowing content */
    white-space: wrap; /* text wrapping */
    
    text-overflow: ellipsis; /* Show ellipsis (...) for long text */
  }
`;



export default SortableItem