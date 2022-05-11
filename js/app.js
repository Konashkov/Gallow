const runApp = function () {
    this.state = null;

    this.render = (flag) => {
        const LETTER_CELL = document.querySelectorAll('.word-el')
        LETTER_CELL.forEach((el) => {
            el.remove()
        })

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
        if (!(document.querySelector('.word').contains(document.querySelector('.word--icon')))) {
            document.removeEventListener('click', f)
            setStatus(STATUS_WIN)
        }

        if (flag) {

            //WIN / LOSE / CONTINUE
            switch (this.state.status) {

                case STATUS_CONTINUE:
                    saveToLocaleStorage()
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
                    localStorage.clear();
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
                    break;
            }
        }

    }

    this.turn = (letter) => {

        //isGuess()
        const indexes = []
        this.state.word.split('').forEach((char, index) => {
            if (char === letter) {
                indexes.push(index)
            }
        })
        const isCorrect = indexes.length > 0;
        const nextField = this.state.field.map((v, index) => {
            return indexes.includes(index) ? 1 : v
        })
        setField(nextField)
        if (!isCorrect) {
            incriseMistakes()
            document.querySelector('.' + letter).classList.add('keys-fail')
        }
        else{
            document.querySelector('.'+letter).classList.add('keys-right')
        }
        //End isGuess
        //Rendering
        this.render(true)
    }

    this.init = (newWord) => {
        this.state = new State();


        this.state.setWord(newWord)
        const field = new Array(this.state.word.length).fill(0);
        this.state.setField(field)
        alphabet.forEach((chars, index) => {
            const row = chars.map((c) => {
                const el = document.createElement('BUTTON')
                el.classList.add('keyboard--btn')
                el.setAttribute('data-action', 'turn')
                el.innerText = c
                el.classList.add(c)
                return el
            });
            const selector = '[data-keyboard-row=row-' + (index + 1) + ']';
            document.querySelector(selector).append(...row)
        })
        this.render(false);
    }

    return this;
}