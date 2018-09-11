import React from 'react';
import ReactDOM from 'react-dom';
import  { imgs } from  './imgs';
const Dots = (props) =>{
    
    let lis = imgs.slice(1).map(function(v,k){
        return <li index={`${k+1}`} className="dot" key={k}></li>
    });
    console.log(lis);
    return (
            <ul>
                {lis}
              </ul>        
            )
}
export  default Dots;

