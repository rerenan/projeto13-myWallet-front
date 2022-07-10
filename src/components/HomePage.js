import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

import backIcon from './../assets/imgs/iconback.svg';
import plusIcon from '../assets/imgs/plusIcon.svg';
import minusIcon from '../assets/imgs/minusIcon.svg';
import UserContext from '../contexts/UserContext';
import Operation from './Operation';


export default function HomePage() {
    const FOUR_MIN = 4*60*1000
    const [wallet, setWallet] = useState("");
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [isPositive, setIsPositive] = useState("");
    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const localToken = localStorage.getItem('token')
        const tokenAux = localToken? localToken :token;
        if(!tokenAux) return navigate('/login')
            setToken(tokenAux);
            const config = {
                headers: {
                    Authorization: `${tokenAux}`
                }
            }
            getMyWallet(config);
            setInterval(sendStatus(config),FOUR_MIN)
        
    }, [token])

    useEffect(() => {
        calculateBalance();
    }, [wallet])

    function sendStatus(config){
        const request = axios.post('https://projeto13-mywallet-back-1.herokuapp.com/status',{},config);
            request.then(()=>{})
            request.catch(()=>{
                alert("sessão expirou");
                localStorage.removeItem("token");
                window.location.reload();
            })
    }
    function getMyWallet(config) {
     
        const promise = axios.get('https://projeto13-mywallet-back-1.herokuapp.com/mywallet', config)
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
            return <>{wallet.map(({ value, description, type , date},index) => <Operation key={index} value={value} description={description} type={type} date={date}/>)}
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
    function exit(){
        if(window.confirm("Você realmente quer sair?")){
            localStorage.removeItem('token')
            navigate('/login')
        }
    }
    return (
        <Page>
            <TopBar>
                <h2>Olá, {name}</h2>
                <img src={backIcon} onClick={()=> exit()} alt="" />
                
            </TopBar>
            <Wallet balance={isPositive}>
                {myWallet()}
            </Wallet>
            <Buttons>
                <Link to={'/novaentrada'}><img src={plusIcon} alt="" />Nova entrada </Link>
                <Link to={'/novasaida'}><img src={minusIcon} alt="" />Nova saída </Link>
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
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        padding-right: 65px;
        color: white;
        line-height: 20px;
        font-weight: 700;
        font-size: 17px;
        background-color:#A328D6;
        width: 47.5%;
        height: 100%;
        border-radius: 5px;
        img{
            width: 26px;
        }
    }
`
