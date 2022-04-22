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

export type QueueType = {
    id : number,
    serial_id : number,
    data : ItemType[],
    total_price : number,
    name : string,
    isPay : boolean
}

export type ActivityType = {
    id          : number,
    date        : string,
    data        : Array<{
                        title : string,
                        qty   : number
                        }>,
    total_price : number
}

export type CategoryType = {
    id : number,
    name : string
}

type initialState = {
    Product : ItemType[],
    Queue   : QueueType[],
    changes : number,
    Activity : ActivityType[],
    Category : CategoryType[]
}

const initialValue: initialState = {
    Product  : [] as ItemType[],
    Queue    : [] as QueueType[],
    changes  : 0,
    Activity : [] as ActivityType[],
    Category : [] as CategoryType[]
}

export type ActionType = 
    {type : "getDataProduct" | "getInLine", payload : ItemType[]} |
    {type : "getDataQueue" , payload : QueueType[]} | 
    {type : "getChanges", payload : number} | 
    {type : "getActivity", payload : ActivityType[]} |
    {type : "getCategory", payload : CategoryType[]}


type contextType = {
    state : initialState,
    dispatch : React.Dispatch<ActionType>
}
const Store = createContext<contextType>({} as contextType)

const Reducer: React.Reducer<initialState, ActionType> = (state, action) => {
    switch(action.type){
        case "getCategory":
            return { ...state, Category : action.payload}
        case "getDataProduct":
            return { ...state, Product : action.payload}
        case "getDataQueue":
            return { ...state, Queue : action.payload}
        case "getChanges":
            return {...state, changes : action.payload}
        case "getActivity":
            return {...state, Activity : action.payload}
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