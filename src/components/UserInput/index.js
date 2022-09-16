import './style.css';
import axios from 'axios';
import { useState } from 'react'
import { Button, Image } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
// import { Alert, AlertIcon } from '@chakra-ui/react'

export default function UserInput() {
  // API Endpoint
  const BASEURL = 'https://pokeapi.co/api/v2/pokemon/';

  // TODO: Estudar mais sobre useState()
  const [pokemonData, setPokemonData] = useState();
  // const [showAlert, setShowAlert] = useState(false);

  function getUserInputValue (pokemonName) {
    const POKEMON = pokemonName.target[0].value;
    const URL = BASEURL + POKEMON.toLowerCase();
    console.log(pokemonName); // Retirar ao finalizar projeto
    
    // FIXME: Modificar error case - substituir o window.alert por um pop-up na página
    if (!POKEMON) {
      window.alert("Insira o nome de algum pokémon!");
      return pokemonName.preventDefault();
    };

    axios.get(URL).then((response) => {
      setPokemonData(response.data);
      console.log(pokemonData); // Retirar ao finalizar projeto
    }).catch(() => {
      // FIXME: Modificar error case - substituir o window.alert por um pop-up na página
        // FIXME: Devo continuar a utilizar o useState() para esse propósito?
      // setShowAlert(true)
      window.alert("Este não é um pokémon :(");
    });

    pokemonName.preventDefault();
  };

  return(
      <main id="titleAndInput">
        <img src="/assets/images/Pokeinfo.png" alt="PokeInfo"/>

        <form id="inputAndButton" onSubmit={getUserInputValue}>
          {/* FIXME: Alterar design para melhorar o contraste */}
          <Input id="userInput" type="text" placeholder="Nome do Pokémon"/>
          <Button id="search" type="submit" variant="outline">Catch!</Button>
        </form>

        {/*TODO: Transformar o card num componente para tornar o código mais readable*/}

        {pokemonData ? 
          <Box id="card">
            <p id="pokemonName">{pokemonData.name}</p>
            <p id="pokemonId">#{pokemonData.id}</p>
            <p id="pokemonType">{pokemonData.types.map(types => types.type.name).join(' ')}</p>
            <Image id ="pokemonImage" src={pokemonData.sprites.front_default}/>
          </Box> 
        : <></>}

        {/* Possível solução: utilizar useState() para lidar com o error case de pokemon inexistente.
        fonte: https://stackoverflow.com/questions/72209574/how-to-display-the-chakra-ui-alert#comment127580507_72209574 */}

        {/* <>
        {showAlert && (
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' mt='20'>
            <Alert status="warning">
              <AlertIcon/>
              Este pokemon não existe :(
            </Alert>
          </Box>
        )}
        </> */}
        
      </main>
  ); 
};