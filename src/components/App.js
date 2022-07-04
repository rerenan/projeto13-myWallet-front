import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import UserContext from '../contexts/UserContext'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import HomePage from './HomePage'
import ManageWalletPage from './ManageWalletPage'


export default function App() {
    const [token, setToken] = useState("")
    return (
        <Global>
            <BrowserRouter>
                <UserContext.Provider value={{token, setToken}}>
                    <Routes>
                        <Route path='/' element={<SignInPage />} />
                        <Route path='/cadastrar' element={<SignUpPage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/novaentrada' element={< ManageWalletPage operation={'credit'}/>} />
                        <Route path='/novasaida' element={< ManageWalletPage operation={'debit'}/>} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </Global>
    )
}


const Global = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;
    h2{
        font-weight: 700;
        font-size: 26px;
        color: white;
        
    }
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    button{
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
        background-color: #A328D6;
        border-radius: 5px;
        border: none;
        color: white;
        font-size: 20px;
        text-align: center;
        :disabled{
            background-color: #8C11BE;
        }  
    }
    input{
        width: 100%;
        height: 52px;
        border: none;
        margin-bottom: 13px;
        padding: 13px;
        box-sizing: border-box;
        font-size: 18px;
        border-radius: 5px;
        ::placeholder{
            color: #000000;
            font-family: 'Raleway', sans-serif; 
        }
        :disabled{
            ::placeholder{
                opacity: 50%;
            }
        }
        :-webkit-autofill:disabled{
            -webkit-box-shadow: 0 0 0 30px #AA54CD inset !important;
            -webkit-text-fill-color: #4c4c4c;
            box-shadow: 0 0 0 30px #AA54CD inset ;
        }
    }
`