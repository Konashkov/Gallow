function restart(){
    localStorage.clear()
    document.querySelectorAll('.keyboard--btn').forEach((el) => {
        el.remove()
    })
        if(document.querySelector('.right-word')!==null)  document.querySelector('.right-word').remove()
    document.querySelector('.gallow-img').setAttribute('src',STAGE_OF_IMG[0])
    app.init( getNewWord())
    document.addEventListener('click', f)
}
document.querySelector('.restart--btn').addEventListener('click',restart)