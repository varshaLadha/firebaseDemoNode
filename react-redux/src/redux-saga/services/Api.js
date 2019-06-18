import apisauce from 'apisauce'

const create = (baseURL = 'http://www.thecocktaildb.com/api/json/v1/1') => {

    const api = apisauce.create({
        baseURL,
        timeout: 15000
    })

    const getGlassCocktails = () => api.get('/filter.php', { g: 'Cocktail_glass' })

    debugger
    return {
        getGlassCocktails,
    }
}

export default {
    create
}