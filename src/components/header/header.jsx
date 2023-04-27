import React ,{ useCallback}from "react";
import { Head } from "./style";


export default function Header(){
    

    const backHome = useCallback(() => {

        location.href='/'
        return;
      
      }, []);
        
    const handleSignOut = () =>{
      
        localStorage.removeItem('token')
        backHome()
    }

    return(
        <React.Fragment>
            <Head>
                <div>
                    <h1>LOGO</h1>
                </div>
                <div>
                    <button onClick={ handleSignOut }>Deslogar</button>
                </div>
            </Head>
        </React.Fragment>

    )
}
