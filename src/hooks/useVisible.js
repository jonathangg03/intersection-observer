import { useEffect, useState } from 'react'

export default function useVisible({ visorRef, once = true }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let observer
    const { current } = visorRef
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

    observer = new IntersectionObserver(callbackFunction, options) //Creamos la instancia del intersection observer
    if (current) observer.observe(current) //Sí tenemos al visor, lo observamos

    return () => {
      //Debemos desobservar si salimos del componente
      if (current) observer.disconnect()
    }
  }, [visorRef])

  return { visible }
}
