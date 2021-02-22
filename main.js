const canvas = document.getElementById('canvas');

const ctx= canvas.getContext('2d');


class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
let speed = 5;

let count= 30;
let head_x= 10;
let head_y=10;
const snake_parts =[];
let tail = 2;

let size= canvas.width / count - 2;

let score= 0;



drawGame = ()=>{
    snakePosition();
    let result = isGameOver();
    if (result){
        return;
    };
    clearScreen();
    positionFood();
    food();
    drawSnake();
    drawScore();
    if(score > 50){
        speed = 10
    }
    if(score > 100){
        speed = 15
    }
    if(score > 150){
        speed = 20
    }
    setTimeout(drawGame, 1000/speed);
};


let grd = ctx.createLinearGradient(0, 0, 140, 100);
grd.addColorStop(0, "gold");
grd.addColorStop(0.4, "yellow");
grd.addColorStop(1, "yellowgreen");
clearScreen = () =>{
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
};

drawSnake = ()=>{
    ctx.fillStyle = 'black';
    for (let i=0; i < snake_parts.length; i++){
        let part = snake_parts[i];
        ctx.fillRect(part.x * count, part.y * count, size, size);
    }
    snake_parts.push(new SnakePart(head_x,head_y));
    while (snake_parts.length > tail){
        snake_parts.shift();
    };
    ctx.fillStyle = 'red';
    ctx.fillRect(head_x*count, head_y*count, size, size);
};
drawScore = ()=>{
    ctx.fillStyle = 'indigo';
    ctx.font = '15px Arial Narrow';
    ctx.fillText('SCORE : ' + score, canvas.width-100, 30);
};

let x_velocity= 0;
let y_velocity= 0;

snakePosition =()=>{
    head_y = head_y + y_velocity;
    head_x = head_x + x_velocity;
};
let food_x= 5;
let food_y= 5;
positionFood = ()=>{
    if(food_x === head_x && food_y === head_y){
        food_x= Math.floor(Math.random() * count);
        food_y= Math.floor(Math.random() * count);
        tail++;
        score +=10;
    }
};
food = ()=>{
    ctx.fillStyle = 'green';
    ctx.fillRect(food_x*count, food_y*count, size, size);
};

isGameOver = ()=>{
    let gameOver = false;

    if(x_velocity === 0 && y_velocity === 0){
        return false;
    }

    if(head_x < 0){
        gameOver= true;
    }
    else if(head_x === count){
        gameOver= true;
    }
    else if(head_y < 0){
        gameOver= true;
    }
    else if(head_y === count){
        gameOver= true;
    }
    for(let i=0; i<snake_parts.length; i++){
        let part = snake_parts[i];
        if (part.x === head_x && part.y === head_y){
            gameOver= true;
            break;
        }
    }
    if (gameOver){
        ctx.fillStyle= 'indigo';
        ctx.font = '100px Arial Narrow';
        ctx.fillText('GAME OVER', canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
};
keyUp = (e)=>{
    //لأعلى
    if(e.keyCode == 38){
        if(y_velocity == 1)// لكي لا يسمح له بالاتجاه المعاكس 
            return;
        x_velocity= 0;
        y_velocity= -1; 
    }
    // لأسفل
    if(e.keyCode == 40){
        if(y_velocity == -1)// لكي لا يسمح له بالاتجاه المعاكس 
            return;
        x_velocity= 0;
        y_velocity= 1; 
    }
    // شمال
    if(e.keyCode == 37){
        if(x_velocity == 1)// لكي لا يسمح له بالاتجاه المعاكس 
            return;
        x_velocity= -1;
        y_velocity= 0; 
    }
    // يمين
    if(e.keyCode == 39){
        if(x_velocity == -1)// لكي لا يسمح له بالاتجاه المعاكس 
            return;
        x_velocity= 1;
        y_velocity= 0; 
    }
};
document.body.addEventListener('keydown', keyUp);


drawGame();