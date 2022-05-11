const runApp = function () {
    this.state = null;

    this.render = () => {
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
            this.state.setStatus(STATUS_WIN)
        }


        //WIN / LOSE / CONTINUE
        switch (this.state.status) {

            case STATUS_CONTINUE:
                break;
            case STATUS_FAIL:
                console.log('LOSE')
                fail()
                break;
            case STATUS_WIN:
                console.log('WIN')
                win()
                break;
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
        this.state.setField(nextField)
        if (!isCorrect) {
            this.state.incriseMistakes()
            document.querySelector('.'+letter).classList.add('keys-fail')
        }
        else{
            document.querySelector('.'+letter).classList.add('keys-right')
        }
        //End isGuess
        //Rendering
        this.render()
    }

    this.init = (newWord) => {
        this.state = createState();


        this.state.setWord(newWord)
        const field = new Array(this.state.word.length).fill(0);
        this.state.setField(field)
        alphabet.forEach((chars, index) => {
            const row = chars.map((c) => {
                const el = document.createElement('BUTTON')
                el.classList.add('keyboard--btn')
                el.classList.add(c)
                el.setAttribute('data-action', 'turn')
                el.innerText = c
                return el
            });
            const selector = '[data-keyboard-row=row-' + (index + 1) + ']';
            document.querySelector(selector).append(...row)
        })
        this.render();
    }

    return this;
}