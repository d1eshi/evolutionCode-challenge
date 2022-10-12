import React, { FC } from 'react'

interface IPokemon {
  forms: {
    name: string
  }
  sprites: {
    front_default: string
  }
}

interface Props {
  pokemon: IPokemon
}

export const PokemonItem: FC<Props> = ({ pokemon }) => {
  return <h1>{pokemon.forms.name}</h1>
}
