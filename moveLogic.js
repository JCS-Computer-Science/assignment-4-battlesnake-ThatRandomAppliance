// import * as PF from 'pathfinding'

// let finder = new PF.AStarFinder()
    let snekBody;
    let snekHead;
    
    function gridMaker(height,width,myBody,sneks,defaultVal = 1) {
        let gridUC = [];
    for (let h = 0; h < height; h++) {
        gridUC[h] = [];
        for (let w = 0; w < width; w++) {
            // let mySeg = myBody[w]
            gridUC[h][w] = defaultVal;
            for (let i = 0; i < myBody.length; i++) {
                // console.log("my Body: "+myBody[i].x);
                if (w==myBody[i].x) {
                    // console.log("my x "+myBody[i].x);
                    // console.log("width: "+w);
                    gridUC[h][w] = 0;
                    // console.log("check fro zero: "+gridUC[h][w]);
                    
                }
            }
            for (let j = 0; j < sneks.length; j++) {
                let snek=sneks[j].body
                for (let s = 0; s < snek.length; s++) {
                    if (w==snek[s]) {
                        gridUC[h][w] = 0;
                    }
                    
                }
                
            }
        }
    }
    // console.log(gridUC); 
    return gridUC;
}


    function floodFill(grid, sRow, sClm, newColor) {
        const oldColor = grid[sRow][sClm];
        
        // If the starting pixel already has the new color, return
        if (oldColor === newColor) {
            return grid;
        }
    
        // Dimensions of the grid
        const rows = grid.length;
        const cols = grid[0].length;
        // let pthGrid = gridMaker(cols,rows)
    
        // Queue for BFS
        const q = [[sRow, sClm]];
    
        // Change the starting pixel's color
        grid[sRow][sClm] = newColor;
    
        // Direction vectors for 4 adjacent directions
        const directions = [ [1, 0], [-1, 0], [0, 1], [0, -1] ];
    
        // BFS loop
        while (q.length > 0) {
            const [x, y] = q.shift();
    
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
    
                // Check boundary conditions and color match
                if (
                    nx >= 0 && nx < rows && 
                    ny >= 0 && ny < cols && 
                    grid[nx][ny] === oldColor
                ) {
                    // Change color and add to queue
                    grid[nx][ny] = newColor;
                    q.push([nx, ny]);
                }
            }
        }
    
        return grid;
    }

    function movePicker(pathGrid,startY,startX,moveSafety) {
        console.log(moveSafety);
        
        // for (let m = 0; m < 4; m++) {
            // console.log(pathGrid[startY][startX+1]);
            if (startX+1<=10||startX-1>=0) {
                if (pathGrid[startY][startX]+1==1) {
                    moveSafety.right=true
                    console.log("right: "+moveSafety);
                    
                }
                if (pathGrid[startY][startX]-1==1) {
                    moveSafety.left=true
                    console.log("left: "+moveSafety);
                }
            }
            // if (startY+1<=10||startY-1>=0) {
            //     if (pathGrid[startY+1]==1) {
            //         moveSafety.up=true
            //         console.log("no up: "+moveSafety);
            //     }
            //     if (pathGrid[startY-1]==1) {
            //         moveSafety.down=true
            //         console.log("no down: "+moveSafety);
            //     }
            // }
        // }
        return moveSafety
    }

export default function move(gameState){
    // console.log(grid);
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0]; 
    const myNeck = gameState.you.body[1];
    // const myBody = gameState.you.body;
    let moveSafety = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    
    // let sRow = myHead.y
    // let sClm = myHead.x
    // let newColor = 2
    // let foodD = floodFill(grid, sRow, sClm, newColor);
    // console.log(foodD);
    
    
    // if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    //     moveSafety.left = false;
        
    // } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    //     moveSafety.right = false;
        
    // } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    //     moveSafety.down = false;
        
    // } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    //     moveSafety.up = false;
    // } 
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
    // gameState.board
    // console.log(gameState.board.height);
    // if (myHead.x + 1 > gameState.board.width-1) {
    //     console.log("no right");
    //     moveSafety.right = false
    // }
    // if (myHead.x - 1 < 0) {
    //     console.log("no left");
    //     moveSafety.left = false
    // }
    // if (myHead.y + 1 > gameState.board.height-1) {
    //     console.log("no up");
    //     moveSafety.up = false
    // }
    // if (myHead.y - 1 < 0) {
    //     console.log("no down");
    //     moveSafety.down = false
    // }
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    // if (myHead.x>) {
        
    // }
    // console.log();
    let myBody = gameState.you.body
    // for (let i = 0; i < myBody.length; i++) {
    //     let segment = myBody[i]
    //     if (myHead.y == segment.y && myHead.x == segment.x-1) {
    //         moveSafety.right = false
    //     }
    //     else if (myHead.y == segment.y && myHead.x == segment.x+1) {
    //         moveSafety.left = false
    //     }

    //     else if (myHead.x == segment.x && myHead.y == segment.y-1) {
    //         moveSafety.up = false
    //     }
    //     else if (myHead.x == segment.x && myHead.y == segment.y+1) {
    //         moveSafety.down = false
    //     }
    // }
    
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    let sneks = gameState.board.snakes
    // for (let z = 1; z < sneks.length; z++) {
    //     let snekC = sneks[z]
    //     for (let s = 0; s < snekC.body.length; s++) {
    //         snekBody = snekC.body[s]
    //         snekHead = snekC.head
    //         console.log("snake:"+snekC.head.x);
    //         if (snekBody.x == myHead.x && snekBody.y+1 == myHead.y || snekHead.x == myHead.x && snekHead.y+2 == myHead.y) {
    //             console.log(snekBody.x +" , "+ myHead.x);
    //             moveSafety.down = false
    //         }
    //         if (snekBody.x == myHead.x && snekBody.y-1 == myHead.y || snekHead.x == myHead.x && snekHead.y-2 == myHead.y) {
    //             console.log(snekBody.x +" , "+ myHead.x);
    //             moveSafety.up = false
    //         }
    //         if (snekBody.y == myHead.y && snekBody.x-1 == myHead.x || snekHead.x-2 == myHead.x && snekHead.y == myHead.y) {
    //             console.log(snekBody.x +" , "+ myHead.x);
    //             moveSafety.right = false
    //         }
    //         if (snekBody.y == myHead.y && snekBody.x+1 == myHead.x || snekHead.x+2 == myHead.x && snekHead.y == myHead.y) {
    //             console.log(snekBody.x +" , "+ myHead.x);
    //             moveSafety.left = false
    //         }
    //         // gridMaker(snekBody, snekHead)
    //     }
    // }
    let width = gameState.board.width;
    let height = gameState.board.height;
    let grid = gridMaker(height,width, myBody, sneks);
    let startX = myHead.x;
    let startY = myHead.y;
    let newColor = 2;
    let pathGrid = floodFill(grid,startX,startY,newColor);
    // console.log("path: "+pathGrid.length);
    moveSafety = movePicker(pathGrid,startY,startX,moveSafety)
    
    // console.log("grid"+grid[h]);
    
    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
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