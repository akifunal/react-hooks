// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import {useState} from 'react'
// import * as React from 'react'

function Greeting({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = useState(initialName)

  function handleChange(e) {
    // 🐨 update the name here based on event.target.value
    setName(e.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Akif" />
}

export default App
