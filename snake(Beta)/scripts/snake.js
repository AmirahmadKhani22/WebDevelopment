function selectHTMLElements(){
    canvas = document.getElementById("canvas")
    canvasContext = canvas.getContext('2d')
    assets = document.querySelectorAll('.assets')
    score = document.getElementById('score')
    gameSpeed = document.getElementById('gameSpeed')
    pause = document.getElementById('pause')
    play = document.getElementById('play')
    saveButton = document.getElementById('save')
    fileInput = document.querySelector('[type="file"]')
    saveLoadSuccessful = document.getElementById('saveLoadSuccessful')
    quiet = document.getElementById('quiet')
    isPlaying = true
    blankSpace = 5
    isCollide = false
}
selectHTMLElements()
onload = function (){
    frame = prompt('Hello.\nWelcome to Snake game.\nEnter game speed to start:\n(Just positive numbers)')
    fps = setFps(frame)
    gameLoop()
    pause.disabled = !isPlaying
    play.disabled = isPlaying
    saveButton.disabled = isPlaying
    fileInput.disabled = isPlaying
}
function setFps(frame){
    while(true){  
        if(isNaN(+frame)){
            frame = prompt('Enter currect game speed to start:')
        } 
        else {
            if(+frame === 0){
                alert('Good Bye!\nSee you later.')
                close()
            }
            if(+frame < 0){
                frame = prompt('Enter currect game speed to start:')
            }
            else{
                gameSpeed.innerHTML = frame + ' frame / second'
                break
            }
        }
    }
    return 1000 / +frame
}
function gameLoop(){
    intervalId = setInterval(render , fps)
    //console.log(fps)
}
function pauseGame(){
    clearInterval(intervalId)
}
function setScore(){
    score.innerHTML = (snake.tail.length - 1) * +frame
}
function gameOver(){
    if(confirm('I hope you have enjoyed, But you game over!!\nDo you want to start new game?')){
        location.reload()
    }else {
        alert('Good Bye!\nSee you later!')
        close()
    }
}
class Snake{
    constructor(){
        this.x = 400
        this.y = 400
        this.size = 25
        this.headImages = Object.assign([] , assets).slice(0 , 4)
        this.tailImage = assets[4]
        this.tail = [{x: this.x , y: this.y}]
        this.directionX = -1
        this.directionY = 0
    }
    move(){
        let newTail = {}
        if(this.directionX === 1){
            newTail = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }
        if(this.directionX === -1){
            newTail = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }
        if(this.directionY === 1){
            newTail = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        }
        if(this.directionY === -1){
            newTail = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        this.tail.shift()
        this.tail.push(newTail)
        //head is the last index of this.tail 
    }
    eatFood(){
        if(Math.abs(this.tail[this.tail.length - 1].x - food.x) <= blankSpace && 
            Math.abs(this.tail[this.tail.length - 1].y - food.y) <= blankSpace){
            this.tail[snake.tail.length] = {x: food.x , y: food.y}
            food = new Food()
        }
    }
    collisionDetection(){
        if(this.tail[snake.tail.length - 1].x < 0 || this.tail[snake.tail.length - 1].y < 0 || (canvas.width - this.tail[snake.tail.length - 1].x < this.size / 2) || (canvas.height - this.tail[snake.tail.length - 1].y < this.size / 2)){
            isCollide = true
        }
        for(let item of this.tail){
            if(item === this.tail[this.tail.length - 2] || item === this.tail[this.tail.length - 1]){
                continue
            }
            if(this.tail[this.tail.length - 1].x === item.x && this.tail[this.tail.length - 1].y === item.y){
                isCollide = true
            }
        }
    }
}
class Food{
    constructor(){
        this.image = assets[5]
        this.size = snake.size
        this.x = Math.floor(Math.random() * canvas.width / this.size) * this.size
        this.y = Math.floor(Math.random() * canvas.height / this.size) * this.size
        for(let item of snake.tail){
            while(item.x === this.x && item.y === this.y){
                this.x = Math.floor(Math.random() * canvas.width / this.size) * this.size
                this.y = Math.floor(Math.random() * canvas.height / this.size) * this.size
                if(item.x !== this.x && item.y !== this.y){
                    break
                }
            }
        }
    }
}
var snake = new Snake()
var food = new Food()
function render(){
    update()
    draw()
}
function update(){
    canvasContext.clearRect(0 , 0 , canvas.width , canvas.height)
    snake.move()
    snake.eatFood()
    snake.collisionDetection()
    setScore()
    if(isCollide){
        pauseGame()
        gameOver()
    }
}
function draw(){
    for(let i = 0 ; i < snake.tail.length ; i++){
        if(i !== snake.tail.length - 1){
            createImage(snake.tail[i].x + blankSpace / 2 , snake.tail[i].y + blankSpace / 2 ,
            snake.size - blankSpace , snake.size - blankSpace , snake.tailImage)
        }else{
            let snakeHeadImage
            if(snake.directionX === -1){
                snakeHeadImage = snake.headImages[0]
            }
            if(snake.directionX === 1){
                snakeHeadImage = snake.headImages[1]
            }
            if(snake.directionY === 1){
                snakeHeadImage = snake.headImages[2]
            }
            if(snake.directionY === -1){
                snakeHeadImage = snake.headImages[3]
            }
            createImage(snake.tail[i].x + blankSpace / 2 , snake.tail[i].y + blankSpace / 2 ,
            snake.size - blankSpace , snake.size - blankSpace , snakeHeadImage)
        }
    }
    createImage(food.x , food.y , food.size , food.size , food.image)
}
function createImage(x , y , width , height , source){
    canvasContext.drawImage(source , x , y , width , height)
}
addEventListener("keydown" , (event) => {
    if(isPlaying){
        if(event.keyCode == 37 && snake.directionX !== -1){
            snake.directionX = -1
            snake.directionY = 0
        }
        if(event.keyCode == 38 && snake.directionY !== -1){
            snake.directionX = 0
            snake.directionY = -1
        }
        if(event.keyCode == 39 && snake.directionX !== 1){
            snake.directionX = 1
            snake.directionY = 0
        }
        if(event.keyCode == 40 && snake.directionY !== 1){
            snake.directionX = 0
            snake.directionY = 1
        }
    }
    if(event.keyCode == 32){
        setTimeout(() => {
            if(isPlaying){
                pauseGame()
                isPlaying = false
            }else {
                gameLoop()
                isPlaying = true
            }
            pause.disabled = !isPlaying
            play.disabled = isPlaying
            saveButton.disabled = isPlaying
            fileInput.disabled = isPlaying
        } , 1)
    }
})