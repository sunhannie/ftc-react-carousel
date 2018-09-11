import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import  { imgs } from  './imgs';

const Slide = (props) =>{
    
    let imgsNew = imgs.map(function(v,k){
        return <img src={v}  key={k} />
    });

    return (
            <div className="list" style={{left:'0px'}} >
                {imgsNew}
            </div>            
            )
}
export  default Slide;

