window.onload = function () {
    //小方块的当前行列及方向,初始值为6,6
    var row = 6, column = 6, direction="top";
    //创建初始的方向div
    var directionDiv = document.createElement("div");

    //指定小方块的位置，初始值为：6,6
    var positionRow = document.getElementsByTagName("tr")[row];
    var position = positionRow.getElementsByTagName("td")[column];

    //初始化，给出小方块的初始位置和方向
    function init() {
        directionDiv.style.position = "absolute";
        directionDiv.style.backgroundColor="#00f";
        position.style.backgroundColor = "#f00";
        setDirection();
    }

    init();

    //设置小方块的方向
    function setDirection() {
        switch (direction) {
            case "top":
                directionStyle("100%","10px",0,0,"top");
                break;
            case "bottom":
                directionStyle("100%","10px","28px",0,"bottom");
                break;
            case "left":
                directionStyle("10px","100%",0,0,"left");
                break;
            case "right":
                directionStyle("10px","100%",0,"28px","right");
                break;
        }

        function directionStyle(width,height,top,left,dir){
            directionDiv.style.width = width;
            directionDiv.style.height = height;
            directionDiv.style.top=top;
            directionDiv.style.left=left;
            position.appendChild(directionDiv);
            direction=dir;
        }
    }

    //向前移动
    function forward() {
        switch (direction){
            case "top":
                if(row>1){
                    forwardSet(-1,0);
                }
                break;
            case "bottom":
                if(row<10){
                    forwardSet(1,0);
                }
                break;
            case "left":
                if(column>1){
                     forwardSet(0,-1);
                }

                break;
            case "right":
                if(column<10){
                    forwardSet(0,1);
                }
                break;
        }
        function forwardSet(rowChange,columnChange){
            position.style.backgroundColor="transparent";
            position.removeChild(position.firstElementChild);
            row+=rowChange;
            column+=columnChange;
            positionRow = document.getElementsByTagName("tr")[row];
            position=positionRow.getElementsByTagName("td")[column];
            position.style.backgroundColor="#f00";
            setDirection();
        }
    }

    //向左转
    function left() {
        switch(direction){
            case "top":
                direction="left";
                setDirection();
                break;
            case "left":
                direction="bottom";
                setDirection();
                break;
            case "bottom":
                direction="right";
                setDirection();
                break;
            case "right":
                direction="top";
                setDirection();
                break;
        }
    }

    //向右转
    function right() {
        switch(direction){
            case "top":
                direction="right";
                setDirection();
                break;
            case "right":
                direction="bottom";
                setDirection();
                break;
            case "bottom":
                direction="left";
                setDirection();
                break;
            case "left":
                direction="top";
                setDirection();
                break;
        }
    }

    //向后转
    function back(){
        switch(direction){
            case "top":
                direction="bottom";
                setDirection();
                break;
            case "bottom":
                direction="top";
                setDirection();
                break;
            case "left":
                direction="right";
                setDirection();
                break;
            case "right":
                direction="left";
                setDirection();
                break;
        }
    }

    function operate(){
        document.getElementById("go").onclick=forward;
        document.getElementById("left").onclick=left;
        document.getElementById("right").onclick=right;
        document.getElementById("back").onclick=back;
        document.getElementsByTagName("button")[0].onclick= function (e) {
            console.log("A");
            var command=document.getElementById("command").value;
            switch(command){
                case "GO":
                    forward();
                    break;
                case "TUN LEF":
                    left();
                    break;
                case "TUN RIG":
                    right();
                    break;
                case "TUN BAC":
                    back();
                    break;
                default :
                    alert("请输入按钮中包含的值！")
            }
        }
    }

    operate();

};
