import { HISTORY_ADD, HISTORY_GET, HISTORY_CLEAR } from './actions';

const INITIAL_STATE = {
    isEmpty: true,
    history: [{}]
}

function reducer( state= INITIAL_STATE, action){
    switch(action.type){
        case HISTORY_ADD:
            return {
                ...state,
                isEmpty: false,
                history: [...state.history, action.payload]
            }
        case HISTORY_CLEAR:
            return{
                ...state,
                isEmpty: true,
                history: [{}]
            }
        case HISTORY_GET:
            return{
                ...state
            }
        default:
            return{
                ...state
        }    
    }
}


export default reducer;