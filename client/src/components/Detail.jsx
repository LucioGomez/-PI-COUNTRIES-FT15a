import React from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import '../modules/detail.css'
export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myCountry = useSelector((state)=> state.detail)

    return(
        <div>
            {
                myCountry.length>0?
                <div className="divCountry">
                    <h1>{myCountry[0].name} .</h1>
                    <img src={myCountry[0].flag}/>
                    <h3>Capital:{myCountry[0].capital}.</h3>
                    <h3>Poblacion: {myCountry[0].population} habitantes.</h3>
                    <p/>
                    <h3>Subregion:{myCountry[0].subregion} .</h3>
                    <h3>Area: {myCountry[0].area} km2.</h3>
                    <h3>Continente: {myCountry[0].region} .</h3>
                    <div>
                        {
                            myCountry[0].activities.map((el)=>(
                                <div className="divActivities">
                                <p>_______________________________ </p>	
                                <h3>Nombre Actividad: {el.name}</h3>
                                <h3>Dificultad: {el.difficulty}</h3>
                                <h3>Duracion: {el.duration}</h3>
                                <h3>Temporada: {el.season}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>: <p>Loading...</p>
            }
            <Link to='/home'><button className="boton">Volver</button></Link>
        </div>
    )
}