class Save{
    constructor(){
        this.score = (snake.tail.length - 1) * +frame
        this.gameSpeed = +frame
        this.snakeTail = snake.tail
        this.snakeDirectionX = snake.directionX
        this.snakeDirectionY = snake.directionY
        this.foodX = food.x
        this.foodY = food.y
    }
    store(){
        return JSON.stringify(this)
    }
}
saveButton.addEventListener('click' , () => {
    let save = new Save()
    const blob = new Blob([save.store()] , {type: 'application/json'})
    const fileURL = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const saveDate = new Date
    link.download = ('SnakeX ' + saveDate.toDateString() +' '+ saveDate.toLocaleTimeString()).replaceAll(/ |\\/g , '_')
    link.href = fileURL
    link.click()
    saveLoadSuccessful.innerHTML = 'Game saving was successfuly!'
})
let load = {
    data: {},
    clearScene: () => {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    },
    createScene: function (){
        snake = new Snake()
        snake.tail = load.data.snakeTail
        snake.directionX = load.data.snakeDirectionX
        snake.directionY = load.data.snakeDirectionY
        food = new Food()
        food.x = load.data.foodX
        food.y = load.data.foodY
        fps = setFps(load.data.gameSpeed)
        draw()
    }
}
fileInput.addEventListener('change' , () => {
    let fr = new FileReader()
    if(fileInput.files[0] !== undefined){
        fr.readAsText(fileInput.files[0])
        load.clearScene()
        fr.onload = function () {
            load.data = JSON.parse(fr.result)
            load.createScene()
            fileInput.value = ''
            saveLoadSuccessful.innerHTML = 'Game loading was successfuly!'
        }
    }
})