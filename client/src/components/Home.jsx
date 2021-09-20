import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCountries, filteredByRegion,filterName,filterByPopulation,filterByActivity} from '../actions/index'
import { Link } from "react-router-dom";
import Card from './Card.jsx'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../modules/home.css'



export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const [currentPage,setCurrentPage] = useState(1) 
    const [countriesPerPage,setCountriesPerPage] = useState(10)
    const [order, setOrder] = useState('')
    const [filterPopulation, setfilterPopulation] = useState('')

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

    function handleFilterName(e){
        e.preventDefault()
        dispatch(filterName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    
    function  handleFilterActivity(e) {
        dispatch(filterByActivity())
        setCurrentPage(1)
    }

    function handlefilterPopulation(e){
        e.preventDefault()
        dispatch(filterByPopulation(e.target.value))
        setCurrentPage(1)
        setfilterPopulation(`Ordenado ${e.target.value}`)
    }
    return(
        <div >
            <h1 className='h1'>PI COUNTRIES</h1>
             <SearchBar className='searchBar'/>
            <button className="buttonMax" onClick={e=>handleClick(e)}>Volver a cargar paises</button>
        <div >
            <select className='select'onChange={e=>handlefilterPopulation(e)}>
            <option >------</option>
            <option value='ASC' > Menor Poblacion</option>
            <option value='DESC' > Mayor Poblacion</option>
            </select>
            <select className='select' onChange={e=>handleFilterName(e)}>
            <option value='ASC' >Nombre A-Z</option>
            <option value='DESC' >Nombre Z-A</option>
            </select>
            <select className='select' onChange={e=>handleFilterByRegion(e)}>
                <option value= 'All' >Todos</option>
                <option value= 'Asia'>Asia</option>
                <option value= 'Europe'>Europa</option>
                <option value= 'Africa'>Africa</option>
                <option value= 'Americas'>America</option>
                <option value= 'Oceania'>Oceania</option>
                <option value= ''>Desconocido</option>
            </select>
            <Link to='/activity'>
            <button className="button2"> Crear actividad </button>
            </Link>
            <button className="button2" onClick={handleFilterActivity}>Paises con actividadades</button>
            <Paginado
            countriesPerPage = {countriesPerPage}
            allCountries = {allCountries.length}
            paginado =  {paginado}
            />
        </div>
        {
            currentCountry?.map((el) =>{
                return(
                    <div key={el.id} className='card'>
                    <Link to={'/home/'+ el.id}>
                    <Card  name={el.name} flag={el.flag} region={el.region}/>
                    </Link>
                    </div>
                )
            })
        }
        </div>
    )
}