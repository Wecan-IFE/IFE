
/**
 * Created by 不沉的岛屿 on 2016/4/19 0019.
 */

window.onload=function(){
    //会移动的小方块
    var square=document.createElement("div");
    //小方块的方向和位置
    var deg=0,positionX,positionY;

    //初始化方块，小方块随即出现在表格中
    function init(){
        square.id="square";
        var table=document.getElementsByTagName("table")[0];
        table.appendChild(square);
        var row=Math.floor(Math.random()*10);
        var column=Math.floor(Math.random()*10);
        positionX=2+row*40;
        positionY=2+column*40;
        square.style.top=positionY+"px";
        square.style.left=positionX+"px";
    }
    init();
    //向前走
    function go(num){
        var degMod=deg%360;
        degMod=degMod<0?degMod+360:degMod;
        switch (degMod) {
            case 0:
                if (positionY > 40*num) {
                    positionY -= 40*num;
                    square.style.top = positionY + "px";
                }else{
                    alert("不能再走了");
                }
                break;
            case 90:
                if (positionX <400-num*40 ) {
                    positionX += 40*num;
                    square.style.left = positionX + "px";
                }else{
                    alert("不能再走了！");
                }
                break;
            case 180:
                if (positionY < 400-num*40) {
                    positionY += 40*num;
                    square.style.top = positionY + "px";
                }else{
                    alert("不能再走了！");
                }
                break;
            case 270:
                if (positionX > 40*num) {
                    positionX -= 40*num;
                    square.style.left = positionX + "px";
                }else{
                    alert("不能再走了！");
                }
                break;
        }
    }
    var executeBtn=document.getElementById("execute");
    executeBtn.onclick=a();
        function a(){
            return function(){
                execute();
            }
        }

    //向左右后转的函数
    function turn(dirDeg,num){
        deg+=dirDeg*num;
        square.style.transform="rotate("+deg+"deg)";
    }
    //方向不变的平移操作
    function transition(dirDeg,num){
        var tempDeg=deg;
        deg=dirDeg;
        go(num);
        deg=tempDeg;
    }
    //方向改变的平移操作
    function move(dirDeg,num){
        turn(dirDeg,num);
        go(num);
    }
   //单条语句的执行
    function oneCmd(command){
        var cmd=command.trim().split(" ");
        switch (cmd[0]){
            case "GO":
            case "go":
                if(cmd.length==1){
                    go(1);
                }else if(cmd.length==2&&/^\d+$/.test(cmd[1])){
                    go(cmd[1]);
                }else{
                    console.log("go");
                }
                break;
            case "TUN":
            case "tun":
                action(cmd,turn);
                break;
            case "TRA":
            case "tra":
                action(cmd,transition); 
                break;
            case "MOV":
            case "mov":
                action(cmd,move);
                break;
            default :
                console.log("xxx");
        }
    }
    //在命令为tun,tra,mov的情况下的执行
    function action(cmd,func){
        var dirDeg;
        switch (cmd[1]) {
            case "TOP":
            case "top":
                dirDeg = 0;
                break;
            case "LEF":
            case "lef":
                dirDeg = -90;
                break;
            case "RIG":
            case "rig":
                dirDeg = 90;
                break;
            case "BOT":
            case "bot":
                dirDeg = 180;
                break;
            default :
                console.log("xxx");
        }
        if(cmd.length==2){
            func(dirDeg,1);
        }else if(cmd.length==3&&/^\d+$/.test(cmd[2])){
            func(dirDeg,cmd[2]);
        }else{
            console.log("xxx");
        }
    }
    
    function execute(){
        var cmdArray=document.getElementById("command").value.split("\n");
        for(var i=0;i<cmdArray.length;i++){
            oneCmd(cmdArray[i]);
        }
    }

};