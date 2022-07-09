import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import UserContext from '../contexts/UserContext'

export default function SignInPage(){
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false)
    const navigate = useNavigate();
    const {token ,setToken} = useContext(UserContext);
   
    
    function loginUser(e){
        e.preventDefault();
        setLoading(true);
        const body = {
            email,
            password
        }
        const request = axios.post('https://projeto13-mywallet-back-1.herokuapp.com/signin',body);
        request.then((res)=> {
            setToken(res.data);
            if(remember){ 
                localStorage.setItem('token',res.data);
            }
            setLoading(false);
            navigate("/");
        })
        request.catch((err)=>{
            alert(err.response.data);
            setLoading(false);
        })
    }

    function contentButton(){
        if(loading){
            return <ThreeDots color="white" height={20} width={55} />
        }
        return 'Entrar'
    }
    
    return (
        <Page>
            <form onSubmit={loginUser}>
            <h1>MyWallet</h1>
            <input required type="email" id='email' placeholder='E-mail' onChange={ (e)=> setEmail(e.target.value)} value={email} disabled={loading}/>
            <br />
            <input required type="password" id='password' placeholder='Senha' onChange={ (e)=> setPassword(e.target.value)} value={password} disabled={loading}/>
            <div><input className='checkbox' type="checkbox" id='rememberMe' onChange={ (e)=> setRemember(e.target.checked)} disabled={loading}/><h5>Manter Conectado?</h5></div>
            <button disabled={loading}>{contentButton()}</button>
            <Link to="/cadastrar">Já tem uma conta? Entre agora!</Link>
            </form>
        </Page>
    )
}

const Page = styled.div`
    padding-top: 21vh;
    box-sizing: border-box;
    padding-left:17px;
    padding-right: 17px;
    padding-bottom: 30px;
    h1{
        color: white;
        font-family: 'Saira Stencil One', cursive;
        font-size: 35px;
        margin-bottom: 40px;
    }
    a{
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 15px;
    }

`