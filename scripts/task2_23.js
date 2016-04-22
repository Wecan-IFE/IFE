/**
 * Created by 不沉的岛屿 on 2016/4/19 0019.
 */

window.onload = function () {
    //会移动的小方块
    var square = document.createElement("div");
    //小方块的方向和位置
    var deg = 0, positionX, positionY;
    //命令框
    var command = document.getElementById("command");
    //显示行数div
    var lineNum = document.getElementById("lineNum");
    //记录当前的行号
    var currentLime = 0;

    //初始化方块，小方块随即出现在表格中
    function init() {
        square.id = "square";
        var table = document.getElementsByTagName("table")[0];
        table.appendChild(square);
        var row = Math.floor(Math.random() * 10);
        var column = Math.floor(Math.random() * 10);
        positionX = 2 + row * 40;
        positionY = 2 + column * 40;
        square.style.top = positionY + "px";
        square.style.left = positionX + "px";
    }

    init();

    document.getElementById("execute").onclick = execute;
    document.getElementById("refresh").onclick = function () {
        command.value = "";
        lineNumChange();
        if (command.value.split("\n")[0] == "") {
            lineNum.childNodes[0].className = "";
        }
    };
    command.addEventListener("keyup", function () {
        lineNumChange();
        if (command.value.split("\n")[0] == "") {
            lineNum.childNodes[0].className = "";
        }
    });
    command.addEventListener("scroll", function (event) {
        lineNum.scrollTop = event.target.scrollTop;

    });


    //单条语句的执行
    function oneCmd(command) {
        var cmd = command.trim().split(" ");
        switch (cmd[0]) {
            case "GO":
            case "go":
                if (cmd.length == 1) {
                    go(1);
                } else if (cmd.length == 2 && /^\d+$/.test(cmd[1])) {
                    go(cmd[1]);
                } else {
                    return "error";
                }
                break;
            case "TUN":
            case "tun":
                action(cmd, turn);
                break;
            case "TRA":
            case "tra":
                action(cmd, transition);
                break;
            case "MOV":
            case "mov":
                action(cmd, move);
                break;
            default :
                if (cmd != "") {
                    return "error";
                } else {
                    return;
                }
        }
        //向前走
        function go(num) {
            var degMod = deg % 360;
            degMod = degMod < 0 ? degMod + 360 : degMod;
            switch (degMod) {
                case 0:
                    if (positionY > 40 * num) {
                        positionY -= 40 * num;
                        square.style.top = positionY + "px";
                    } else {
                        alert("不能再走了");
                    }
                    break;
                case 90:
                    if (positionX < 400 - num * 40) {
                        positionX += 40 * num;
                        square.style.left = positionX + "px";
                    } else {
                        alert("不能再走了！");
                    }
                    break;
                case 180:
                    if (positionY < 400 - num * 40) {
                        positionY += 40 * num;
                        square.style.top = positionY + "px";
                    } else {
                        alert("不能再走了！");
                    }
                    break;
                case 270:
                    if (positionX > 40 * num) {
                        positionX -= 40 * num;
                        square.style.left = positionX + "px";
                    } else {
                        alert("不能再走了！");
                    }
                    break;
            }
        }

        //在命令为tun,tra,mov的情况下的执行
        function action(cmd, func) {
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
                    return "error";
            }
            if (cmd.length == 2) {
                func(dirDeg, 1);
            } else if (cmd.length == 3 && /^\d+$/.test(cmd[2])) {
                func(dirDeg, cmd[2]);
            } else {
                return "error";
            }
        }

        //向左右后转的函数
        function turn(dirDeg, num) {
            deg += dirDeg * num;
            square.style.transform = "rotate(" + deg + "deg)";
        }

        //方向不变的平移操作
        function transition(dirDeg, num) {
            var tempDeg = deg;
            deg = dirDeg;
            go(num);
            deg = tempDeg;
        }

        //方向改变的平移操作
        function move(dirDeg, num) {
            turn(dirDeg, num);
            go(num);
        }
    }

    //执行每条语句并显示错误
    function execute() {
        var cmdArray = command.value.split("\n");
        for (var i = 0; i < cmdArray.length; i++) {
            if (oneCmd(cmdArray[i]) == "error") {
                lineNum.childNodes[i].className = "error";
            }
        }
    }

    //显示行号的变化
    function lineNumChange() {
        //获取textarea的行号
        function lineNumber() {
            var cmdArray = command.value.split("\n");
            var cmdLength = cmdArray.length;
            var charNum = 0;
            for (var i = 0; i < cmdLength; i++) {
                for (var j = 0; j < cmdArray[i].length; j++) {
                    if (/[\w\d]/.test(cmdArray[i][j])) {
                        charNum += 1;
                    } else {
                        charNum += 2;
                    }
                }
            }
            cmdLength += Math.floor(charNum / 30);
            return cmdLength;
        }
        //插入行号
        function insertLine(num) {
            var span;
            for (var i = 0; i < num; i++) {
                span = document.createElement("span");
                currentLime++;
                span.innerHTML = currentLime.toString();
                lineNum.appendChild(span);
            }
        }
        //删除行号
        function removeLine(num) {
            for (var i = 0; i < num; i++) {
                currentLime--;
                lineNum.removeChild(lineNum.lastChild);
            }
        }

        var changeNum = lineNumber() - lineNum.childNodes.length;
        if (changeNum > 0) {
            insertLine(changeNum);
        } else if (changeNum < 0) {
            removeLine(-changeNum);
        }
    }
};