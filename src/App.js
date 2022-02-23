import { useEffect, useState, useRef } from 'react'
import Character from './components/Character'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(0)

  //IO
  const visorRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible === true) setPage((page) => page + 1)
  }, [visible])

  useEffect(() => {
    const callbackFunction = (entries) => {
      const [entry] = entries
      setVisible(entry.isIntersecting)
    }
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(callbackFunction, options)
    if (visorRef.current) observer.observe(visorRef.current)

    return () => {
      if (visorRef.current) observer.unobserve(visorRef.current)
    }
  }, [visorRef])

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      )
      const { results } = await response.json()
      setCharacters([...characters, ...results])
    }
    fetchCharacters()
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
