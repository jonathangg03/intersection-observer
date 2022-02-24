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
    const callbackFunction = (entries) => {
      //Defoinimos la función a ejecutar cuando el elemento este en pantalla
      //Aquí solo debemos hacer acciones concernientes a entries, ninguna llamada a una api
      const [entry] = entries
      setVisible(entry.isIntersecting)
      //Colocaremos como valor un boleano, true si esta en la pantalla, false en cualquier otro caso
    }

    const options = {
      //Configuraciones del intersection observer
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(callbackFunction, options) //Creamos la instancia del intersection observer

    if (visorRef.current) observer.observe(visorRef.current) //Sí tenemos al visor, lo observamos

    return () => {
      //Debemos desobservar si salimos del componente
      if (visorRef.current) observer.unobserve(visorRef.current)
    }
  }, [visorRef])

  useEffect(() => {
    if (visible) {
      const fetchCharacters = async () => {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        )
        const { results } = await response.json()
        setCharacters([...characters, ...results])
      }
      fetchCharacters()
      setPage(page + 1)
    }
  }, [visible, characters])

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
