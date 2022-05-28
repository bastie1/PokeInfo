export default function Grid(){
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
  const pokemons = ["ditto", "aggron", "abra", "aipom", "appletun"]
  const [pokemonDataState, setPokemonDataState] = useState([])

  let array = []
  if(!(pokemonDataState !== [])){
      Promise.all(pokemons.map((pokemon)=>{
          const URL = baseURL + pokemon
          axios.get(URL).then((res)=>{
            array.push(res.data)
          })
        })).then(()=>{
          setPokemonDataState(array)
        })
  }
  

  console.log(pokemonDataState)

  return(
    <div>
      {
        pokemonDataState.map((pokemon)=>{
          return(
            <div>
              <p>{pokemon.name}</p>
              <p>{pokemon.height}</p>
            </div>
          )
        })
      }
    </div>
  )
}