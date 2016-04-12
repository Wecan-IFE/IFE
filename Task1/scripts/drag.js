// 操作面板拖动
// 指挥官信号面板拖动
//性能面板拖动
// 飞船状态面板拖动
function drag(id,title){
this.good=document.getElementById(title);
this.con=document.getElementById(id);
this.x=0;
this.y=0;
this.flag=0;
var that=this;
this.good.addEventListener("mousedown",function(event){
	that.x=event.clientX-that.con.offsetLeft;
	that.y=event.clientY-that.con.offsetTop;
	that.flag=1; 
});
this.good.addEventListener("mousemove",function(event) {
	 if(that.flag==1){
		var out1=event.clientX-that.x;
		var out2=event.clientY-that.y;
		if(out1 > window.innerWidth - that.con.offsetWidth) {
		    out1 = window.innerWidth - that.con.offsetWidth;
		}
		if(out1 < 0) {
		    out1 = 0;
		}
		if(out2 > window.innerHeight - that.con.offsetHeight) {
		    out2 = window.innerHeight - that.con.offsetHeight;
		}
		if(out2 < 0) {
		    out2 = 0;
		}
         that.con.style.left=out1+"px";
         that.con.style.top=out2+"px";
    }
});
this.good.addEventListener("mouseup",function(event){
	that.flag=0;
});
}
new drag("control","control-title");
new drag("console","console-title");
new drag("power","power-title");
new drag("craftInfo","craftInfo-title");

