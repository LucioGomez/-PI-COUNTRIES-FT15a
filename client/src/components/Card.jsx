import React from "react";
import clases from '../modules/card.css'
export default function Card({name,flag,region}){
    return(
        <div className={`${clases.divCard}`} >
            <h2 className={`${clases.titulos}`}>{name}</h2>
            <h5 className={`${clases.elementos}`}>{region}</h5>
            <img src={flag} alt='flag not found' width='200px' height='250px'></img>
        </div>
    )
}