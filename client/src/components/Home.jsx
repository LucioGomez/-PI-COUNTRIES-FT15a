import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCountries, filteredByRegion,filterPopulationASC,filterPopulationDESC,filterNameByZA,filterNameByAZ} from '../actions/index'
import { Link } from "react-router-dom";
import Card from './Card.jsx'
import Paginado from "./Paginado";
export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const [currentPage,setCurrentPage] = useState(1) 
    const [countriesPerPage,setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)
    
    const paginado = (pageNumber) =>{
    
    setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
        setCurrentPage(1)
    }

    function handleFilterByRegion(e){
        dispatch(filteredByRegion(e.target.value))
    }
    function handleClickFilterPopulationASC(e){
        e.preventDefault();
        dispatch(filterPopulationASC())
    }
    function handleClickFilterPopulationDESC(e){
        e.preventDefault()
        dispatch(filterPopulationDESC())
    }
    function handleClickFilterNamebyAZ(e){
        e.preventDefault()
        dispatch(filterNameByAZ())
    }
    function handleClickFilterNamebyZA(e){
        e.preventDefault()
        dispatch(filterNameByZA())
    }

    return(
        <div>
            <Link to='/activity'> Crear actividad</Link>
            <h1>PI COUNTRIES</h1>
            <button onClick={e=>handleClick(e)}>Volver a cargar paises</button>
        <div>
            <button value='pupulation-' onClick={e=>handleClickFilterPopulationASC(e)}> Menor Poblacion</button>
            <button value='pupulation+' onClick={e=>handleClickFilterPopulationDESC(e)}> Mayor Poblacion</button>
            <button value='name' onClick={e=>handleClickFilterNamebyAZ(e)}>Nombre A-Z</button>
            <button value='name' onClick={e=>handleClickFilterNamebyZA(e)}>Nombre Z-A</button>
            <button value='activity'>Actividad</button>

            <select onChange={e=>handleFilterByRegion(e)}>
                <option value= 'All' >Todos</option>
                <option value= 'Asia'>Asia</option>
                <option value= 'Europe'>Europa</option>
                <option value= 'Africa'>Africa</option>
                <option value= 'Americas'>America</option>
                <option value= 'Oceania'>Oceania</option>
                <option value= ''>Desconocido</option>
            </select>

            <Paginado
            countriesPerPage = {countriesPerPage}
            allCountries = {allCountries.length}
            paginado =  {paginado}
            />
        </div>
        {
            currentCountry?.map((el) =>{
                return(
                    <div key={el.id}>
                    <Link to={'/home/'+ el.id}>
                    <Card name={el.name} flag={el.flag} region={el.region}/>
                    </Link>
                    </div>
                )
            })
        }
        </div>
    )
}