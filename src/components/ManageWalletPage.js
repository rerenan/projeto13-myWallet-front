import axios from "axios";
import { useContext, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function ManageWalletPage({ operation }) {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { token } = useContext(UserContext)

    function submitTransactionWallet(e) {
        e.preventDefault();
        const body = {
            value: Number(value),
            description,
            type: operation
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        const request = axios.post("https://projeto13-mywallet-back-1.herokuapp.com/account", body, config);
            request.then((res)=>{
                navigate("/home");
            })
            request.catch((err)=>{
                alert(err.response.data);
            })
    }

    return (
        <Page>
            <h2>Nova {operation === 'debit' ? "saída" : "entrada"}</h2>
            <form onSubmit={submitTransactionWallet}>
                <input required type="number" placeholder="Valor" onChange={(e) => setValue(e.target.value)} value={value} />
                <input required type="text" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} value={description} />
                <button>Salvar entrada</button>
            </form>

        </Page>
    )
}
const Page = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    h2{
        margin-bottom: 35px;
        margin-top: 7px;
    }
`