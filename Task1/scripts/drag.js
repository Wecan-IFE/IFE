// 操作面板拖动
function controldrag(){
var good=document.getElementById("control-title");
var	con=document.getElementById("control");
con.style.left = 20+"px";
con.style.top = 20+"px";
var x=0;
var y=0;
var flag=0;
good.addEventListener("mousedown",function(event){
	x=event.clientX-con.offsetLeft;
	y=event.clientY-con.offsetTop;
	flag=1; 
});
addEventListener("mousemove",function(event) {
	 if(flag==1){
		var out1=event.clientX-x;
		var out2=event.clientY-y;
		if(out1 > window.innerWidth - con.offsetWidth) {
		    out1 = window.innerWidth - con.offsetWidth;
		}
		if(out1 < 0) {
		    out1 = 0;
		}
		if(out2 > window.innerHeight - con.offsetHeight) {
		    out2 = window.innerHeight - con.offsetHeight;
		}
		if(out2 < 0) {
		    out2 = 0;
		}
         con.style.left=out1+"px";
         con.style.top=out2+"px";
    }
});
addEventListener("mouseup",function(event){
	flag=0;
});
}
// 指挥官信号面板拖动
function consoledrag(){
var good=document.getElementById("console-title");
var	con=document.getElementById("console");
con.style.right = 20+"px";
con.style.top = 20+"px";
var x=0;
var y=0;
var flag=0;
good.addEventListener("mousedown",function(event){
	x=event.clientX-con.offsetLeft;
	y=event.clientY-con.offsetTop;
	flag=1; 
});
addEventListener("mousemove",function(event) {
	 if(flag==1){
		var out1=event.clientX-x;
		var out2=event.clientY-y;
		if(out1 > window.innerWidth - con.offsetWidth) {
		    out1 = window.innerWidth - con.offsetWidth;
		}
		if(out1 < 0) {
		    out1 = 0;
		}
		if(out2 > window.innerHeight - con.offsetHeight) {
		    out2 = window.innerHeight - con.offsetHeight;
		}
		if(out2 < 0) {
		    out2 = 0;
		}
         con.style.left=out1+"px";
         con.style.top=out2+"px";
    }
});
addEventListener("mouseup",function(event){
	flag=0;
});
}
//性能面板拖动
function powerdrag(){
var good=document.getElementById("power-title");
var	con=document.getElementById("power");
con.style.left= 20+"px";
con.style.top = 50+"%";
var x=0;
var y=0;
var flag=0;
good.addEventListener("mousedown",function(event){
	x=event.clientX-con.offsetLeft;
	y=event.clientY-con.offsetTop;
	flag=1; 
});
addEventListener("mousemove",function(event) {
	 if(flag==1){
		var out1=event.clientX-x;
		var out2=event.clientY-y;
		if(out1 > window.innerWidth - con.offsetWidth) {
		    out1 = window.innerWidth - con.offsetWidth;
		}
		if(out1 < 0) {
		    out1 = 0;
		}
		if(out2 > window.innerHeight - con.offsetHeight) {
		    out2 = window.innerHeight - con.offsetHeight;
		}
		if(out2 < 0) {
		    out2 = 0;
		}
         con.style.left=out1+"px";
         con.style.top=out2+"px";
    }
});
addEventListener("mouseup",function(event){
	flag=0;
});
}
consoledrag();
controldrag();
powerdrag();

