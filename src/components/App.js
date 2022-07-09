import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { GlobalStyle } from '../styles/global-styles'
import UserContext from '../contexts/UserContext'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import HomePage from './HomePage'
import ManageWalletPage from './ManageWalletPage'


export default function App() {
    const [token, setToken] = useState("")
    return (
            <BrowserRouter>
            <GlobalStyle></GlobalStyle>
                <UserContext.Provider value={{token, setToken}}>
                    <Routes>
                        <Route path='/login' element={<SignInPage />} />
                        <Route path='/cadastrar' element={<SignUpPage />} />
                        <Route path='/' element={<HomePage />} />
                        <Route path='/novaentrada' element={< ManageWalletPage operation={'credit'}/>} />
                        <Route path='/novasaida' element={< ManageWalletPage operation={'debit'}/>} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
    )
}


