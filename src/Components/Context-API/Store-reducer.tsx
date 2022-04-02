import { useReducer, createContext, useContext } from "react";

export type ItemType = {  
    id          : number,
    title       : string,
    images      : string,
    description : string,
    category    : string,
    price       : number,
    qty         : number,
    total_price : number
}

type initialState = {
    Product : ItemType[],
    Queue   : ItemType[]
}

const initialValue: initialState = {
    Product : [] as ItemType[],
    Queue   : [] as ItemType[]
}

export type ActionType = 
    {type : "getDataProduct" | "getInLine", payload : ItemType[]} 


type contextType = {
    state : initialState,
    dispatch : React.Dispatch<ActionType>
}
const Store = createContext<contextType>({} as contextType)

const Reducer: React.Reducer<initialState, ActionType> = (state, action) => {
    switch(action.type){
        case "getDataProduct":
            return { ...state, Product : action.payload}
        case "getInLine":
            return { ...state, Product : action.payload}
        default:
            return state
    }
}

export const AppContext = ({children} : {children : React.ReactNode}) => {
    const [ state, dispatch ] = useReducer(Reducer, initialValue)
    return(
        <Store.Provider value={{state, dispatch}}>
            {children}
        </Store.Provider>
    )
}

export const useStoreContext = () => useContext(Store)