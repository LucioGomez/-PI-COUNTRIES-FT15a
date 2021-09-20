import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";
import '../modules/searchbar.css'
export default function SearchBar(){
const dispatch = useDispatch()
const [name,setName] = useState("")

function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
    console.log(name)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getByName(name))
    setName("") 
}

return(
    <div className='topnav'>
        <input
        type ="text"
        placeholder ='Busqueda por nombre'
        onChange ={e=> handleInputChange(e)}
        className='input' />
       <button className="buttonSearch" type = 'submit' onClick={e=>handleSubmit(e)}> Buscar</button>
    </div>
)
}