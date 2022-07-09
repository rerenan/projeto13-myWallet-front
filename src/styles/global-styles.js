import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    body{
        background-color: #8C11BE;
        font-family: 'Raleway', sans-serif;
    }
    h2{
        font-weight: 700;
        font-size: 26px;
        color: white;
        
    }
   
    h5{
        font-weight: 500;
        font-size: 16px;
        color: white;
    }
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div{
            display: flex;
            align-items: center;
            .checkbox{
                margin: 0;
                margin-right: 10px;
                width: 22px;
            }
        }
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
