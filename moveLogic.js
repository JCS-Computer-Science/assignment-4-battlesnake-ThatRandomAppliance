    
//     function gridMaker(height,width,myBody,sneks,defaultVal = 1) {
//         let gridUC = [];
//     for (let h = 0; h < height; h++) {
//         gridUC[h] = [];
//         for (let w = 0; w < width; w++) {
//             // let mySeg = myBody[w]
//             gridUC[h][w] = defaultVal;
//             for (let i = 0; i < myBody.length; i++) {
//                 // console.log("my Body: "+myBody[i].x);
//                 if (w==myBody[i].x) {
//                     // console.log("my x "+myBody[i].x);
//                     // console.log("width: "+w);
//                     gridUC[h][w] = 0;
//                     // console.log("check fro zero: "+gridUC[h][w]);
                    
//                 }
//             }
//             for (let j = 0; j < sneks.length; j++) {
//                 let snek=sneks[j].body
//                 for (let s = 0; s < snek.length; s++) {
//                     if (w==snek[s]) {
//                         gridUC[h][w] = 0;
//                     }
                    
//                 }
                
//             }
//         }
//     }
//     // console.log(gridUC); 
//     return gridUC;
// }



// function floodFill(grid, sR, sC, newC) {
    
//     let origC = grid[sR][sC]
//     if (origC==newC) {
//         return grid
//     }
//     fill(grid, sR, sC, newC,origC)
//     return grid
// }
// function fill(grid, sR, sC, newC, origC){
//     if (sR < 0 || sC < 0 || sR > grid.length-1 || sC > grid[0].length-1 || grid[sR][sC]!==origC) {
//         return;
//     }
//     else {
//         grid[sR][sC]=newC
//     }
//     fill(grid, sR - 1, sC, newC, origC);

//      //Fill Next row
//      fill(grid, sR + 1, sC, newC, origC);

//      //Fill Prev col
//      fill(grid, sR, sC - 1, newC, origC);

//      //Fill next col
//      fill(grid, sR, sC + 1, newC, origC);
// }

// function movePicker(pathGrid,startY,startX,moveSafety) {
//     console.log(moveSafety);
    
//     // for (let m = 0; m < 4; m++) {
//         // console.log(pathGrid[startY][startX+1]);
//         if (startX+1<=10||startX-1>=0) {
//             if (pathGrid[startY][startX]+1==1) {
//                 moveSafety.right=true
//                 console.log("right: "+moveSafety);
                
//             }
//             if (pathGrid[startY][startX]-1==1) {
//                 moveSafety.left=true
//                 console.log("left: "+moveSafety);
//             }
//         }
//         // if (startY+1<=10||startY-1>=0) {
//         //     if (pathGrid[startY+1]==1) {
//         //         moveSafety.up=true
//         //         console.log("no up: "+moveSafety);
//         //     }
//         //     if (pathGrid[startY-1]==1) {
//         //         moveSafety.down=true
//         //         console.log("no down: "+moveSafety);
//         //     }
//         // }
//     // }
//     return moveSafety
// }
let selfCollide = false
let snekCollide = false
let snekHead;
let snekBody;
let loop=0

function colliding(snek, head,moveSafety){
    console.log(snek);
    let deltaX = snek.x-head.x
    
    let deltaY = snek.y-head.y
    // console.log(deltaY);
    if (-2<=deltaX&&deltaX<0) {
        moveSafety.left=false
        // console.log("collide left");
        snekCollide=true
        
    }
    if (0<deltaX&&deltaX<=2) {
        moveSafety.right=false
        // console.log("collide right");
        snekCollide=true
    }
    if (-2<=deltaY&&deltaY<0) {
        moveSafety.down=false
        // console.log("collide down");
        snekCollide=true
    }
    if (0<deltaY&&deltaY<=2) {
        moveSafety.up=false
        // console.log("collide up");
        snekCollide=true
    }
    return moveSafety
    // if (directions == 3) {
    //     if (colliding(headX+1,snekX)) {
    //         moveSafety.right=false
    //     }
    // }

}

export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    // if (gameState.you.health<=60||gameState.you.length<4) {    
    // console.log(grid);
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0]; 
    const myNeck = gameState.you.body[1];
    // const myBody = gameState.you.body;

    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left = false;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right = false;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down = false;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up = false;
    } 
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
    // gameState.board
    // console.log(gameState.board.height);
    if (myHead.x + 1 > gameState.board.width-1) {
        // console.log("no right");
        moveSafety.right = false
    }
    if (myHead.x - 1 < 0) {
        // console.log("no left");
        moveSafety.left = false
    }
    if (myHead.y + 1 > gameState.board.height-1) {
        // console.log("no up");
        moveSafety.up = false
    }
    if (myHead.y - 1 < 0) {
        // console.log("no down");
        moveSafety.down = false
    }
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    let myBody = gameState.you.body
    for (let i = 0; i < myBody.length-1; i++) {
        let segment = myBody[i]
        if (myHead.y == segment.y && myHead.x == segment.x-1) {
            moveSafety.right = false
            selfCollide=true
        }
        else if (myHead.y == segment.y && myHead.x == segment.x+1) {
            moveSafety.left = false
            selfCollide=true
        }

        else if (myHead.x == segment.x && myHead.y == segment.y-1) {
            moveSafety.up = false
            selfCollide=true
        }
        else if (myHead.x == segment.x && myHead.y == segment.y+1) {
            moveSafety.down = false
            selfCollide=true
        }
    }
    
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    let sneks = gameState.board.snakes
    for (let z = 1; z < sneks.length; z++) {
        let snekC = sneks[z]
        for (let s = 0; s < snekC.body.length; s++) {
            snekBody = snekC.body[s]
            snekHead = snekC.head
            moveSafety=colliding(snekHead, myHead,moveSafety)
        }
    }
    let xSnake = myHead.x;
    let ySnake = myHead.y;

    // if (gameState.you.health>60) {
    //     // let loop=0
    //     moveSafety.up=false
    //     moveSafety.down=false
    //     moveSafety.right=false
    //     moveSafety.left=false
    //     console.log(moveSafety);
    //     if (loop==0) {
    //         moveSafety.up=true
    //     }
    //     if (loop==1) {
    //         moveSafety.right=true
    //     }
    //     if (loop==2) {
    //         moveSafety.down=true
    //     }
    //     if (loop==3) {
    //         moveSafety.left=true
    //     }
    //     loop++
    //     if (loop==3) {
    //         loop=0
    //     }
    // }

    let xFood = gameState.board.food[0].x
    let yFood = gameState.board.food[0].y

if (snekCollide==false&&selfCollide==false&&gameState.you.health<=60) {
    // 
    if (xSnake<=xFood) {
        moveSafety.left=false
        console.log("no left");
    }
    if (xSnake>=xFood) {
        moveSafety.right=false
        console.log("no right");
    }
    if (ySnake>=yFood) {
        moveSafety.up=false
        console.log("no up");
    }
    if (ySnake<=yFood) {
        moveSafety.down=false
        console.log("no down");
        
    }
}
// }
if (gameState.you.health>60) {
    // let loop=0
    // console.log(moveSafety);
    if (myHead.y>myBody[myBody.length-1].y||myHead.y<myBody[myBody.length-1].y) {
        console.log("no horizantal");
        moveSafety.right=false
        moveSafety.left=false
        console.log(moveSafety);
    }
    else {
        console.log("no vertical");
        moveSafety.up=false
        moveSafety.down=false
        console.log(moveSafety);
    }
    // return { move: nextMove };
}

// if (gameState.you.health>=60) {
//     if (moveSafety.right=true) {
        
//     }
// }

    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arsRow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    console.log(safeMoves);
    
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }
    
    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };
}