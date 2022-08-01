import React, { useState } from "react";
import Axios from "axios";
import styled from 'styled-components';
import MovieComponent from './components/Moviecomponents';
import MovieInfoComponents from './components/MovieInfoComponent';

export const API_KEY='65297a34' ;

const Container=styled.div`
display:flex;
flex-direction: column;
`;
const Header=styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
background-color:skyblue;
color:white;
align-items: centre;
padding:15px;
font-size: 30px;
font-weight: bold;
box-shadow:0 5px 6px 0 #555;
`;
const AppName=styled.div`
display:flex;
flex-direction: column;
align-items: centre;
`;
const MovieImg=styled.img`
width:60px;
height:50px;
margin:10px;
`;
const SearchBox=styled.div`
display:flex;
flex-direction: row;
padding: 10px 10px;
background-color:white;
border-radius:6px;
margin-left: 20px;
width:50%;
background-color:white;
align-items: centre;
`;
const SearchImg=styled.img`
width:32px;
height:32px;
`;
const SearchInput=styled.input`
color:black;
font-size: 25px;
font-weight:bold;
border: none;
outline:none;
margin-left: 15px;
`;
const  MovieListContainer=styled.div`
display:flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 24px;
justify-content: space-evenly;
`;
const Placeholder=styled.img`
width:120px;
height:120px;
margin:150px;
opacity: 50%;
`;
function App() {
  const [searchQuery, updateSearchQuery]= useState("");
  const [timeoutId, updateTimeoutId]=useState();
  const [movieList, updatemovieList]=useState([]);
  const [selectedMovie, onMovieSelect]=useState();

  const fetchData=async(searchString)=>{
   const response=await Axios.get(
    `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
      updatemovieList(response.data.Search);
  };
  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout=setTimeout(()=>fetchData(event.target.value),500);
    updateTimeoutId(timeout);
  };
 
  return (
    <Container>
      <Header>
      <AppName>
      <MovieImg src="/movie-icon-2.png" />
      Movie Info</AppName>
      <SearchBox>
      <MovieImg src="/searchicon.jpg" />
      <SearchInput placeholder="Search Movie name for Info."
       value={searchQuery} 
       onChange={onTextChange}/>
      </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponents 
        selectedMovie={selectedMovie}
      onMovieSelect={onMovieSelect}
      />
      )}
      <MovieListContainer>
      {movieList?.length
        ?movieList.map((movie, index)=>(
          <MovieComponent key={index} movie={movie}
          onMovieSelect={onMovieSelect} 
          />
          ))
        :<Placeholder src='/movie-icon-2.png'/>}
      </MovieListContainer>
      </Container>
  );
}

export default App;
