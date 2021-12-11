// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {useEffect, useState, Component} from 'react'
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

//#region ErrorBoundary class component
// class ErrorBoundary extends Component {
//   state = {error: null}
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   componentDidCatch(error, errorInfo) {
//     console.log({error, errorInfo})
//   }
//   render() {
//     const {error} = this.state
//     if (error) {
//       return <this.props.FallbackComponent error={error} />
//     }

//     return this.props.children
//   }
// }
//#endregion

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    pokemon: null,
    status: pokemonName ? Status.PENDING : Status.IDLE,
  })
  const {pokemon, status} = state
  const handleError = useErrorHandler()
  useEffect(() => {
    if (!pokemonName) return

    setState(prevState => ({...prevState, status: Status.PENDING}))
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState(prevState => ({
          ...prevState,
          status: Status.RESOLVED,
          pokemon,
        }))
      },
      error => handleError(error),
    )
    // .catch(error => {
    // // setState(prevState => ({...prevState, status: Status.REJECTED, error}))
    //   handleError(error)
    // })
  }, [handleError, pokemonName])

  if (status === Status.IDLE) {
    return <>Submit a pokemon</>
  } else if (status === Status.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === Status.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />
  }
  // else if (status === Status.REJECTED) {
  //   throw error
  // }

  throw Error('Impossible status')
}

function ErrorFallBack({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function ErrorLogger(error, info) {
  console.log({error, info})
}

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <ErrorBoundary
        FallbackComponent={ErrorFallBack}
        onError={ErrorLogger}
        onReset={handleReset}
        resetKeys={[pokemonName]}
      >
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
