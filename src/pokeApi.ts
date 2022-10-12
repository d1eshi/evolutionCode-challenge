import axios from 'axios'

interface PokemonList {
  results: {
    name: string
    url: string
  }
}

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export default pokeApi

// export const getListOfPokemons = async (offSet: string, limit: string) => {
//   const { data } = await axios.get<PokemonList[]>(`https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`)
//   return data.
// }

// export const getSinglePokemon = async (url: string) => {
//   const { data } = await axios.get(url)
//   console.log(data)
// }
