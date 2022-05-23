function restart(){
    localStorage.clear()
    localStorage.setItem('data-wins', JSON.stringify(app.state.wins))
    localStorage.setItem('data-fails', JSON.stringify(app.state.loses))

    document.querySelectorAll('.keyboard--btn').forEach((el) => {
        el.remove()
    })
        if(document.querySelector('.right-word')!==null)  document.querySelector('.right-word').remove()
    document.querySelector('.gallow-img').setAttribute('src',STAGE_OF_IMG[0])
    app.init( getNewWord())
    document.addEventListener('click', f)
}
function resetScore(){
    app.state.wins = 0
    app.state.loses = 0
    restart()
}
document.querySelector('.restart--btn').addEventListener('click',restart)
document.querySelector('.reset-score--btn').addEventListener('click',resetScore)