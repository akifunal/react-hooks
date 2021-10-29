// useRef and useEffect: DOM interaction
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/05-classes.js

// useRef and useEffect: DOM interaction
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/05-classes.js
import {useEffect, useRef} from 'react'
import VanillaTilt from 'vanilla-tilt'

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.

const Tilt = ({children}) => {
  const tiltRef = useRef()

  useEffect(() => {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    // @ts-ignore
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

//#region Tilt class component
/*
class Tilt extends React.Component {
  tiltRef = React.createRef()
  componentDidMount() {
    const tiltNode = this.tiltRef.current
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    }
    VanillaTilt.init(tiltNode, vanillaTiltOptions)
  }
  componentWillUnmount() {
    this.tiltRef.current.vanillaTilt.destroy()
  }
  render() {
    return (
      <div ref={this.tiltRef} className="tilt-root">
        <div className="tilt-child">{this.props.children}</div>
      </div>
    )
  }
}
*/
//#endregion

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
