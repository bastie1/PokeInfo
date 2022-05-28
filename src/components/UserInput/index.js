import './style.css';
import axios from 'axios';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

export default function UserInput() {
  const BASEURL = 'https://pokeapi.co/api/v2/pokemon/';
  const POKEMONS = ['ditto', 'charmander', 'bulbasaur', 'gardevoir', 'abra'];

  let pokemonData = [];
    // Esse array foi criado com o propósito de armazenar os dados extraídos da
    // API, para que seja possível acessá-los no escopo global do código. Ou seja,
    // é possível acessar os dados solicitados de fora da função que cumpre esse
    // papel.
  //FIXME: Estudar async, promises e closures para solicitar os dados da API
  POKEMONS.forEach((POKEMON) => { 
    const URL = BASEURL + POKEMON;
    axios.get(URL).then((res) => {
      // console.log(res.data);
        // Acessando dados de cada pokemon
      pokemonData.push(res.data);
      console.log(pokemonData); 
      // Terceiro retorno no console:
      // [{...}]; [{...}, {...}]; [{...}, {...}, {...}]; [{...}, {...}, {...}, 
      // {...}] ... [{...} * 5]
    })
    console.log(pokemonData); // [] * 5
      // Primeiro retorno no console
  })

  console.log(pokemonData); // [] * 2
    // Segundo retorno no console

  return(
    <div>
      <main id="titleAndInput">
        <img src="/assets/images/Pokeinfo.png" alt="PokeInfo"/>

        <div id="inputAndButton">
          <Input id="userInput" type="text" placeholder="Nome do Pokemon"/>
          <Button type="button" id="search" variant="outline">Catch!</Button>
        </div>
      
      </main>
    </div>
  ) 
}