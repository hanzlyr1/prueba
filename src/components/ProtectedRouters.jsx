import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import HeaderPoker from './shared/HeaderPoker'

const ProtectedRouters = () => {
    const trainer = useSelector(state => state.trainer)
    if (trainer) {
        return (<><HeaderPoker />  <Outlet /></>)
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectedRouters