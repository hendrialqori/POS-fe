import { ActionType } from './Store-reducer';
import axios from 'axios';

export const numberwithCommas = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
}

type dispatchType = (dispatch: ActionType ) => void
export const getDataProduct = async (dispatch: dispatchType) => {

    const request = await ( await axios.get('http://localhost:3004/menus') ).data

    return new Promise((resolve, rejected) => {
        if(request){
            dispatch({type: "getDataProduct", payload : request})
            resolve(request)
        }else{
            dispatch({type: "getDataProduct", payload:[]})
            rejected("Something went wrong!")
        }
    })
}

