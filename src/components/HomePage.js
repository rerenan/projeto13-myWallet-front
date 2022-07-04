import IconBack from './../assets/imgs/iconback.svg'
import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import Operation from './Operation'
export default function HomePage(){
    const [wallet,setWallet] = useState("");
    const {token} = useContext(UserContext);
    
    
    useEffect(()=>{
        if(token !== "") getMyWallet();
    },[token])

function getMyWallet(){
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }
    const promise = axios.get('http://localhost:5000/mywallet',config)
    promise.then((res)=>{
        setWallet(res.data);
    })
    promise.catch((err)=>{
        console.log(err);
    })
}

    function myWallet(){
        if(wallet.length > 0) {
            return (wallet.map(({value, description, type})=>{<Operation value={value} description={description} type={type}/>}))
            
        }else{
            return <h4>Não há registros de entrada ou saída</h4>   
        }
    }
    
    
    return(
        <Page>
        <TopBar>
            <h2>Olá, Fulano</h2>
            <img src={IconBack} alt="" />
        </TopBar>
        <Wallet>
            {myWallet}
        </Wallet>
        <Buttons>
            <Link to={'/novaentrada'}>Nova entrada</Link>
            <Link to={'/novasaida'}>Nova saída</Link>
        </Buttons>
        </Page>
    )
}

const Page = styled.div`
    height: 100%;
    width: 100%;
    padding: 23px;
    box-sizing: border-box;
`
const TopBar = styled.div`
    height: 3.6%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 28px;
`
const Wallet = styled.div`
    background-color: white;
    width: 100%;
    height: 74%;
    border-radius: 5px;
    margin-bottom: 13px;
    position: relative;
    h4{ 
        box-sizing: border-box;
        display: flex;
        width: 100%;
        padding: 0% 20%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: #868686;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
    }
    
`

const Buttons = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    height: 17.5%;
    justify-content: space-between;
    a{
        box-sizing: border-box;
        text-decoration: none;
        display: flex;
        padding: 10px;
        color: white;
        font-weight: 700;
        font-size: 17px;
        background-color:#A328D6;
        width: 47.5%;
        height: 100%;
        border-radius: 5px;
    }
`
