import {takeLatest} from 'redux-saga/effects'
import API from '../services/Api'

/* ------------- Types ------------- */
import {CocktailsTypes} from '../redux/CocktailsRedux'

/* ------------- Sagas ------------- */
import {getAllCocktails} from './CocktailsSagas'

/* ------------- API ------------- */
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {

    yield [
        takeLatest(CocktailsTypes.GET_COCKTAILS_REQUEST, getAllCocktails, api),
    ]
}