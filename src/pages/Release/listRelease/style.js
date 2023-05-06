import styled, { css } from "styled-components";

export const Container = styled.section`

padding: 24px;

`
export const TableWrapper = styled.div`

height:500px;
overflow-y: scroll;
padding: 0;
margin-top: 60px;
`
export const Table = styled.table`

width: 100%;
border-collapse: collapse;
overflow-y: scroll;

`
export const Thead = styled.thead`

position: sticky;
background-color: #1b4965;
color: #fff;
text-align: left;
top: 0;
z-index: 1;

`
export const Tbody = styled.tbody`

text-align: left;
width: 100%;

`
export const Tr = styled.tr`


:nth-child(even){
    background-color: #fff;
}

`
export const Th = styled.th`
padding: 10px;
min-width: 75px;


`
export const Td = styled.td`

padding: 10px;
min-width: 75px;
height: 20px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

`
export const Menu = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;

`
export const MenuGrid2 = styled.div`
    display: flex;
    justify-content: end;
`
export const Button = styled.button`
    border: none;
    background-color: ${ props => props.theme.colors.blue};
    color: #fff;
    border-radius: 2px;
    padding: 8px;
    cursor: pointer;
    font-weight: 600;

    & svg {
        margin-top: 3px;
    }
`

export const Input = styled.input`
    padding: 10px 4px;
    border:  ${ props => props.theme.colors.grey};
    border-radius: 4px;
    outline: none;
    width: 70%;
`
export const ButtonDelete = styled.button`
    border: none;
    background-color: transparent;
    color:  red;
    border-radius: 2px;
    padding: 8px;
    cursor: pointer;
    font-weight: 600;

    & svg {
        fill: red;
        
    }
`
