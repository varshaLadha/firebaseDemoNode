import {combineReducers} from 'redux'
import UserReducer from './UserReducer'

let AppReducer = combineReducers({
    User: UserReducer
})

export default AppReducer