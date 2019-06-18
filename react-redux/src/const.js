import {Platform} from 'react-native'

let url = ''

if(Platform.OS === 'ios'){
    url = 'http://localhost:3005'
} else{
    url = 'http://10.0.2.2:3005'
    // url = 'http://192.168.200.45:3005'
}

export const baseURL = url

export const urls = {
    createUser: '/user/',
    getAllUsers: '/user/',
    updateUser: '/user/',
    deleteUser: '/user/',
    getSingleUser: '/user/getSingle/'
}