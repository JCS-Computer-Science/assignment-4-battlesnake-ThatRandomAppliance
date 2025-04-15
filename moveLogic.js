export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    
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
    console.log(gameState.board.height);
    if (myHead.x + 1 > gameState.board.width-1) {
        console.log("no right");
        moveSafety.right = false
    }
    if (myHead.x - 1 == -1) {
        console.log("no left");
        moveSafety.left = false
    }
    if (myHead.y + 1 > gameState.board.height-1) {
        console.log("no up");
        moveSafety.up = false
    }
    if (myHead.y - 1 == -1) {
        console.log("no down");
        moveSafety.down = false
    }
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    // if (myHead.x>) {
        
    // }
    // console.log();
    
    for (let i = 0; i < gameState.you.body.length; i++) {
        // console.log("x-cord:"+gameState.you.body[i].x)
        if (myHead.y == gameState.you.body[i].y) {
            console.log("same y");
            console.log("cords"+"("+gameState.you.body[i].x+","+gameState.you.body[i].y+")");
            
            if (myHead.x++ == gameState.you.body[i].x--) {
                // console.log("no collide right");
                // console.log("y-cord:"+gameState.you.body[i].y)
                moveSafety.right = false
            }
            if (myHead.x-- == gameState.you.body[i].x++) {
                // console.log("no collide left");
                // console.log("y-cord:"+gameState.you.body[i].y)
                moveSafety.left = false
            }
        }
        if (myHead.x == gameState.you.body[i].x) {
            console.log("same x");
            console.log("cords"+"("+gameState.you.body[i].x+","+gameState.you.body[i].y+")");
            if (myHead.y++ == gameState.you.body[i].y--) {
                // console.log("no collide up");
                // console.log("x-cord:"+gameState.you.body[i].x)
                moveSafety.up = false
            }
            if (myHead.y-- == gameState.you.body[i].y++) {
                // console.log("no collide down");
                // console.log("x-cord:"+gameState.you.body[i].x)
                moveSafety.down = false
            }  
        }
        
    }
    
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    
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