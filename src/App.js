import { useEffect, useState, useRef, useCallback } from 'react'
import Character from './components/Character'
import getCaracters from './getCharacters'
import useVisible from './hooks/useVisible'
import debounce from 'just-debounce-it'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)

  //IO
  const visorRef = useRef(null)
  const { visible } = useVisible({ visorRef })

  const changePage = useCallback(
    () =>
      debounce(
        setPage((prev) => prev + 1),
        100
      ),
    []
  )

  useEffect(() => {
    if (visible) {
      changePage()
    }
  }, [visible, changePage])

  const gettingCharacters = async ({ page }) => {
    const results = await getCaracters({ page })
    setCharacters((prev) => prev.concat(results))
  }

  useEffect(() => {
    gettingCharacters({ page })
  }, [page])

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
