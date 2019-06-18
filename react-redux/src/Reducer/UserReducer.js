var _ = require('lodash')
import {
    DELETE_USER,
    UPDATE_USER,
    ADD_USER,
    GET_ALL_USERS
} from '../Action/ActionTypes'

let INITIAL_STATE = {
    userData: {}
}

let UserReducer = (state = INITIAL_STATE, action) => {
    debugger
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                userData: action.payload || null
            }
        case ADD_USER:
            let userData =  cloneObject(state.userData) //clone the current state
            userData.push(action.payload); //add the new user
            state = Object.assign({}, state, { userData: userData});
            return state;
        case UPDATE_USER: {
            debugger
            let userData =  cloneObject(state.userData)
            let index = state.userData.findIndex((obj) => {return obj.id === action.payload.id});
            if (index !== -1) {
                userData[index]['name'] = action.payload.name;
                userData[index]['email'] = action.payload.email;
            }
            state = Object.assign({}, state, { userData: userData});
            return state
        }
        case DELETE_USER: {
            let userData =  cloneObject(state.userData) //clone the current state
            let index = state.userData.findIndex((obj) => {return obj.id === action.payload.id});
            if(index !== -1) userData.splice(index, 1);//if yes, undo, remove the USER
            state = Object.assign({}, state, { userData: userData});
            return state;
        }
        default:
            return state
    }
}

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    return data.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

export default UserReducer