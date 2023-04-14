import { combineReducers, createStore } from "redux";


const token = {
    acessToken:undefined
 }


const tokenReducer = (state = token, action) =>{
    
    if(action.type == "token"){
        return{  ...state,token: action.acessToken }
    }
    return state
}


const rootReducer = combineReducers({tokenReducer})

const store = createStore(rootReducer)

export default store