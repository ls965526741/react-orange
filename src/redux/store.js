import { createStore, combineReducers } from 'redux'
import home from './reducers/home'
import user from './reducers/user'

const allReducers = combineReducers({ home, user })

export default createStore(allReducers)
