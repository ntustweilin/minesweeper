//Global Variable
let mapSize = 9;
let mapArr;
let second = 0;
let int; 

function setMap99() {
    //變數宣告
    
    //設置所有按鈕
    setMapButton(mapSize);
    //設置地圖陣列
    mapArr = setMapArray() //[9][9] with bomb
    // console.log(...mapArr);
}

function setMapButton(mapSize) {
    let x = document.getElementById("game-zone");
    for (let i = 0; i < mapSize ** 2; ++i) {
        let q = document.createElement("button");
        q.setAttribute("class", "timer");
        q.setAttribute("onclick", "buttonClick(this)");
        q.setAttribute("id", i);
        let z = document.createElement("div");
        z.setAttribute("class", "content-box");
        z.append(q);
        x.append(z);
    }
}

function setMapArray() {
    let arr = new Array(9);
    let bomb = 10;

    for (let i = 0; i < 9; ++i) {
        arr[i] = new Array(9).fill(0);
    }
    for (let i = 0; i < bomb; ++i) {
        let [x, y] = [randomInt(), randomInt()];
        if (arr[x][y] == "*") {
            i--;
        } else {
            arr[x][y] = "*"
        }
    }
    return arr;
}

function randomInt() {
    return Math.floor(Math.random() * 9);
}

function buttonClick(which) {
    //時間開始
    timerStart(which);
    //接收按鈕座標
    let x = parseInt(which.id % 9);
    let y = parseInt(which.id / 9);
    //翻開按鈕
    buttonHidden(which);
    //顯示數字or炸彈
    let mines = checkSurroundMines(x, y); //mines number //9=dead
    showDivContent(which, mines);
}

function buttonHidden(pointer) {
    pointer.style.display = "none";
}

function checkSurroundMines(x, y) {
    if(mapArr[x][y]=="*") {return "*";}
    let aroundArr = [[-1, -1],[0, -1],[1, -1],
                     [-1, 0],[1, 0],
                     [-1, 1],[0, 1],[1, 1]];
    let mines = 0;
    aroundArr.forEach((value)=>{
        let newX = x+value[0];
        let newY = y+value[1];
        if(newX>=0 &&newX<9
        && newY>=0 &&newY<9
        &&mapArr[newX][newY]=="*")
            mines++;
        
    })
    return mines;
}

function showDivContent(pointer, mines) {
    console.log(pointer.parentElement);
    let z = pointer.parentElement;
    z.textContent = mines;
}

function timerStart(which) {
    if(which.className){
        let allTimer = document.getElementsByClassName("timer");
        while (allTimer[0]) {
            allTimer[0].classList.remove("timer");
        }
        start();
    }
}
//===================================================

function reset() { 
    window.clearInterval(int); 
    second=0;
    document.getElementsByClassName('time')[0].innerHTML='0';
    
} 
function start() { 
    int=setInterval(timer,1000);
} 
    function timer() {   
        second+=1;
        document.getElementsByClassName("time")[0].innerHTML = second;
    } 
