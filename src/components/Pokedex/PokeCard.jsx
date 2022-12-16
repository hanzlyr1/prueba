import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PokeCard = ({ url }) => {

    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))


    }, [])

    const handleClick = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }
    console.log(pokemon)
    return (
        <article onClick={handleClick}>
            <header>
                <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section>
                <h3>{pokemon?.name}</h3>
                <ul>
                    {
                        pokemon?.types.map(type => <li key={type.type.name}>{type.type.name}</li>)
                    }
                </ul>
            </section>
            <footer>
                <ul>
                    {
                        pokemon?.stats.map((stat => (<li key={stat.stat.name}> <span>{stat.stat.name}</span><span>{stat.base_stat}</span></li>)))
                    }
                </ul>
            </footer>
        </article>
    )
}

export default PokeCard