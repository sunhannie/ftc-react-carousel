import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import  { imgs } from  './imgs';
// 轮播图，接口中应该有请求的图片地址，或者请求接口，但是此例子直接用一个接口来测试。得出一直在更新
const Slide = (props) =>{
    
    let imgsNew = imgs.map(function(v,k){
        return <img src={v}  key={k} />
    });
    console.log(imgsNew);
    return (
            <div className="list" style={{left:'0px'}} >
                {imgsNew}
            </div>            
            )
}
export  default Slide;

