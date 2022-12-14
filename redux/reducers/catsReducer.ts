import {catsAPI} from "../../API/cats-api";
import {InferActionsTypes} from "../reduxStore";
import {CatsType} from "../../Types/Types";

const NEW_CATS = 'CATS/NEW_CATS';
const NEW_CURRENT_PAGE = 'CATS/NEW_CURRENT_PAGE';
const SET_FETCHING = 'CATS/SET_FETCHING';
const SET_FAVORITE = 'CATS/SET_FAVORITE';
const DELETE_FAVORITE = 'CATS/DELETE_FAVORITE';
const DELETE_CAT = 'CATS/DELETE_CAT';


let initialState = {
    cats: [] as Array<CatsType> | any,
    currentPage: 1,
    isFetching: true,
    favorite: [] as Array<CatsType> | any,
}


export type initialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>


const catsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {

        case NEW_CATS:
            return {...state, cats: [...state.cats, ...action.cats]}
        case SET_FETCHING:
            return {...state, isFetching: action.bool}
        case NEW_CURRENT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1
            };
        case SET_FAVORITE:
            let stateCopy = {...state}
            let favoriteCopy = [...stateCopy.cats]
            let cat = favoriteCopy.find((cat: CatsType) => cat.id === action.id)
            return {...state, favorite: [...state.favorite, cat]}
        case DELETE_FAVORITE:
            return {...state, favorite: state.favorite.filter((item: CatsType) => item.id !== action.idToRemove)}
        case DELETE_CAT:
            return {...state, cats: state.cats.filter((item: CatsType) => item.id !== action.idToRemove)}
        default:
            return state;
    }
}


export const getNewCatsThunkCreater = (currentPage: number) => {
    return async (dispatch: any) => {
        let response = await catsAPI.getCats(currentPage)
        await dispatch(actions.getNewCats(response))
        dispatch(actions.setPage())
        dispatch(actions.setFetching(false))
    }
}


export const actions = {
    getNewCats: (cats: Array<CatsType>) => ({
        type: NEW_CATS, cats,
    } as const),
    setFetching: (bool: boolean) => ({
        type: SET_FETCHING, bool,
    } as const),
    setPage: () => ({
        type: NEW_CURRENT_PAGE,
    } as const),
    addFav: (id: string) => ({
        type: SET_FAVORITE, id
    } as const),
    deleteFav: (idToRemove: string) => ({
        type: DELETE_FAVORITE, idToRemove
    } as const),
    deleteCat: (idToRemove: string) => ({
        type: DELETE_CAT, idToRemove
    } as const),
}


export default catsReducer;