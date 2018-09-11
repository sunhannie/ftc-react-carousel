import React from 'react';
import ReactDOM from 'react-dom';
import   './carousel.scss';
import Slide from './slide';
import  { imgs } from  './imgs';
class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1 ,
            isNext:false    
        }
        this.dotIndex = this.dotIndex.bind(this);
    }

    _dotActive(){
        var dots = document.getElementsByClassName("dot");
        var len = dots.length;
        for(var i=0 ;i<len ;i++){
            dots[i].className = "dot";
        }
        for(var i=0;i<len;i++){
            if(this.state.index === parseInt(dots[i].getAttribute("index"))){
                dots[i].className = "dot active";
            }
        }    
    }

    dotIndex(add){
        // console.log('dotIndex up this.state.index'+this.state.index);
        if(add){
            this.setState({
                index:Number(this.state.index)+1
            },() => {
                if(this.state.index > 6){
                    this.setState({
                        index:1
                    })
                }else if(this.state.index < 1){
                    this.setState({
                        index:6
                    })
                } 
            })
        }
        else{
            this.setState({
                index:Number(this.state.index)-1
            },() => {
                if(this.state.index > 6){
                    this.setState({
                        index:1
                    })
                }else if(this.state.index < 1){
                    this.setState({
                        index:6
                    })
                } 
            })
        }
        // console.log('dotIndex down this.state.index'+this.state.index);
    }

    componentWillMount() {
   
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }    
    // 能获取到行内标签，但是获取不到行外标签
    componentDidMount() {
        this.isNext = false;
        this.autoPlay();
    }

    autoPlay(){
        this.interval = setInterval( () => {
            this.animation(-600);
            this.dotIndex(true);
            this._dotActive();

            // console.log(this.state.index);
        },1000)
    }

    stopAutoPlay() {
        clearInterval(this.interval);
    }
    animation(offset){
        var lists = document.getElementsByClassName("list")[0];
        var left = parseInt(lists.style.left.slice(0,lists.style.left.indexOf("p"))) + offset;
        if(left<-3000){
            lists.style.left = "0px";
        }else if(left>0){
            lists.style.left = "-3000px";
        }else{
            lists.style.left = left+"px";
        }
    }

    dotClick(event){
        event.preventDefault();
        var dots = document.getElementsByClassName("dot");
        var len = dots.length;
        for(var i=0 ;i<len ;i++){
            dots[i].className = "dot";
        }
        
        let index = event.target.getAttribute("index");    

        this.setState((prevState) => {
            return { index:index } 
        })

        event.target.className = "dot active";
      
        this.animation(( this.state.index - index)*(-600));

    }


    preClick(){
        this.animation(600);
        this.dotIndex(false);
        this._dotActive();
    }
    nextCilck(){
        
        this.isFirstNext = true;
        this.animation(-600);
        this.dotIndex(true);
        
        this._dotActive();
        
        // 点击右边图片有立马更新，但是指引没有立马更新，再点一次才更新
    }

    mouseover(){
        this.stopAutoPlay();
    }
    mouseout(){
        this.autoPlay();
    }

    render() {
        return (

            <div className = {"carousel-container"} onMouseOver={this.mouseover.bind(this)} onMouseOut={this.mouseout.bind(this)} ref={"container"} style={{color:'red'}}>
                    <Slide />  
                    <ul className="dots">
                        {imgs.slice(1).map((v,k) => {       
                            if(k==0){
                                return <li index={`${k+1}`} className="active dot" key={k} onClick={this.dotClick.bind(this)}></li>
                            }else{
                                return <li index={`${k+1}`} className="dot" key={k} onClick={this.dotClick.bind(this)}></li>
                            }
                        }
                            
                        )}
                    </ul>
                    <div className="pre" onClick={this.preClick.bind(this)}> 《 </div>
                    <div className="next" onClick={this.nextCilck.bind(this)}> 》 </div>
            </div> 
        );
    }

}
export default Carousel;
