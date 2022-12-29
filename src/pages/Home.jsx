import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeaderPoker from '../components/shared/HeaderPoker'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import './styles/home.css'

const Home = () => {

    const dispach = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispach(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value = ''
        navigate('/pokedex')
    }

    return (

        <div className='Home'>
            <div className='xd'>
                <div className='Home__back'>
                    <img className='home__img--banner' src="/Home/pokedex.png" alt="" />
                </div>
                <div className='home__containerinfo'>
                    <div className='home__img trainer' >

                        <h1 className='home__title'>Hello Trainer!</h1>

                        <img className='home__img--trainer' src="/Trainer/trainer.png" alt="" />
                    </div>
                    <p className='home__parrafo'>Give me your name to start</p>

                    <div className='home__form-div'>
                        <form className='home__form' onSubmit={handleSubmit}>
                            <input className='home__input' id="name" type="text" />
                            <button className='home__button'><i className="fa-solid fa-arrow-right icons"></i></button>
                        </form>
                    </div>
                </div>



            </div>
        </div>


    )
}

export default Home