const initialState ={
    countries: [],
    allCountries: []
}

function rootReducer (state=initialState,action){
    switch (action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'FILTER_BY_REGION':
            const allcountries = state.allCountries
            const filteredCountries= action.payload ==='All' ? allcountries : allcountries.filter(el => el.region === action.payload)
            return{
                ...state,
                countries: filteredCountries
            }
        // case 'FILTER_BY_ACTIVITY':
        //     const allcountries = state.allCountries
        //     const filteredbyActivity = action.payload
        // return{
        //     ...state,
        //     countries:
        // }
        case 'FILTER_BY_POPULATION_ASC':
           return {
                ...state,
                countries: action.payload
            }
        case 'FILTER_BY_POPULATION_DESC':
                return {
                     ...state,
                     countries: action.payload
                 };
        
        case 'FILTER_BY_NAME_AZ':
        return {
            ...state,
            countries: action.payload
        }
        case 'FILTER_BY_NAME_ZA':
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state;
    }
}
export default rootReducer;