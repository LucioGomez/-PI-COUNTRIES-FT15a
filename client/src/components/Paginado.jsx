import React from "react";
import '../modules/paginado.css'

export default function Paginado({countriesPerPage,allCountries,paginado}){
     const pageNumbers = []
     for (let i = 1; i <=Math.ceil(allCountries/countriesPerPage); i++) {
         pageNumbers.push(i)  
     }

     return(
         <nav>
             <ul className="pagination">
                 {
                     pageNumbers && pageNumbers.map(n =>(
                          <button onClick={()=>paginado(n)}> {n} </button> 
                    
                     ))
                 }
             </ul>
         </nav>
     )
}