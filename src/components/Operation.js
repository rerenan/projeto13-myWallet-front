import dayjs  from 'dayjs'
import styled from 'styled-components'

export default function Operation({value, description}){
    const TODAY = dayjs().format("DD/MM")
    return (
        //<h3>{TODAY}<span>{description}</span><h3 className='color'>{value}</h3></h3>
        <Box>HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHUASDHUSAIHDSAHDIAHSDHUI</Box>
    )
}

const Box = styled.div`
    background-color: green;
`
