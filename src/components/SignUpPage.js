import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

export default function SignUpPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function registerUser(e){
        e.preventDefault();
        if(!confirmPassword) return alert("As senhas não são iguais. Tente novamente");
        setLoading(true);
        const body = {
            name,
            email,
            password
        }
        const request = axios.post('https://projeto13-mywallet-back-1.herokuapp.com/signup',body);
        request.then(()=> {
            setLoading(false);
            navigate("/login");
        })
        request.catch((err)=>{
            alert(err.response.data)
            setLoading(false);
        })
    }

    function contentButton(){
        if(loading){
            return <ThreeDots color="white" height={20} width={55} />
        }
        return 'Cadastrar'
    }
    
    return (
        <Page>
            <form onSubmit={registerUser}>
            <h1>MyWallet</h1>
            <input required type="text" id='name' placeholder='Nome' onChange={ (e)=> setName(e.target.value)} value={name} disabled={loading}/>
            <br />
            <input required type="email" id='email' placeholder='E-mail' onChange={ (e)=> setEmail(e.target.value)} value={email} disabled={loading}/>
            <br />
            <input required type="password" id='password' placeholder='Senha' onChange={ (e)=> setPassword(e.target.value)} value={password} disabled={loading}/>
            <br />
            <input required type="password" id='confirmpassword' placeholder='Confirme a senha' onChange={ (e)=> setConfirmPassword(e.target.value === password)} disabled={loading}/>
            <br />
            <button disabled={loading}>{contentButton()}</button>
            <Link to="/login">Já tem uma conta? Entre agora!</Link>
            </form>
        </Page>
    )
}

const Page = styled.div`
    padding-top: 16vh;
    box-sizing: border-box;
    padding-bottom: 30px;
    padding-left:17px;
    padding-right: 17px;
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