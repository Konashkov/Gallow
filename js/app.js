const runApp = function () {
    this.state = null;

    this.render = () => {
        document.querySelector('.wins').innerText = `WINS: ${this.state.wins}`
        document.querySelector('.loses').innerText = `LOSES: ${this.state.loses}`

        //Set new img
        const img = document.querySelector('.gallow-img')
        img.setAttribute('src', STAGE_OF_IMG[this.state.mistakes])

        //REMOVE LETTER CELLS
        document.querySelector('.word').innerHTML = ''

        //RENDER NEW LETTER CELLS
        this.state.field.forEach((isGuested, index) => {
            let letter = document.createElement('span')
            letter.classList.add('word-el')
            if (isGuested) {
                letter.innerText = this.state.word[index]
            } else {
                letter.classList.add('word--icon')
            }
            document.querySelector('.word').appendChild(letter)
        })
        //REMOVE KEYBOARD
        document.querySelectorAll('.keyboard--btn').forEach((el) => {
            el.remove()
        })
        //RENDER NEW KEYBOARD
        this.state.keys.forEach((chars, index) => {
            const newRow = chars.map((c) => {
                const el = document.createElement('button')
                el.classList.add('keyboard--btn')
                el.setAttribute('data-action', 'turn')
                el.innerText = c.key
                el.classList.add(c.key)

                if (STATUS_CONTINUE !== this.state.status) {
                    el.removeAttribute('data-action')
                }
                    switch (c.status) {
                        case 0:
                            el.removeAttribute('disabled')
                            break;
                        case 1:
                            el.setAttribute('disabled', 'disabled')
                            el.classList.add('keys-right')
                            break;
                        case -1:
                            el.setAttribute('disabled', 'disabled')
                            el.classList.add('keys-fail')
                            break;
                    }

                return el
            });
            const selector = '[data-keyboard-row=row-' + (index + 1) + ']';
            document.querySelector(selector).append(...newRow)
        })
        //RENDERING STATUS

        if (document.querySelector('.right-word') !== null) {
            document.querySelector('.right-word').remove()
        }

        //WIN / LOSE / CONTINUE
        switch (this.state.status) {

            case STATUS_CONTINUE:
                this.state.saveToLocaleStorage()
                break;
            case STATUS_FAIL:
                console.log('LOSE')
                document.querySelectorAll('.keyboard--btn').forEach((el) => {
                    if (!el.classList.contains('key-right'))
                        el.classList.add('keys-fail')
                })
                let rightWord = document.createElement('p')
                rightWord.innerText = 'Right word was: ' + app.state.word;
                rightWord.classList.add('right-word')
                document.querySelector('.word').after(rightWord)
                break;
            case STATUS_WIN:
                console.log('WIN')
                document.querySelectorAll('.keyboard--btn').forEach((el) => {
                    if (!el.classList.contains('keys-fail'))
                        el.classList.add('keys-right')
                })
                const win = document.createElement('p')
                win.classList.add('right-word')
                win.innerText = 'You did it!'
                document.querySelector('.word').after(win)
                localStorage.clear();
                document.removeEventListener('click', f)
                break;
        }
    }

    this.turn = (letter) => {

        //isGuess()
        const indexes = []
        this.state.word.split('').forEach((char, index) => {
            if (char === letter) {
                indexes.push(index)
                this.state.increaseGuessedLetters()
            }
        })
        const isCorrect = indexes.length > 0;
        const nextField = this.state.field.map((v, index) => {
            return indexes.includes(index) ? 1 : v
        })
        this.state.setField(nextField)
        if (!isCorrect) {
            this.state.increaseMistakes()
        }
        this.state.setKeyStatus(letter, isCorrect ? 1 : -1)
        //End isGuess
        //Rendering
        this.render()
    }

    this.init = () => {
        this.state = new State();
        if (localStorage.getItem('data-state') == null) {
            this.state.setWord(this.getNewWord())
        }
        this.render();
    }

    this.resetAll = () => {
        this.state.initState()
        this.state.saveToLocaleStorage();
        this.state.setWord(this.getNewWord())
        this.render()
    }

    this.resetGame = () => {
        this.state.resetGame()
        this.state.saveToLocaleStorage();
        this.state.setWord(this.getNewWord())
        this.render()
    }

    this.getNewWord = () => {
        return vocabulary[Math.floor(Math.random() * vocabulary.length)].toUpperCase()
    }

    return this;
}