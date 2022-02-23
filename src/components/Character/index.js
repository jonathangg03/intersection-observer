import './index.css'

export default function Character({ character }) {
  return (
    <li key={character.id} className='character'>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
    </li>
  )
}
