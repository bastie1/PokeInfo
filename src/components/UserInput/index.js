import './style.css';
import axios from 'axios';
import { useState } from 'react'
import { Button, Image } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Alert, AlertIcon } from '@chakra-ui/react'

export default function UserInput() {
  const BASEURL = 'https://pokeapi.co/api/v2/pokemon/';

  // TODO: Estudar useState()
  const [pokemonData, setPokemonData] = useState()
  const [showAlert, setShowAlert] = useState(false)

  function getInputValue (pokemonName) {
    const POKEMON = pokemonName.target[0].value
    const URL = BASEURL + POKEMON.toLowerCase();
    console.log(pokemonName)
    
    // FIXME: Modificar error case - substituir o window.alert por um pop-up na página
    if (!POKEMON) {
      window.alert("Insira o nome de algum pokemon!")
      return pokemonName.preventDefault()
    }

    axios.get(URL).then((res) => {
      setPokemonData(res.data)
      console.log(pokemonData);
  }).catch(() => {
      // FIXME: Modificar error case - substituir o window.alert por um pop-up na página
      // TODO: Devo continuar a utilizar o useState() para esse propósito?
      // setShowAlert(true)
      window.alert("Este pokemon não existe :(")
  });

    pokemonName.preventDefault();
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

        {/* Possível solução encontrada no stackoverflow: utilizar useState() para
        lidar com o error case de pokemon inexistente.
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
    </div>
  ) 
}