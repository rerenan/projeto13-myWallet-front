import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import IconBack from './../assets/imgs/iconback.svg'
import UserContext from '../contexts/UserContext'
import Operation from './Operation'


export default function HomePage() {
    const FOUR_MIN = 4*60*1000
    const [wallet, setWallet] = useState("");
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [isPositive, setIsPositive] = useState("");
    const { token } = useContext(UserContext);
    
    useEffect(() => {
        if (token !== "") {
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            getMyWallet(config);
            setInterval(sendStatus(config),FOUR_MIN)
        }
    }, [token])

    useEffect(() => {
        calculateBalance();
    }, [wallet])

    function sendStatus(config){
        const request = axios.post('http://localhost:5000/status',{},config);
            request.then(()=>{})
    }
    function getMyWallet(config) {
     
        const promise = axios.get('http://localhost:5000/mywallet', config)
        promise.then((res) => {
            setWallet(res.data.wallet);
            setName(res.data.name);
        })
        promise.catch((err) => {
            console.log(err);
        })
    }

    function myWallet() {
        if (wallet.length > 0) {
            return <>{wallet.map(({ value, description, type },index) => <Operation key={index} value={value} description={description} type={type} />)}
                <div className='balance'><h6>SALDO</h6><h5>{balance}</h5></div></>

        } else {
            return <h4>Não há registros de entrada ou saída</h4>
        }
    }
    
    function calculateBalance() {
        if (wallet === '' || wallet.length === 0) return;
        const values = wallet.map(({ value, type }) => type === 'debit' ? value * (-1) : value);
        const sum = values.reduce((sum, i) => sum + i)
        if (Math.sign(sum) === -1) {
            setBalance((sum * (-1)).toFixed(2));
            setIsPositive(false)
        } else {
            setBalance(sum.toFixed(2));
            setIsPositive(true)
        }
    }

    return (
        <Page>
            <TopBar>
                <h2>Olá, {name}</h2>
                <Link to={'/'}>
                <img src={IconBack} alt="" />
                </Link>
            </TopBar>
            <Wallet balance={isPositive}>
                {myWallet()}
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
    position: relative;
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
    box-sizing: border-box;
    height: 74%;
    overflow-y: scroll;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 20px;
    
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
    .balance{
        width: 86%;
        background-color: white;
        display: flex;
        justify-content: space-between;
        position: absolute;
        font-size: 20px;
        bottom: 20.9%;
        left: 27px;
        h5{
            color: ${props => props.balance ? "#03AC00" : "#C70000"};
            line-height: 20px;
        }
    }
    h6{
        font-weight: 700;
        
    }
    
`

const Buttons = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    height: 17%;
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
