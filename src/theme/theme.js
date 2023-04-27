import styled from 'styled-components'


export const theme = {
    colors: {
        black: '#354446',
        grey: '#354446',
        blue: '#18A0FB',
        background: '#EBEEF0'
    },
    fonts: {
        redHat: 'red Hat Mono'
    }
}

export const Input = styled.input`

border-radius: none;
border: none;
border-bottom: 1px solid rgba(0, 0, 0, 0.44);
width: 350px;
padding: 15px 2px 15px 2px;
margin-bottom: 32px !important;

:last-child{
    margin-bottom: 14px;
} 
::placeholder{
    color: ${props => props.theme.colors.grey};
    font-family: ${props => props.theme.fonts.redHat};
}
:focus{
    outline: none;
}
@media(max-width:767px){
    width:80vw;
}
`

export const Label = styled.label`
    display:none;
`
export const Container = styled.div`

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
height: 80vh;
overflow: hidden;

@media(max-width:767px){
        padding: 24px;
    }
`

export const DivTerms = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;

    & label{
        color: ${props => props.theme.colors.grey};
        font-family: ${props => props.theme.fonts.redHat};
        margin-left: 5px;
    }
`
export const Submit = styled.button`
    margin-top: 10px;
    width: 350px;
    background-color: ${props => props.theme.colors.blue};
    color:#fff;
    border: none;
    padding: 11px 7px 11px 7px;
    border-radius: 4px;
    cursor: pointer;

    @media(max-width:767px){
        width:80vw;
}
`
export const DivMessage = styled.div`

    width:100%;
    height:50px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    position: relative;
    
    & p{
        color: red;
        position: relative;
    } 
    
`

