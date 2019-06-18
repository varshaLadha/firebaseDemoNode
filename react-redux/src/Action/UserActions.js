import {
    ADD_USER,
    DELETE_USER,
    GET_ALL_USERS,
    UPDATE_USER
} from './ActionTypes'
import {baseURL, urls} from '../const'
import axios from 'axios'

export const getAllUsers = () => {
    return ((dispatch, getState) => {
        return axios.get(baseURL + urls.getAllUsers, {headers: {"Accept":"application/json", "Content-Type": "application/json"}})
            .then((response) => {
                dispatch({
                    type: GET_ALL_USERS,
                    payload: response.data.response
                })
            }).catch((err) => {
                alert(err)
            })
    })
}

export const addUser = (data) => {
    debugger
    return ((dispatch, getState) => {
        return axios.post(baseURL + urls.createUser, data, {headers: {"Accept":"application/json", "Content-Type": "application/json"}})
            .then((response) => {
                dispatch({
                    type: ADD_USER,
                    payload: response.data.response
                })
            }).catch((err) => {
                alert(err)
            })
    })
    debugger
}

export const updateUser = (id, data) => {
    debugger
    return ((dispatch, getState) => {
        return axios.put(baseURL+urls.updateUser+id, data, {headers: {"Accept":"application/json", "Content-Type": "application/json"}})
            .then((response) => {
                dispatch({
                    type: UPDATE_USER,
                    payload: response.data.response
                })
            }).catch((err) => {
                alert(err)
            })
    })
    debugger
}

export const deleteUser = (id) => {
    return ((dispatch, getState) => {
        return axios.delete(baseURL+urls.deleteUser+id, {headers: {"Accept":"application/json", "Content-Type": "application/json"}})
            .then((response) => {
                dispatch({
                    type: DELETE_USER,
                    payload: {response: response.data.response, id}
                })
            }).catch((err) => {
                alert(err)
            })
    })
}