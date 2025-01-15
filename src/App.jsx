import { useState, useEffect } from 'react';
import Card from './Card';

function App() {
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getImages = () => {
      const numArr = new Set();
      while (numArr.size < 12) {
        numArr.add(Math.floor(Math.random() * 100 + 1));
      }

      const urls = Array.from(numArr).map(
        (num) => `https://pokeapi.co/api/v2/pokemon/${num}/`
      );

      const fetchPokemonData = async () => {
        try {
          const pokemonData = await Promise.all(
            urls.map((url) => fetch(url).then((response) => response.json()))
          );
          const newPokemonInfo = pokemonData.map((data) => ({
            id: data.id,
            url: data.sprites.other['official-artwork'].front_default, // Correct URL
          }));
          setPokemonInfo(newPokemonInfo);
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
        } finally {
          setLoading(false); // Set loading to false whether successful or failed
        }
      };

      fetchPokemonData();
    };

    getImages();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading Pokémon...</div>
      ) : (
        <Card imagesJson={pokemonInfo} />
      )}
    </>
  );
}


export default App;
