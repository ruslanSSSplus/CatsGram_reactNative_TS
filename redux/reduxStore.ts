import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose, Action} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'

import catsReducer from "./reducers/catsReducer";



let rootReducer = combineReducers({
    cats: catsReducer,
})

type RootReducersType = typeof rootReducer
export type AppStateType = ReturnType<RootReducersType>


export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType <A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store
