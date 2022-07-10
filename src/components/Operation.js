import styled from 'styled-components'

export default function Operation({value, description, type, date}){
    return (
        <Info type={type}><h3><span>{date}</span>{description}</h3><h5 >{value.toFixed(2)}</h5></Info>
    )
}

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 17px;
    span{
        color: #aaaaaa;
        margin-right: 10px;
    }
    h5{
        color:${props => props.type === 'debit'? "#C70000": "#03AC00"}
    }
`
