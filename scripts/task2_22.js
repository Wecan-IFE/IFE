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
    function go(){
        var degMod=deg%360;
        degMod=degMod<0?degMod+360:degMod;
        switch (degMod) {
            case 0:
                if (positionY > 40) {
                    positionY -= 40;
                    square.style.top = positionY + "px";
                }
                break;
            case 90:
                if (positionX < 360) {
                    positionX += 40;
                    square.style.left = positionX + "px";
                }
                break;
            case 180:
                if (positionY < 360) {
                    positionY += 40;
                    square.style.top = positionY + "px";
                }
                break;
            case 270:
                if (positionX > 40) {
                    positionX -= 40;
                    square.style.left = positionX + "px";
                }
                break;
            default :
                alert("不能再走啦！")
        }
    }
    //向左右后转的闭包函数
    function turnPro(dirDeg){
       return function(){
           deg+=dirDeg;
           square.style.transform="rotate("+deg+"deg)";
        }

    }
    //向左右后转的函数
    function turn(dirDeg){
        deg+=dirDeg;
        square.style.transform="rotate("+deg+"deg)";
    }
    function transitionPro(dirDeg){
       return function(){
            var tempDeg=deg;
            deg=dirDeg;
            go();
            deg=tempDeg;
       }
    }
    function transition(dirDeg){
        var tempDeg=deg;
        deg=dirDeg;
        go();
        deg=tempDeg;
    }
    function movePro(dirDeg){
       return function(){
            turn(dirDeg);
            go();
       }
    }
    function move(dirDeg){
         turn(dirDeg);
         go();
    }
    function operate(){
        document.getElementById("go").onclick=go;
        document.getElementById("left").onclick=turnPro(-90);
        document.getElementById("right").onclick=turnPro(90);
        document.getElementById("back").onclick=turnPro(180);
        document.getElementById("traTop").onclick=transitionPro(0);
        document.getElementById("traLef").onclick=transitionPro(270);
        document.getElementById("traRig").onclick=transitionPro(90);
        document.getElementById("traBot").onclick=transitionPro(180);
        document.getElementById("movTop").onclick=movePro(0);
        document.getElementById("movLef").onclick=movePro(-90);
        document.getElementById("movRig").onclick=movePro(90);
        document.getElementById("movBot").onclick=movePro(180);

        document.getElementsByTagName("button")[0].onclick=function(){
            var cmd=document.getElementById("command").value;
            switch (cmd){
                case "GO":
                    go();
                    break;
                case "TUN LEF":
                    turn(-90);
                    break;
                case "TUN RIG":
                    turn(90);
                    break;
                case "TUN BAC":
                    turn(180);
                    break;
                 case "TRA TOP":
                    transition(0);
                    break;
                case "TRA LEF":
                    transition(270);
                    break;
                case "TRA RIG":
                    transition(90);
                    break;
                case "TRA BOT":
                    transition(180);
                    break;
                case "MOV TOP":
                    move(0);
                    break;
                case "MOV LEF":
                    move(-90);
                    break;
                case "MOV RIG":
                    move(90);
                    break;
                case "MOV BOT":
                    move(180);
                    break;
                default :
                    alert("请输入按钮中的命令")
            }
        }
    }
    operate();

};