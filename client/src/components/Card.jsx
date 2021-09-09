import React from "react";
export default function Card({name,flag,region}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{region}</h5>
            <img src={flag} alt='flag not found' width='200px' height='250px'></img>
        </div>
    )
}