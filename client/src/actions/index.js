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
export function getByName(name){
    return async function (dispatch){
      try{
        var json = await axios.get('http://localhost:3001/countries?name=' + name)
        return dispatch({
            type: 'GET_BY_NAME',
            payload: json.data
        })
    }
    catch(error){
        console.log(error)
    }
    }
}   

export function postActivity(payload){
 return async function(dispatch){   
    const json = await axios.post("http://localhost:3001/activity", payload)
    console.log('response', json)
    return dispatch({
        type: 'POST_ACTITY',
        payload : json
    })
}}


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

export function filterByPopulation(payload){

        return {
            type: 'FILTER_BY_POPULATION',
            payload
        }
    
}


export function filterName(payload){
      return{
            type: 'FILTER_BY_NAME',
            payload 
    
        }   
}


export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/countries/'+id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByActivity(payload){
    return{
          type: 'FILTER_BY_ACTIVITY',
          payload 
  
      }   
}