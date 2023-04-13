import { combineReducers, createStore } from "redux";

const initiazeState = {
    users: [{
        user:'teste',
        email:'teste',
        pass: 'tesste'
    }]

    
}

const userReducer = ( state = initiazeState ,action ) => {
    if(action.type){
        return { ...state,users:[...state.users, action.payload] }
    }
    return state
}


const rootReducer = combineReducers({userReducer})

const store = createStore(rootReducer)

export default store