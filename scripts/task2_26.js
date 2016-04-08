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
controldrag();
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
consoledrag();
// 操作面板
var control=document.getElementsByClassName("control");
for(var i=0;i<control.length;i++){
	new control($(this).attr("id"), "", $(this));
}
//添加飞船
var craft_1=document.getElementById("create-1");
var	body=document.getElementsByTagName('body')[0];
craft_1.addEventListener('click',function(){
	var div_1=document.createElement("div");  
    div_1.id="dirigible-1";
    var div_2=document.createElement("div");
    div_2.className="craft-1";
    var div_3=document.createElement("div");
    div_3.className="energy-1";
    var span=document.createElement("span");
    span.innerHTML="100%";
    div_2.appendChild(span);
    div_2.appendChild(div_3);
    div_1.appendChild(div_2);  
	body.appendChild(div_1);
});
// 旋转
var fly_1=document.getElementById("fly-1");
var barNum=100;
fly_1.addEventListener("click",function(event){
	var energyBar=document.getElementById('dirigible-1');
	energyBar.className="rotating";
	setInterval(function(){
	var energyNum=document.getElementsByClassName('craft-1')[0].getElementsByTagName('span')[0];
	var energyColor=document.getElementsByClassName('craft-1')[0].getElementsByClassName('energy-1')[0];
	barNum--;
	if(barNum<=0){
		barNum=0;
		energyBar.className="";
	}
	energyNum.innerHTML=barNum+'%';
	energyColor.style.width=barNum+"%";
},10);
});
// 能源耗尽

