import './index.css'

export default function Character({ character }) {
  return (
    <li key={character.id} className='character'>
      <img src={character.image} alt={character.name} />
      <div>
        <h2>{character.name}</h2>
        <ul>
          <li>Gender: {character.gender}</li>
          <li>Species: {character.species}</li>
          <li>Origin: {character.origin.name}</li>
          <li>Location: {character.location.name}</li>
        </ul>
      </div>
    </li>
  )
}
