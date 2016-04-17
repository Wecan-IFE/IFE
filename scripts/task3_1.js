var btn=document.querySelectorAll(".btn");
var alert_container=document.querySelector("#alert-container");
var cancel=document.querySelector("#alert header button");
var abolish=document.querySelector("#cancel");
var confirm=document.getElementById("confirm");
var article=document.querySelector("#alert article")
function Pop(element,data,color){
	this.element=element;
	this.data=data;
	this.color=color;
	this.initElement();
	this.initEvent();
	this.drag();
	this.changeSize(this.bottom);
	this.changeSize(this.right);
	this.changeSize(this.rb);
}
Pop.prototype={
	//初始化事件
	initEvent:function(){
		var that=this;
		this.element.addEventListener("click",alertPop=function(event){
			that.style();
			alert_container.style.display="block";
		});
		confirm.removeEventListener("click",alertPop);
		abolish.removeEventListener("click",alertPop);
		abolish.addEventListener("click",alertCancel=function(event){
			alert_container.style.display="none";
		});
		cancel.addEventListener("click",alertCancel);
		alert_container.addEventListener("click",alertCancel);
		this.alert.addEventListener("click",function(event){
			that.stopBubble(event);
		});
	},//初始化元素
	initElement:function(){
		this.alert=document.getElementById("alert");
		this.alert_header=document.querySelector("#alert header");
		this.alert_footer=document.querySelector("#alert footer");
		this.right=document.getElementById("right");
		this.bottom=document.getElementById("bottom");
		this.rb=document.getElementById("rb");
	},
	//拖拽
	drag:function(){ 
		var startX=0;
		var startY=0;
		var flag=0;
		var that=this;
		this.alert_header.addEventListener("mousedown",function(event){
			startX=event.clientX-that.alert.offsetLeft-250;
			startY=event.clientY-that.alert.offsetTop-125;
			flag=1; 
		});
		addEventListener("mousemove",function(event) {
			 if(flag==1){
				var out1=event.clientX-startX;
				var out2=event.clientY-startY;
				if(out1 > window.innerWidth - that.alert.offsetWidth) {
				    out1 = window.innerWidth -that.alert.offsetWidth;
				}
				if(out1 < 0) {
				    out1 = 0;
				}
				if(out2 > window.innerHeight - alert.offsetHeight) {
				    out2 = window.innerHeight - alert.offsetHeight;
				}
				if(out2 < 0) {
				    out2 = 0;
				}
		        that.alert.style.left=out1+"px";
		        that.alert.style.top=out2+"px";
		    }
		});
		addEventListener("mouseup",function(event){
			flag=0;
		});
	},//模式匹配
	style:function(){
		this.alert_footer.style.backgroundColor=this.color;
		this.alert_header.style.backgroundColor=this.color;
		cancel.style.backgroundColor=this.color;
	},//拖拽改变大小
	changeSize:function(ele){
		var x=0;
		var y=0;
		var flag=0;
		var that=this;
		ele.addEventListener("mousedown",function(){
		    x=event.clientX-ele.offsetLeft;
		    y=event.clientY-ele.offsetTop;
		    flag=1; 
		});
		addEventListener("mousemove",function() {
		     if(flag==1){
		        var out1=event.clientX-x;
		        var out2=event.clientY-y;
		        if(out1 > window.innerWidth - ele.offsetWidth) {
		            out1 = window.innerWidth -ele.offsetWidth;
		        }
		        if(out1 < 0) {
		            out1 = 0;
		        }
		        if(out2 > window.innerHeight - ele.offsetHeight) {
		            out2 = window.innerHeight - ele.offsetHeight;
		        }
		        if(out2 < 0) {
		            out2 = 0;
		        }
		        switch(ele){
		        	case that.bottom:{
		        		that.right.style.height=out2+"px";
		        		that.alert.style.height=out2+"px";
		        		ele.style.top=out2+"px";
		        		break;
		        	}
		        	case that.right:{
		        		that.alert.style.width=out1+"px";
	        			ele.style.left=out1+"px";
	        			that.bottom.style.width=out1+"px";
	        			break;
		        	}
		        	case that.rb:{
		        		that.alert.style.width=out1+"px";
				        that.right.style.left=out1+"px";
				        that.bottom.style.width=out1+"px";
				        that.right.style.height=out2+"px";
				        that.alert.style.height=out2+"px";
				        that.bottom.style.top=out2+"px";
				        break;
		        	}
		        	default:{
		        		alert("erro");
		        	}
		        }		  
		    }
		});
		addEventListener("mouseup",function(event){
		    flag=0;
		});
	},//取消事件冒泡
	stopBubble:function(e){
		if(e&&e.stopPropagation){//非IE
		　　	e.stopPropagation();
		}
		else{//IE
		　　	window.event.cancelBubble=true;
		}
	}
}//给按钮创建对象
for(i in btn){
	var color=window.getComputedStyle(btn[i],null).getPropertyValue("background-color");
	new Pop(btn[i],btn[i].getAttribute("data"),color);
}

