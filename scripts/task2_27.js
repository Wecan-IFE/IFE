// 初始化轨道
var pathway=document.getElementsByClassName("pathway");
function initpathway(){
	for(var i=0;i<pathway.length;i++){
		pathway[i].style.marginTop=-150-i*50+"px";
		pathway[i].style.marginLeft=-150-i*50+"px";
		pathway[i].style.borderRadius=150+i*50+"px";
		pathway[i].style.height=300+i*100+"px";
		pathway[i].style.width=300+i*100+"px";
	}
}
initpathway();
//创建对象
var body=document.getElementsByTagName("body")[0];
function object(id,parentEle){
	this.id=id;
	this.parentEle=parentEle;
	this.initBtn();
	this.initEvent();
}
object.prototype={
	initBtn:function(){
		this.btnCreate=document.createElement("button");
		this.btnDestroy=document.createElement("button");
		this.btnFly=document.createElement("button");
		this.btnStop=document.createElement("button");

		this.btnCreate.innerText="创建飞船";
		this.btnDestroy.innerText="摧毁飞船";
		this.btnFly.innerText="飞行";
		this.btnStop.innerText="停止";

		this.parentEle.appendChild(this.btnCreate);
		this.parentEle.appendChild(this.btnDestroy);
		this.parentEle.appendChild(this.btnFly);
		this.parentEle.appendChild(this.btnStop);
	},
	createCraft:function(){
		this.createCraftNew=document.getElementById("console-main");
		if(document.getElementsByClassName('dirigible')[this.id]){
			var p=document.createElement("p");
			p.innerText="[注意]"+parseInt(this.id+1)+"号飞船已在轨道中了！";
			p.className="warning";
			this.createCraftNew.appendChild(p);
			return false;
		}
		var p=document.createElement("p");
		if(Math.random()>0.1){
			this.div_1=document.createElement("div");
			this.div_2=document.createElement("div");
			this.div_3=document.createElement("div");
			this.span=document.createElement("span");

			this.div_1.className="dirigible rotating";
			this.div_2.className="craft";
			this.div_3.className="energy";
			this.span.innerText="100%";
			p.innerText="[消息]"+parseInt(this.id+1)+"号飞船创建成功！";
			p.className="info";

			this.div_2.appendChild(this.div_3);
			this.div_2.appendChild(this.span);
			this.div_1.appendChild(this.div_2);
	        body.appendChild(this.div_1);
	        this.createCraftNew.appendChild(p);

			this.div_1.style.width=300+this.id*100+"px";
			this.div_1.style.height=300+this.id*100+"px";
			this.div_1.style.marginTop=-150-this.id*50+"px";
			this.div_1.style.borderRadius=150+i*50+"px";
			this.div_1.style.marginLeft=-150-this.id*50+"px";
			this.div_2.style.left=125+this.id*50+"px";
		}else{
			p.innerText="[注意]"+parseInt(this.id+1)+"号飞船创建的指令丢包了！";
			p.className="warning";
			this.createCraftNew.appendChild(p);
		}
	},
	destroyCraft:function(){
		var p=document.createElement("p");
		if(Math.random()>0.1){
			p.innerText="[消息]"+parseInt(this.id+1)+"号飞船已销毁！";
			p.className="info";
			this.createCraftNew.appendChild(p);
			body.removeChild(this.div_1);
		}else{
			p.innerText="[注意]销毁"+parseInt(this.id+1)+"号飞船的指令丢包了！";
			p.className="warning";
			this.createCraftNew.appendChild(p);
		}
	},
	power:function(){
		var that=this;
		var power=document.querySelectorAll(".powerSelect ul li label input");
		for(var i=0;i<power.length;i++){
			if(power[i].checked){
				that.powerGrade=power[i].value;
			}
		}
	},
	energy:function(){
		var that=this;
		var energy=document.querySelectorAll(".energySelect ul li label input");
		for(var i=0;i<energy.length;i++){
			if(energy[i].checked){
				that.energyGrade=energy[i].value;
			}
		}
	},
	flyCraft:function(){
		var p=document.createElement("p");
		if(Math.random()>0.1){
			var that=this;
			clearInterval(this.energyIncrease);
			if (this.energyReduce) {
	            clearInterval(this.energyReduce);
	        }
	        this.power();
			this.div_1.style.animationPlayState="running";
			this.div_1.style.animationDuration=12/parseInt(this.powerGrade)+"s";
			this.energyReduce=setInterval(function(){
				var energyNum=that.span.innerText.match(/[0-9]+/g);
				energyNum--;
				that.div_3.style.width=energyNum+"%";
				that.span.innerText=energyNum+"%";
				if(energyNum <= 0){
					that.stopCraft();
					energyNum=0;
				}
				if(energyNum <= 40){
					that.div_3.style.backgroundColor = "#c83b38";
				}
			},1000/(3+2*parseInt(that.powerGrade)));
			p.innerText="[消息]"+parseInt(this.id+1)+"号飞船启动成功！";
			p.className="info";
			this.createCraftNew.appendChild(p);
		}else{
			p.innerText="[注意]启动"+parseInt(this.id+1)+"号飞船的指令丢包了！";
			p.className="warning";
			this.createCraftNew.appendChild(p);
		}
	},
	stopCraft:function(){
		var p=document.createElement("p");
		if(Math.random()>0.1){
			var that=this;
			this.energy();
			this.div_1.style.animationPlayState="paused";
			clearInterval(this.energyReduce);
			if (this.energyIncrease) {
	            clearInterval(this.energyIncrease);
	        }
			this.energyIncrease=setInterval(function(){
				var energyNum=that.span.innerText.match(/[0-9]+/g);
				if(energyNum<100){
					energyNum++;
					that.div_3.style.width=energyNum+"%";
					that.span.innerText=energyNum+"%";
					if (energyNum >= 40) {
	                    that.div_3.style.backgroundColor = "#2fa06c";
	                }
				}
			},1000/(1+parseInt(that.energyGrade)));
			p.innerText="[消息]"+parseInt(this.id+1)+"号飞船已熄火！";
			p.className="info";
			this.createCraftNew.appendChild(p);
		}else{
			p.innerText="[注意]停止"+parseInt(this.id+1)+"号飞船的指令丢包了！";
			p.className="warning";
			this.createCraftNew.appendChild(p);
		}
	},
	initEvent:function(){
		var that=this;
		this.btnCreate.addEventListener("click",function(){
			that.createCraft();
		});
		this.btnDestroy.addEventListener("click",function(){
			that.destroyCraft();
		});
		this.btnFly.addEventListener("click",function(){
			that.flyCraft();
		})
		this.btnStop.addEventListener("click",function(){
			that.stopCraft();
		})
	}
}
//对象
var init=document.querySelectorAll(".control");
for(var i=0;i<init.length;i++){
	new object(i,init[i]);
}
//指挥官信号面板滚动
function scroll(){
	var scroll=document.getElementById("console-main");
	scroll.scrollTop=scroll.scrollHeight;
}
setInterval("scroll()",10);
//初始化性能选项
function initPower(){
	var power=document.querySelectorAll(".powerSelect ul li label input");
	var energy=document.querySelectorAll(".energySelect ul li label input");
	var num_1=Math.floor(Math.random()*3);
	var num_2=Math.floor(Math.random()*3);
	for(var i=0;i<energy.length;i++){
		if(num_1==i){
			energy[i].checked="true";
		}
	}
	for(var j=0;j<power.length;j++){
		if(num_2==j){
			power[j].checked="true";
		}
	}
}
initPower();