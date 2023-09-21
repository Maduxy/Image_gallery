import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'react-bootstrap';
import {
DndContext,closestCenter
} from "@dnd-kit/core";
import {arrayMove, SortableContext, rectSortingStrategy,verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useEffect, useState } from 'react';
import styled from "styled-components";
import SortableItem from '../components/SortableItem';

import { FaSearch } from "react-icons/fa";
import LoadingIndicator from '../components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { database } from '../firebase';


function Home() {
  const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state
    const history = useNavigate();
    const handleClick =() => {
      signOut(database).then(val => {
        console.log(val,"val")
        history('/')
      })
    }
    useEffect(() => {
      const getSearched = async () => {
        try {
          const api = await fetch(`https://pixabay.com/api/?key=39567008-3577e069d144db698761998dd&order=popular&per_page=40`);
          const order = await api.json();
          setImages(order.hits);
          console.log(order.hits)
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };

      getSearched();
    }, []);

    function handleDragEnd(event) {
      const { active, over } = event;

      if (active.id !== over.id) {
        setImages((images) => {
          const oldIndex = images.findIndex((image) => image.id === active.id);
          const newIndex = images.findIndex((image) => image.id === over.id);

          const newImages = [...images];
          newImages.splice(oldIndex, 1);
          newImages.splice(newIndex, 0, images.find((image) => image.id === active.id));

          return newImages;
        });
      }
    }

    const filterImages = () => {
      if (!searchQuery) {
        return images; // Return all images
      }
      else {
      return images.filter((image) =>
        image.tags.toLowerCase().includes(searchQuery.toLowerCase())
      );}
    };
    const submitHandler = (e) => {
      e.preventDefault();
    }

    return (
      <div>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Header>
              <h2>The Best Image Gallery</h2>
              <button onClick={handleClick}> Log Out</button>
            </Header>
            <FormStyle onSubmit={submitHandler}>
              <div>
                <FaSearch></FaSearch>
                <input
                type="text"
                placeholder="Search by tags"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </FormStyle>
            <Container>
              <SortableContext
                items={filterImages().map((image) => image.id)}
                strategy={verticalListSortingStrategy}
              >
                {filterImages().map((image) => (
                  <SortableItem key={image.id} id={image.id} image={image.previewURL} tags={image.tags} />
                ))}
              </SortableContext>
            </Container>
          </DndContext>
        )}
      </div>
    );
  }


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 3rem;
  margin: 2rem;
  justify-items: center; /* Horizontally center items */
  align-content: flex-start; /* Vertically align items at the top */

  @media screen and (max-width:600px ){
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 2rem;
    margin: 2.5rem;
    justify-items: center; /* Horizontally center items */
    align-content: flex-start; /* Vertically align items at the top */
  }
  
`;
const FormStyle =styled.form`
    margin: 3rem 7rem 5rem 7rem;
    div{
        width: 100% ;
        position: relative;
    }
    input {
        border: none;
        background:linear-gradient(35deg,#494949,#393939) ;
        color: white;
        font-size: 1rem;
        padding: 1rem 3rem;
        border-radius: 1rem;
        outline: none;
        width: 100% ;
      }

    svg{
        position: absolute;
        color: white;
        top: 50%;
        left: 0%;
        transform: translate(100%,-50%);
    }

    @media screen and (max-width:600px ){
      margin: 2rem 3rem 2rem 3rem;
    div{
        width: 100% ;
        position: relative;
    }
    }

`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem 0.5rem 3rem;

  button{
    padding: 1rem 2rem;
    border-radius: 2rem;
    background:linear-gradient(35deg,#494949,#393939) ;
    color: white
  }
  @media screen and (max-width:600px ){
    display: column;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem 1rem 0.5rem;

    button{
      display: inline-flex;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      background:linear-gradient(35deg,#494949,#393939) ;
      color: white;
      font-size: 16px;
    }
  }
`
export default Home;