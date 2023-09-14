play.addEventListener('click' , () => {
    gameLoop()
    isPlaying = true
    pause.disabled = !isPlaying
    play.disabled = isPlaying
    saveButton.disabled = isPlaying
    fileInput.disabled = isPlaying
})
pause.addEventListener('click', () => {
    pauseGame()
    isPlaying = false
    pause.disabled = !isPlaying
    play.disabled = isPlaying
    saveButton.disabled = isPlaying
    fileInput.disabled = isPlaying
})
quiet.addEventListener('click' , () => {
    window.close()
})