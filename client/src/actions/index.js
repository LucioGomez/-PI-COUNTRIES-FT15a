import axios from 'axios'

export function getCountries(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}   

export function filteredByRegion(payload){
   console.log(payload)
    return{
        type: 'FILTER_BY_REGION',
        payload
    }
}

export function filteredByActivity(payload){
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

export function filterPopulationASC(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/countries?filterby=population&orderby=ASC')
        return dispatch({
            type: 'FILTER_BY_POPULATION_ASC',
            payload : json.data
        })
    }
}
export function filterPopulationDESC(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/countries?filterby=population&orderby=DESC')
        return dispatch({
            type: 'FILTER_BY_POPULATION_DESC',
            payload : json.data
        })
    }
}

export function filterNameByAZ(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/countries?filterby=name&orderby=ASC')
        return dispatch({
            type: 'FILTER_BY_NAME_AZ',
            payload : json.data
        })
    }
}

export function filterNameByZA(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/countries?filterby=name&orderby=DESC')
        return dispatch({
            type: 'FILTER_BY_NAME_ZA',
            payload : json.data
        })
    }
}