export const HISTORY_ADD = 'history/HISTORY_ADD';
export const HISTORY_GET = 'history/HISTORY_GET';
export const HISTORY_CLEAR = 'history/HISTORY_CLEAR';

export function add(payload){
    return{
        type: HISTORY_ADD,
        payload
    }
}

export function clear(){
    return{
        type: HISTORY_CLEAR
    }
}

export function get(){
    return{
        type: HISTORY_GET
    }
}