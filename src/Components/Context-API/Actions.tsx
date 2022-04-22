import { ActionType } from './Store-reducer';
import axios from 'axios';

export const endpoint = 'https://qorypos-api.herokuapp.com'
// export const endpoint = 'http://localhost:8080'

export const numberwithCommas = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
}

// Using class for ignore error new keyword
class Dates extends Date {}
export const getDay = ():string => {
    const date = new Dates();

    return `${date.getDate()}, ${date.getMonth() +  1} ${date.getFullYear()}`
}


type dispatchType = (dispatch: ActionType ) => void

export const getCategory = async (dispatch: dispatchType):Promise<void> => {
    const request = await ( await axios.get(`${endpoint}/api/category`) ).data
    return new Promise((resolve, rejected) => {
        if(request){
            dispatch({type: "getCategory", payload : request})
            resolve(request)
        }else{
            dispatch({type: "getCategory", payload:[]})
            rejected("Something went wrong!")
        }
    })
}

export const getDataProduct = async (dispatch: dispatchType, category?:string):Promise<void> => {

    const request = await ( await axios.get(`${endpoint}/api/product?category=${category}`) ).data

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

export const getDataQueue = async (dispatch: dispatchType):Promise<void> => {
    const requestQueue = await ( await axios.get(`${endpoint}/api/queue`) ).data

    return new Promise((resolve, rejected) => {
        if(requestQueue){
            dispatch({type:"getDataQueue", payload : requestQueue})
            resolve(requestQueue)
        }else{
            dispatch({type: "getDataQueue", payload:[]})
            rejected("Something went wrong!")
        }
    })
}

export const getChanges = (dispatch: dispatchType, changes: number) => dispatch({type:"getChanges",payload:changes})

export const getActivity = async (dispatch: dispatchType):Promise<void> => {
    const activityData = await ( await axios.get(`${endpoint}/api/activity`) ).data
    return new Promise((resolve, rejected) => {
        if(activityData){
            dispatch({type:"getActivity",payload:activityData})
            resolve(activityData)
        }else{
            dispatch({type:"getActivity",payload:[]})
            rejected('Something went wrong!')
        }
    })
}