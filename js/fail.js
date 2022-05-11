function fail() {
    const KEYS = document.querySelectorAll('.keyboard--btn')
    KEYS.forEach((el) => {
        if(!el.classList.contains('key-right'))
        el.classList.add('keys-fail')
    })
    let rightWord = document.createElement('p')
    rightWord.innerText = 'Right word was: ' + state.word;
    rightWord.classList.add('right-word')
    document.querySelector('.word').after(rightWord)

}