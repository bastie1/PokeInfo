import './style.css';
import axios from 'axios';
import { Button, Image } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useState } from 'react'

export default function UserInput() {
  const BASEURL = 'https://pokeapi.co/api/v2/pokemon/';

  // TODO: Estudar useState()
  const [pokemonData, setPokemonData] = useState()

  function getInputValue (e) {
    const POKEMON = e.target[0].value
    const URL = BASEURL + POKEMON.toLowerCase();
    
    // FIXME: Modificar error case - substituir o window.alert por um pop-up na página
    POKEMON ? console.log(POKEMON) : window.alert("Insira algum pokemon")

    axios.get(URL).then((res) => {
      setPokemonData(res.data)
      console.log(pokemonData);
  }).catch(() => {
      // FIXME: Modificar error case - substituir o window.alert por um pop-up na página
      window.alert("Este pokemon não existe :(");
  });

    e.preventDefault();
  }

  return(
    <div>
      <main id="titleAndInput">
        <img src="/assets/images/Pokeinfo.png" alt="PokeInfo"/>

        <form id="inputAndButton" onSubmit={getInputValue}>
          {/* FIXME: Alterar design para melhorar o contraste */}
          <Input id="userInput" type="text" placeholder="Nome do Pokemon"/>
          <Button id="search" type="submit" variant="outline">Catch!</Button>
        </form>
        {/*TODO: Transformar o card num componente para tornar o código mais readable?
          *TODO: Incluir demais atributos do pokemon no card*/}
        {pokemonData ? 
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' mt='10'>
            <Image src={pokemonData.sprites.front_default}/>
          </Box> 
        : <></>}
        
      </main>
    </div>
  ) 
}