import * as React from 'react'
import { SmallPokemon } from '../interfaces/pokemon-list'

type Action =
  | { type: 'ADD_TO_POKEMON_LIST'; payload: SmallPokemon[] }
  | { type: 'REMOVE_SINGLE_POKEMON'; payload: number }
type Dispatch = (action: Action) => void
type State = { pokemons: SmallPokemon[] }
type PokemonProviderProps = { children: React.ReactNode }

const PokemonContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function PokemonReducer(state: State, action: Action) {
  console.log({ action })

  switch (action.type) {
    case 'ADD_TO_POKEMON_LIST': {
      return { ...state, pokemons: action.payload }
    }
    case 'REMOVE_SINGLE_POKEMON': {
      return { ...state, pokemons: state.pokemons.filter(poke => poke.id !== action.payload) }
    }

    default:
      throw new Error(`Unhandled action`)
  }
}

function PokemonProvider({ children }: PokemonProviderProps) {
  const [state, dispatch] = React.useReducer(PokemonReducer, { pokemons: [] })

  const value = { state, dispatch }

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}

function usePokemonContext() {
  const context = React.useContext(PokemonContext)
  if (context === undefined) {
    throw new Error('usePokemon must be used within PokemonProvider')
  }
  return context
}

export { PokemonProvider, usePokemonContext }
