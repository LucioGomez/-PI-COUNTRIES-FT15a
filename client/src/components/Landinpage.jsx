import React from "react";
import { Link } from "react-router-dom";
import '../modules/landinpage.css'

export default function LandingPage(){
    return(
        <div className="titulos" >
            <h1 className="titulos">Bienvendido PI COUNTRIES </h1>
            <Link to='/home'>
                <button className='buttonLanding'>Ingresar</button>
            </Link>
        </div>
    )
}