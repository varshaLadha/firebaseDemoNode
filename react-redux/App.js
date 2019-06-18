import React, {Component} from 'react'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import Navigation from './src/Components/Navigation'
import AppReducer from './src/Reducer/index'

export default class App extends Component {
    render() {
        return (
            <Provider store={(createStore(AppReducer, applyMiddleware(thunk)))}>
                <Navigation/>
            </Provider>
        )
    }
}