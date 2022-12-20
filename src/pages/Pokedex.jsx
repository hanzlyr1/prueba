import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'

const Pokedex = () => {
    const { trainer } = useSelector(state => state)
    const [pokemon, setPokemon] = useState()
    const [types, setType] = useState()
    const [typeSelectd, setTypeSelectd] = useState("All pokemon")
    const navigate = useNavigate()

    useEffect(() => {
        if (typeSelectd !== "All pokemon") {
            //hacer la peticion de los pokemones por tipo

            axios.get(typeSelectd)
                .then(res => setPokemon(res.data.pokemon.map(e => e.pokemon)))
                .catch(err => console.log(err))
        } else {
            //hacer la peticion de todos los pokemones
            const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000'
            axios.get(URL)
                .then(res => setPokemon(res.data.results))
                .catch()
        }


    }
        , [typeSelectd])

    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/type'
        axios.get(URL)
            .then(res => setType(res.data.results))
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        const input = e.target.search.value.trim().toLowerCase()
        navigate(`/pokedex/${input}`)
    }


    const handleChange = e => {
        setTypeSelectd(e.target.value)
        setPage(1)
    }

    //LOGICA DE PAGINACION
    const [page, setPage] = useState(8)
    const [pokePerPage, setPokePerPage] = useState(8)
    const initialPoke = (page - 1) * pokePerPage
    const finalePoke = page * pokePerPage
    //se pone && porque pokemon es undefinden
    const maxPage = pokemon && pokemon.length / pokePerPage




    return (
        <div className='containerPoke' >
            <h2 className='poke__h2'><span className='poke__span'>Welcome</span> <span className='poke__span--trainer' >  {trainer},</span> here you can find your favorite pokemon</h2>
            <div className='poke__search'>
                <form className='poke__form' onSubmit={handleSubmit}>
                    <input className='poke__input' type="text" id='search' placeholder='look for a pokemon' />
                    <button className='poke__button' >
                        <i className="fa-sharp fa-solid fa-magnifying-glass poke__button-icons"></i>
                    </button>
                </form>
                <select className='poke__select' onChange={handleChange}>
                    <option className='poke__option'>all pokemon</option>
                    {
                        types?.map(type => (<option key={type.url} value={type.url}>{type.name}</option>))
                    }
                </select>
            </div>
            <div className='container-card'>
                {
                    pokemon?.slice(initialPoke, finalePoke).map(poke => (<PokeCard key={poke.url} url={poke.url} />))
                }
            </div>
            <div className='containerPagination'>
                <Pagination page={page} maxPage={maxPage} setPage={setPage} />
            </div>
        </div>
    )
}

export default Pokedex