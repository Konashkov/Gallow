class State {

    status = STATUS_CONTINUE;
    word = '';
    field = [];
    mistakes = 0;
    guessedLetters = 0;
    wins = 0;
    loses = 0;
    keys =
        [
            [{key: 'Q', status: 0}, {key: 'W', status: 0}, {key: 'E', status: 0}, {
                key: 'R',
                status: 0
            }, {key: 'T', status: 0}, {key: 'Y', status: 0}, {key: 'U', status: 0}, {
                key: 'I',
                status: 0
            }, {key: 'O', status: 0}, {key: 'P', status: 0},],
            [{key: 'A', status: 0}, {key: 'S', status: 0}, {key: 'D', status: 0}, {
                key: 'F',
                status: 0
            }, {key: 'G', status: 0}, {key: 'H', status: 0}, {key: 'J', status: 0}, {
                key: 'K',
                status: 0
            }, {key: 'L', status: 0},],
            [{key: 'Z', status: 0}, {key: 'X', status: 0}, {key: 'C', status: 0}, {
                key: 'V',
                status: 0
            }, {key: 'B', status: 0}, {key: 'N', status: 0}, {key: 'M', status: 0}]
        ]
    constructor() {
            this.loadFromLocaleStorage()
    }


    setStatus(status) {
        this.status = status
    }

    setWord(word) {
        this.word = word
    }

    setField(field) {
        this.field = field
    }

    setKeyStatus(char, status) {
        const buff = app.state.keys[0].concat(app.state.keys[1], app.state.keys[2]);
        const result = buff.find((obj) => {
            return obj.key === char
        })
        result.status = status
    }

    increaseMistakes() {
        this.mistakes++
        if (this.mistakes >= STAGE_OF_IMG.length - 1) {
            this.setStatus(STATUS_FAIL)
            localStorage.clear();
            this.loses++
            localStorage.setItem('data-wins', JSON.stringify(this.loses))
            document.removeEventListener('click', f)
        }
    }

    increaseGuessedLetters() {
        this.guessedLetters++
        if (this.guessedLetters >= this.word.length) {
            this.setStatus(STATUS_WIN)
            this.wins++
            localStorage.setItem('data-wins', JSON.stringify(this.wins))
            document.removeEventListener('click', f)
        }
    }

    saveToLocaleStorage() {
        const s = {
            word: this.word,
            status: this.status,
            guessedLetters: this.guessedLetters,
            mistakes: this.mistakes,
            keys: this.keys,
            field: this.field
        }

        localStorage.setItem('data-state', JSON.stringify(s))
    }

    loadFromLocaleStorage() {
        if (localStorage.getItem('data-state') !== null) {

            const s = JSON.parse(localStorage.getItem('data-state'))
            Object.keys(s).forEach((k) => {
                if (this.hasOwnProperty(k)) {
                    this[k] = s[k]
                }
            })
        }
        if(localStorage.getItem('data-wins' )!= null){
            this.wins = JSON.parse(localStorage.getItem('data-wins'))
            this.loses = JSON.parse(localStorage.getItem('data-fails'))
        }
    }
}