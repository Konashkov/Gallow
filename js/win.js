function win() {
    const KEYS = document.querySelectorAll('.keyboard--btn')
    KEYS.forEach((el) => {
        if (!el.classList.contains('keys-fail'))
            el.classList.add('keys-right')
    })
    const win =  document.createElement('p')
    win.classList.add('right-word')
    win.innerText = 'You did it!'
    document.querySelector('.word').after(win)
}
