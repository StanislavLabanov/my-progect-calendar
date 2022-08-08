import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import authReduser from "./redusers/auth";
import EventReduser from "./redusers/event"


const rootReduser = combineReducers({
   authReduser, EventReduser
})

export const store = createStore(rootReduser, applyMiddleware(thunk))


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch