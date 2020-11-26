import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';


// API with useState
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

// useEffect with cancel
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.prev)
      setPokemon( res.data.results.map(p => p.name))
     });

     return () => cancel()  
  }, [currentPageUrl]);

// go to next page and go to previous page
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  };
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  };

// Simple loading... text
  if (loading) return "Loading..."

// Next and Previous Page(Pagination)
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

    export default App;
