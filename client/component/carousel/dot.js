import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import   './carousel.scss';

class Carousel extends React.Component {
    // static timer = 3;
    constructor(props) {
        super(props);
        this.state = {
            index: 0,  
            timer:''       
        }
        this.dotIndex = this.dotIndex.bind(this);
        // this.x = x;
        // var timer=2;
    }
/**
 * 轮播思路：
1、首先要有个盛放图片的容器，设置为单幅图片的宽高，且overflow：hidden，这样保证每次可以只显示一个图片 
2、Container内有个放图片的list进行position的定位 ，其中的图片采用float的方式，同时当图片进行轮播时，改变list的Left值使得其显示的图片发生变化。 
3、图片的轮播使用定时器，通过定时器改变list的Left值是的图片循环展示 
4、当鼠标滑动到图片上时，清除定时器，图片停止轮播，当鼠标移出时继续进行轮播 
5、图片上有一组小圆点用于与当前显示的图片相对应，同时可以通过点击的方式查看对应的图片 
6、图片可以通过点击进行左右滑动显示 
 */

 _dotActive(){
    var dots = document.getElementsByClassName("dot");
    var len = dots.length;
    for(var i=0 ;i<len ;i++){
        dots[i].className = "dot";
    }
    var index =2 ;
    for(var i=0;i<len;i++){
        if(index === parseInt(dots[i].getAttribute("index"))){
            dots[i].className = "dot active";
        }
    }
 }
eventBind(){
    
  /*点的点击事件*/

   //  var ind = parseInt(dots[2].getAttribute("index"));
    //  animation((index - ind)*(-600));
    //  index = ind;
    this._dotActive(); //这个作用域读取不到外面的，为什么？

 }
 dotIndex(add){
    let index = this.index;
    if(add){
        index++;
    }
    else{
        index--;
    }
    if(index>5){
        index = 1;
    }
    if(index<1){
        index = 5;
    } 
 }

    componentWillMount() {
    //    this.index = 1;
      
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }    
    componentDidMount() {
        // 可以在这里定义局部变量
        
        //   this.init();onClick只能在渲染后才能触发
       var dots = document.getElementsByClassName("dot");
       var next = document.getElementsByClassName("next")[0];
       var len = dots.length;
    //    next.onclick = function (e) {  
    //       console.log(dots);  
    //    }
    //    this.eventBind();
    //    this._dotActive();
    // 需要使用箭头函数
        this.interval = setInterval( () => {
            this.setState({
                index:Number(this.state.index)+1
            })
            if(this.state.index>5){
                this.setState({
                    index:1
                })
            }else if(this.state.index<1){
                this.setState({
                    index:5
                })
            }
            // this.autoPlay()
            console.log(this.state.index);
   
            for(var i=0 ;i<len ;i++){
                dots[i].className = "dot";
            }
            var index =2 ;
            for(var i=0;i<len;i++){
                if(index === parseInt(dots[i].getAttribute("index"))){
                    dots[i].className = "dot active";
                }
            }
       },1000) 
       
       
    }
 
//  init(){
//   this.eventBind();
//   this.autoPlay();
//  }
 

//  autoPlay = (() => {
//      console.log('autoPlay');
//  })
 //    timer =setInterval(function () {
//    this.animation(-600);
//    this.dotIndex(true);
//   },1000)
 stopAutoPlay() {
   clearInterval(this.interval);
 }

//   /*箭头事件的绑定*/
//   var pre = document.getElementsByClassName("pre")[0];
//   var next = document.getElementsByClassName("next")[0];
//   pre.onclick = function (e) {
//     this.dotIndex(false);
//     this.animation(600);
//   }
//   next.onclick = function (e) {
//    this.dotIndex(true);
//    this.animation(-600);
//   }
    animation(offset){
        var lists = document.getElementsByClassName("list")[0];
        var left = parseInt(lists.style.left.slice(0,lists.style.left.indexOf("p"))) + offset;
        if(left<-3000){
            lists.style.left = "-600px";
        }else if(left>-600){
            lists.style.left = "-3000px";
        }else{
            lists.style.left = left+"px";
        }
    }
    // 当点击需要做更新样式和动画
    dotClick(){
        // this.liEle.className
        // this.dotActive() ;
    }

    // 得出结论，click动作中不能再获取函数，不然出错
    preClick(){
        this._dotActive();
    }
    nextCilck(){

    }
    /*容器的hover事件*/
    mouseover(){
        this.stopAutoPlay();
    }
    mouseout(){
        this.autoPlay();
    }

    render() {
        //  ref={ele => {this.liEle = ele; }}
        var numbers = [1,2,3,4,5,6,7,8,9];
    //     const dotsEle = numbers.map(function(item,i){
    // 　　　　　　　return <li key={i} index={i} className="dot" onClick={this.dotClick}></li>})
        return (

   <div className="carousel-container" onMouseOver={this.mouseover.bind(this)} onMouseOut={this.mouseout.bind(this)}>
        <div className="list" >
            <img src="http://www.ftacademy.cn/subscription.jpg"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F5%2F000079465_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
            <img src="http://www.ftacademy.cn/subscription.jpg"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F5%2F000079465_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
            <img src="http://www.ftacademy.cn/subscription.jpg"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F5%2F000079465_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
            <img src="http://www.ftacademy.cn/subscription.jpg"/>
        </div>
        {/*<ul className="dots">
          {
    　　　　　　numbers.map(function(item,i){
    　　　　　　　　return <li key={i} index={i} className="dot" onClick={this.dotClick.bind(this)} ref={ele => {this.liEle = ele; }}></li>
    　　　　　　})
    　　　　}
        </ul>*/}
        {/*<ul className="dots">{dotsEle}</ul>*/}
        <ul className="dots">
            <li index='1' className="active dot" onClick={this.dotClick.bind(this)}ref={ele => {this.liEle1 = ele; }}></li>
            <li index='2' className="dot"  onClick={this.dotClick.bind(this)} ref={ele => {this.liEle2 = ele; }}></li>
            <li index='3' className="dot"  onClick={this.dotClick.bind(this)} ref={ele => {this.liEle3 = ele; }}></li>
            <li index='4' className="dot"  onClick={this.dotClick.bind(this)} ref={ele => {this.liEle4 = ele; }}></li>
            <li index='5' className="dot"  onClick={this.dotClick.bind(this)} ref={ele => {this.liEle5 = ele; }}></li>
        </ul>
        <div className="pre" onClick={this.preClick.bind(this)}> z </div>
        <div className="next" onClick={this.nextCilck.bind(this)}> y </div>
 </div> 
        );
    }

}
export default Carousel;
