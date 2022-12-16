import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokeCard from '../components/Pokedex/PokeCard'

const Pokedex = () => {
    const { trainer } = useSelector(state => state)


    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=30'
        axios.get(URL)
            .then(res => setPokemon(res.data.results))
            .catch()
    }
        , [])



    return (
        <div>
            <h2>Welcome {trainer}, here you can find your favorite pokemon</h2>
            <div>
                {
                    pokemon?.map(poke => (<PokeCard key={poke.url} url={poke.url} />))
                }
            </div>
        </div>
    )
}

export default Pokedex