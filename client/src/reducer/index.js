const initialState ={
    countries: [],
    allCountries: [],
    detail:[],
}

function rootReducer (state=initialState,action){
    switch (action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'GET_BY_NAME':
                return{
                ...state,
                countries: action.payload
            }
        case 'FILTER_BY_REGION':
            const allcountries = state.allCountries
            const filteredCountries= action.payload ==='All' ? allcountries : allcountries.filter(el => el.region === action.payload)
            return{
                ...state,
                countries: filteredCountries
            }
        case 'POST_ACTITY':
            return{
                ...state,
            }
         case 'FILTER_BY_ACTIVITY':
             const allcountries2 = state.allCountries
             const filteredbyActivity = allcountries2.filter(el=> el.activities.length>0)
         return{
             ...state,
             countries: filteredbyActivity
         }
       case 'FILTER_BY_NAME':
            let orderByname = action.payload === 'ASC'?
            state.countries.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0;
            }):
            state.countries.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1;
                }
                return 0;
            })
        return {
            ...state,
            countries: orderByname
        }
        case 'FILTER_BY_POPULATION':
        let orderByPopulation = action.payload === 'ASC'?
        state.countries.sort(function(a,b){
            if(a.population > b.population){
                return 1;
            }
            if(a.population < b.population){
                return -1;
            }
            return 0;
        }):
        state.countries.sort(function(a,b){
            if(a.population > b.population){
                return -1;
            }
            if(a.population < b.population){
                return 1;
            }
            return 0;
        })
        return {
            ...state,
            countries :  orderByPopulation
        }
        case "GET_DETAILS" :
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}
export default rootReducer;