import React, {Component} from 'react'
import { Provider } from 'react-redux'
import HomeScreen from './HomeScreen'
import createStore from '../redux'

const store = createStore()

class cocktails extends Component {
    render(){
        return(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        )
    }
}

export default cocktails