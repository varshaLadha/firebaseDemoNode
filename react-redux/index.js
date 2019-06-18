/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import UsersData from './src/Components/UsersData'
import Navigation from './src/Components/Navigation'
import Cocktail from './src/redux-saga/container/cocktails'
import ModalDemo from './src/ModalDemo'

AppRegistry.registerComponent(appName, () => App);


//https://reactnativeexample.com/  -- multiple demo projects for react-native