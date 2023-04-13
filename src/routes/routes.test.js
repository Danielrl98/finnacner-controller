import { render, screen} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

import Rotas from './routes'

describe("testando rotas",() =>{

    test("Verificando se tem rota teste",() => {

        render(<Rotas/>)

       /* expect(screen.getByText("Das2")).toBeInTheDocument()*/
    })

})