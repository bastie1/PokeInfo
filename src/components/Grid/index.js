import './style.css';
import axios from 'axios';
import { useState } from 'react';

export default function Grid() {
  const BASEURL = 'https://pokeapi.co/api/v2/pokemon/';
  const POKEMONS = ['ditto', 'charmander', 'bulbasaur', 'gardevoir', 'abra'];

  let pokemonData = [];
    // Esse array foi criado com o propósito de armazenar os dados extraídos da API, para que seja possível
    // acessá-los no escopo global do código. Ou seja, é possível acessar os dados solicitados de fora da função
    // que cumpre esse papel.
  POKEMONS.forEach((POKEMON) => { 
    const URL = BASEURL + POKEMON;
    axios.get(URL).then((res) => {
      // console.log(res.data);
        // Acessando dados de cada pokemon
      pokemonData.push(res.data);
      console.log(pokemonData); // [{...}]; [{...}, {...}]; [{...}, {...}, {...}]; [{...}, {...}, {...}, {...}] ... [{...} * 5]
        // Terceiro retorno no console
    })
    console.log(pokemonData); // [] * 5
      // Primeiro retorno no console
  })

  console.log(pokemonData); // [] * 2
    // Segundo retorno no console

  return(
    <div>
      <h1>PokeInfo</h1>
    </div>
  ) 
}