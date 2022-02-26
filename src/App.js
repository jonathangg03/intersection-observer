import { useEffect, useState, useRef, useCallback } from 'react'
import Character from './components/Character'
import getCaracters from './getCharacters'
import useVisible from './hooks/useVisible'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)

  //IO
  const visorRef = useRef(null)
  const { visible } = useVisible({ visorRef })

  const increasePage = () => {
    setPage((prev) => prev + 1)
  }

  const getCharacters = useCallback(async () => {
    console.log(page)
    const results = await getCaracters({ page })
    setCharacters((prev) => prev.concat(results))
    increasePage()
  }, [page])

  useEffect(() => {
    if (visible) {
      getCharacters()
    }
  }, [visible, getCharacters])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Prueba de intersection observer</h1>
      </header>
      <ul className='character__list'>
        {characters?.map((character) => {
          return <Character character={{ ...character }} key={character.id} />
        })}
      </ul>
      <div className='visor' ref={visorRef}></div>
    </div>
  )
}

export default App
