import React, { Component } from 'react';
import {
    createStackNavigator
} from 'react-navigation';
import UsersData from "./UsersData";
import UserDetail from "./UserDetail";
import AddUser from "./AddUser";

const Navigator = createStackNavigator({
    UserData: {screen: UsersData},
    UserDetail: {screen: UserDetail},
    AddUser: {screen: AddUser}
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'rgb(28,74,119)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
})

export default Navigator