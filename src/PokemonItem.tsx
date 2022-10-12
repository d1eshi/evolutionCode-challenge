import { Box, CloseButton, Image, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { SmallPokemon } from '../interfaces/pokemon-list'
import { usePokemonContext } from './PokemonContext'

interface IPokemon {
  forms: {
    name: string
  }
  sprites: {
    front_default: string
  }
}

interface Props {
  pokemon: SmallPokemon
}

export const PokemonItem: FC<Props> = ({ pokemon }) => {
  const { dispatch } = usePokemonContext()

  const handleRemovePokemon = () => {
    dispatch({ type: 'REMOVE_SINGLE_POKEMON', payload: pokemon.id })
  }

  return (
    <Box
      border='1px solid gray'
      borderRadius={10}
      position='relative'
      p='6px'
      display='flex'
      flexDir='column'
      maxW='20%'
      justifyContent='center'
    >
      <CloseButton
        onClick={handleRemovePokemon}
        _hover={{
          background: 'teal',
          color: '#eee',
        }}
        position='absolute'
        css={{ top: 0, right: 0 }}
      />
      <Box mt='1em'>
        <Image w='100%' h='100%' src={pokemon.image} />
      </Box>
      <Text textTransform='capitalize' fontWeight='bold'>
        {pokemon.name}
      </Text>
    </Box>
  )
}
