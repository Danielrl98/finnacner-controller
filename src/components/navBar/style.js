import styled from "styled-components";

export const NavGrid = styled.div`
background-color: #fff;
height: 100vh;
padding-left: 24px;
padding-right: 24px;

& main {
  position: fixed;
}
@media (max-width: 767px) {
  display: none;
}
`;

export const Titulo = styled.div`

  display:flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 50px;

  & span {
    margin-left: 10px;
    font-family: ${ props => props.theme.fonts.redHat};
  }
`
export const Links = styled.div`
  padding-bottom: 18px;
  font-size: 15px;
  font-family: ${ props => props.theme.fonts.redHat};
  cursor:pointer;
  display: flex;
  align-items: center;


  & a{
    margin-left: 5px;
    color: ${ props => props.theme.colors.black};
    text-decoration: none;
  }
`