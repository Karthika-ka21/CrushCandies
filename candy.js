var candies=["Blue","Green","Orange","Yellow","Purple","Red"]
var board=[];
var columns=9;
var rows=9;
var score=0;
var curtile;
var othertile;

window.onload= function(){
    startGame();

    window.setInterval(function(){
        crushcandy();
        slidecandy();
        generatecandy();
    },100)
}

function randomCandy(){
    return candies[Math.floor(Math.random()*candies.length)];//0-5.99
}
function startGame(){
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
            //<img id="0-0" src="./images/Red.png">
            let tile=document.createElement("img");
            tile.id=r.toString()+"-"+c.toString();
            tile.src="./images/"+randomCandy()+".png"

            //drag functionality
            tile.addEventListener("dragstart",dragStart);//click on a candy,initialize drag process
            tile.addEventListener("dragover",dragOver);//clicking candy,moving mouse to drag the candy
            tile.addEventListener("dragEnter",dragEnter);//dragging onto another candy
            tile.addEventListener("dragleave",dragLeave);//leave candy over another candy
            tile.addEventListener("drop",dragDrop);//dropping a candy over another candy
            tile.addEventListener("dragend",dragEnd);//after drag process completed, we swap candies
            

            document.getElementById("board").append(tile);
            row.push(tile)

        }
        board.push(row);
    }
    console.log(board);
}
function dragStart(){
    //this refers to tile that was clicked on for dragging
    curtile=this;
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(e){
    e.preventDefault();
}
function dragDrop(){
    //this refers to target tile that was dropped on
    othertile=this;
}
function dragEnd(){

    if(curtile.src.includes("blank")||othertile.src.includes("blank")){
        return;
    }

    let currcoords=curtile.id.split("-");//id="0-0"->["0","0"]
    let r= parseInt(currcoords[0]);
    let c=parseInt(currcoords[1]);

    let othercoords=othertile.id.split("-");
    let r2=parseInt(othercoords[0]);
    let c2=parseInt(othercoords[1]);

    let moveleft = c2 == c-1 && r==r2;
    let moveright = c2 == c+1 && r==r2;

    let moveup = r2 == r-1 && c==c2;
    let movedown = r2 == r+1 && c==c2;

    let isAdjacent=movedown||moveleft||moveright||moveup

    if(isAdjacent){
    let currImg=curtile.src;
    let otherImg=othertile.src;
    curtile.src=otherImg;
    othertile.src=currImg;

    let validmove=checkvalid();
    if(!validmove){
        let currImg=curtile.src;
        let otherImg=othertile.src;
        curtile.src=otherImg;
        othertile.src=currImg;
    }
    }
}

function crushcandy(){
    crushthree();
    document.getElementById("score").innerText=score;
}

function crushthree(){
    //check rows
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-2;c++){
            let candy1=board[r][c];
            let candy2=board[r][c+1];
            let candy3=board[r][c+2];
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                candy1.src="./images/blank.png";
                candy2.src="./images/blank.png";
                candy3.src="./images/blank.png";
                score+=10;
            }
        }
    }
    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-2;r++){
            let candy1=board[r][c];
            let candy2=board[r+1][c];
            let candy3=board[r+2][c];
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                candy1.src="./images/blank.png";
                candy2.src="./images/blank.png";
                candy3.src="./images/blank.png";
                score+=10;
            }
        }
    }

}
function checkvalid(){
   //check rows
   for(let r=0;r<rows;r++){
    for(let c=0;c<columns-2;c++){
        let candy1=board[r][c];
        let candy2=board[r][c+1];
        let candy3=board[r][c+2];
        if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
            return true;
        }
    }
    }
 //check columns
 for(let c=0;c<columns;c++){
    for(let r=0;r<rows-2;r++){
        let candy1=board[r][c];
        let candy2=board[r+1][c];
        let candy3=board[r+2][c];
        if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
            return true;
        }
    }

  
}
    false;
}

function slidecandy(){
    for(let c=0;c<columns;c++){
        let ind=rows-1;
        for(let r=columns-1;r>=0;r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src=board[r][c].src;
                ind-=1;
            }
        }

        for(let r= ind;r>=0;r--){
            board[r][c].src="./images/blank.png";
        }
    }
}
function generatecandy(){
    for(let c=0;c<columns;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src="./images/"+randomCandy()+".png";
        }
    }
}

