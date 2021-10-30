// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {useEffect, useState} from 'react'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [status, setStatus] = useState('idle')
  // const [pokemon, setPokemon] = useState(null)
  const [state, setState] = useState({
    error: null,
    pokemon: null,
    status: 'idle',
  })
  const {error, pokemon, status} = state
  // const [error, setError] = useState(null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )

  useEffect(() => {
    if (!pokemonName) return

    setState(prevState => ({...prevState, status: 'pending'}))
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState(prevState => ({...prevState, status: 'resolved', pokemon}))
      })
      .catch(error => {
        setState(prevState => ({...prevState, status: 'rejected', error}))
      })
  }, [pokemonName])

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // if (!pokemonName) {
  //   return 'Submit a pokemon'
  // } else if (pokemonName && !pokemon) {
  //   return <PokemonInfoFallback name={pokemonName} />
  // } else {
  //   return <PokemonDataView pokemon={pokemon} />
  // }

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  // if (error) {
  //   return (
  //     <div role="alert">
  //       There was an error:{' '}
  //       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  //     </div>
  //   )
  // }

  // return !pokemonName ? (
  //   'Submit a pokemon'
  // ) : !pokemon ? (
  //   <PokemonInfoFallback name={pokemonName} />
  // ) : (
  //   <PokemonDataView pokemon={pokemon} />
  // )
}

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
