import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../App'
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
        <>
            <div className={`container`}>
                <article className="poke__info" >
                    <div className='poke__info-container'>

                        <header className={`header__img`}>
                            <div className={`header__img-div bg-${pokemon?.types[0].type.name}`}>
                                <img className={`header__img-img `} src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                            </div>

                            <div className='poke__info-data'>
                                <div className='poke__info-datawh'>
                                    <div className='poke__info-weight'>
                                        <h2> {pokemon?.weight}</h2>
                                        <span>Peso</span>
                                    </div>
                                    <div className='poke__info-height'>
                                        <h2> {pokemon?.height}</h2>
                                        <span>Altura</span>
                                    </div>
                                </div>
                                <div className='poke__info-datat'>
                                    <span className='poke__info-span1'></span><h1 className='poke__info-datah3' >{pokemon?.name}</h1><span className='poke__info-span2'></span>
                                    <h2 className='poke__info-datah2'>#{pokemon?.id}</h2>
                                </div>

                            </div>
                        </header>

                        <div className='poke__info-div1'>

                            <div className='poke__info-typespoke'>
                                <h1 className='poke__info-h1'>Type</h1>

                                <ul className='poke__types-container'>
                                    {
                                        pokemon?.types.map(t => (<li className={`poke__types-item bg-${t.type.name}`} key={t.type.url} >{t.type.name}</li>))
                                    }
                                </ul>
                            </div>
                            <div className='poke__info-abilitiespoke'>
                                <h1 className='poke__info-h1'>Abilities</h1>

                                <ul className='poke__abilities-container'>
                                    {
                                        pokemon?.abilities.map(a => (<li className='poke__abilities-item' key={a.ability.url}  >{a.ability.name}</li>))
                                    }
                                </ul>
                            </div>
                        </div>



                        <div className='poke__info-containerstats'>
                            <div>
                                <h1 className='poke__info-statTitle' >Estadisticas</h1>
                            </div>

                            <div className='poke__stat-container'>
                                {
                                    pokemon?.stats.map(s => (<>
                                        <div className='poke__info-div'>
                                            <h3 className='poke__info-stat'>{s.stat.name}</h3>
                                            <div className='poke__info-span'>
                                                <span className='poke__info-spa'>{s.base_stat}</span>
                                                <span>/200</span>
                                            </div>
                                        </div>
                                        <div className='poke__info-bar'>

                                            <div className={`poke__info-hp bg-${pokemon?.types[0].type.name}`} style={{ width: `${(s.base_stat * 100) / 200}%` }} >

                                            </div>

                                        </div>
                                    </>))
                                }
                            </div>
                        </div>
                    </div>


                    <div className='poke__info-containermoves' >
                        <h1 className='poke__info-moveh1'>Movements</h1>
                        <ul className='poke__info-cont'>
                            {
                                pokemon?.moves.map(p => (<li className='poke__move-item' key={p.move.url}>{p.move.name}</li>))
                            }
                        </ul>
                    </div>


                </article >
            </div >


        </>
    )
}

export default PokedexInfo