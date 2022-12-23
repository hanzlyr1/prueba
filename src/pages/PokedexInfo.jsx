import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokemonInfo.css'


const PokedexInfo = () => {

    const { id } = useParams()
    const [pokemon, setpokemon] = useState()



    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(URL)
            .then(res => setpokemon(res.data))
            .catch(err => console.log(err))
    }, [id])

    console.log(pokemon)
    return (
        <article className={`poke__info bg-${pokemon?.types[0].type.name}`} >
            <header className='header__img'>
                <img className='header__img-img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <div className='poke__info-data'>
                <h2>#{pokemon?.id}</h2>
                <h3>{pokemon?.name}</h3>
                <span>Peso</span>
                <h3> {pokemon?.weight}</h3>
                <span>Altura</span>
                <h3> {pokemon?.height}</h3>
            </div>
            <ul>
                {
                    pokemon?.types.map(t => (<li>{t.type.name}</li>))
                }
            </ul>
            <br />
            <ul>
                {
                    pokemon?.abilities.map(a => (<li >{a.ability.name}</li>))
                }
            </ul>
            <br />
            <div>
                <ul>
                    {
                        pokemon?.stats.map(s => (<li >{s.stat.name} : {s.base_stat}</li>))
                    }
                </ul>
            </div>
            <br />

            <div>

                {
                    pokemon?.moves.map(p => (<li >{p.move.name}</li>))
                }
            </div>

        </article >
    )
}

export default PokedexInfo