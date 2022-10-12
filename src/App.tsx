import './App.css'
import React from 'react'
import { Alert, AlertIcon, AlertTitle, Box, Button, FormControl, HStack, Input, Skeleton, Text } from '@chakra-ui/react'
import pokeApi from './pokeApi'

enum TypeParams {
  offSet = 'offSet',
  limit = 'limit',
}

const INITIAL_PARAMS = {
  offSet: '',
  limit: '',
}

function App() {
  const [params, setParams] = React.useState(INITIAL_PARAMS)
  const [messages, setMessages] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [pokemonList, setPokemonList] = React.useState([])

  const getPokemonsAPI = async () => {
    console.log('called API', params)

    if (params.limit === '' && params.offSet === '') {
      console.log('called first conditional')

      return setMessages('Necesitas ingresar parametros para buscar')
    }

    if (params.limit === '') {
      return setMessages('Necesitas un límite antes de buscar.')
    } else if (params.offSet === '') {
      return setMessages('Necesitas offset antes de buscar.')
    }
    setMessages('')
    setIsLoading(true)

    const { data } = await pokeApi.get(`/pokemon?offset=${params.offSet}&limit=${params.limit}`)
    setPokemonList(data.results)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submittt!!!')

    e.preventDefault()
    getPokemonsAPI()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, typeParams: TypeParams) => {
    switch (typeParams) {
      case 'offSet':
        return setParams({ ...params, offSet: e.target.value })

      case 'limit':
        return setParams({ ...params, limit: e.target.value })
      default:
        throw 'No existe ese parametro'
    }
  }

  return (
    <Box maxW='60%' m='0 auto'>
      <Text variant='h1' mb={2}>
        PokeAPI
      </Text>
      <form onSubmit={handleSubmit}>
        <HStack>
          <Input type='text' onChange={e => handleChange(e, TypeParams.offSet)} />
          <Input type='text' onChange={e => handleChange(e, TypeParams.limit)} />
        </HStack>
        {messages !== '' ? (
          <Alert my={2} status='error'>
            <AlertIcon />
            <AlertTitle>{messages}</AlertTitle>
          </Alert>
        ) : null}
        <Button mt={2} type='submit' colorScheme='teal'>
          Buscar
        </Button>
      </form>

      {isLoading && (
        <HStack mt={10} justifyContent='center'>
          <Skeleton height={200} w={200} />
          <Skeleton height={200} w={200} />
          <Skeleton height={200} w={200} />
        </HStack>
      )}
    </Box>
  )
}

export default App
