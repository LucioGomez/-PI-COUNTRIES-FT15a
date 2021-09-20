import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link,useHistory } from "react-router-dom";
import { getCountries,postActivity} from '../actions/index'
import '../modules/createactivity.css'
function validate(input) {
    var valoresAceptados = /^[0-9]+$/;
    let errors = {};
    if(!input.name){
        errors.name = '*Se requiere un nombre*'
    }else if(!input.duration){
        errors.duration = '*Se requiere un tiempo de duracion*'
    }else if(!input.duration.match(valoresAceptados)){
        errors.duration2 ='*Solo se puede agregar numeros*'
    }else{
        errors.ok = true;
    }
    return errors
}


 function CreateActivity(){
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const history = useHistory();
    const [input,setInput] = useState({
        name : '',
        difficulty: '',
        duration:'',
        season:'',
        countryid: []
    })
    const [errors,setErrors] = useState({})
    
    function  handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value  
        }))
        console.log(input)
    }
    
    function handleChekDifficulty(e) {
    if(e.target.checked){setInput({
        ...input,
        difficulty: e.target.value
    })
    }
    
    }
    function handleChekSeason(e) {
        if(e.target.checked){setInput({
            ...input,
                season: e.target.value
            })
        }
    }
    function handleSelect(e) {
        setInput({
            ...input,
            countryid: [...input.countryid , e.target.value]
        })
        console.log(input)
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit input', input)
        dispatch(postActivity(input))
        alert("Actividad creada")
        setInput({
            name : "",
            difficulty: "",
            duration:"",
            season:"",
            countryid: []
        })
    };

    function  handleDelete(el) {
        setInput({
            ...input,
            countryid : input.countryid.filter(country => country !== el)
        })
    }

    useEffect(()=>{
        dispatch(getCountries());
    },[dispatch])


    return(
        <div className="General">
            <Link to='/home'><button className="button3">Volver</button></Link>
            <h1>Crear actividad:</h1>
            <form onSubmit={(ev) => handleSubmit(ev)}>
                <div className='subDiv'>
                    <label className="label">Nombre:</label>
                    <input type="text" 
                    value={input.name}
                    name= "name"
                    className='inputActivity'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                     <p>{errors.name}</p>   
                        )}
                </div>
                <div className='subDiv'>
                    <label className="label" >Dificultad:</label>
                    <label className="label" >
                    <input type="checkbox"
                    name="difficulty"
                    value = "1"
                    onChange={(e)=>handleChekDifficulty(e)}
                    />1</label>    
                    <label className="label">
                    <input type="checkbox"
                    name="difficulty"
                    value = "2"
                    onChange={(e)=>handleChekDifficulty(e)}
                    />2</label>    
                    <label className="label">
                    <input type="checkbox"
                    name="difficulty"
                    value = "3"
                    onChange={(e)=>handleChekDifficulty(e)}
                    />3</label>    
                     <label className="label">
                    <input type="checkbox"
                    name="difficulty"
                    value = "4"
                    onChange={(e)=>handleChekDifficulty(e)}
                    />4</label>
                    <label className="label">
                    <input type="checkbox"
                    name="difficulty"
                    value = "5"
                    onChange={(e)=>handleChekDifficulty(e)}
                    />5</label>                                      
                </div>
                <div className='subDiv'>
                <label className="label">Duracion:</label>
                    <input type="text" 
                    value={input.duration}
                    name= "duration"
                    className='inputActivity'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.duration && (
                     <p>{errors.duration}</p>   
                        ) } : {errors.duration2 && (
                            <p>{errors.duration2}</p>   
                        )                    }
                </div>
                <div className='subDiv'>
                    <label className="label">Temporada:</label>
                    <label className="label">
                    <input type="checkbox"
                     name='Verano'
                    value = "Invierno"
                    onChange={(e)=>handleChekSeason(e)}
                    />Invierno</label>    
                     <label className="label">
                    <input type="checkbox"
                    name='Verano'
                    value = "Verano"
                    onChange={(e)=>handleChekSeason(e)}
                    />Verano</label>    
                    <label className="label">
                    <input type="Checkbox"
                    name="Otoño"
                    value = "Otonio"
                    onChange={(e)=>handleChekSeason(e)}
                    />Otoño</label>    
                     <label className="label">
                    <input type="checkbox"
                    name="Primavera"
                    value = "Primavera"
                    onChange={(e)=>handleChekSeason(e)}
                    />Primavera</label>
                    </div>
                <select className='selectActivity'onChange={(e)=>handleSelect(e)}>
                    {countries.map((el)=> (
                        <option value={el.id}>{el.name}</option>
                    ))}
                </select>
           {
               errors.ok && (
                   <button className="button3" type='submit' >Agregar</button>
                   ) 
                }
            </form>
               {input.countryid.map(el=>
                <div> 
                    <button className="button3" onClick={()=> handleDelete(el)}>{el}</button>
                </div>
               )}
        </div>

    )
}

export default CreateActivity;