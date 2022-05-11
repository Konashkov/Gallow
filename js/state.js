class State {
    constructor() {
        this.status = STATUS_CONTINUE;
        this.word = '';
        this.field = [];
        this.keys = [{key: 'K', status: 0}, {}];
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
    
    incriseMistakes() {
        const img = document.querySelector('.gallow-img')
        let prevIndex = STAGE_OF_IMG.indexOf(img.getAttribute('src'))
        if (prevIndex + 1 < STAGE_OF_IMG.length)
            img.setAttribute('src', STAGE_OF_IMG[prevIndex + 1])
        if ((prevIndex + 1) === (STAGE_OF_IMG.length - 1)) {
            app.state.status = STATUS_FAIL
            document.removeEventListener('click', f)
        }
    }

    saveToLocaleStorage() {
        // IS LOCALSTORAGE EXISTED?
        const KEYS = document.querySelectorAll('.keyboard--btn')
        let btns = []
        KEYS.forEach((el) => {
            btns.push([
                el.getAttribute('disabled'),
                el.getAttribute('class')]
            )
        })
        localStorage.setItem('data-btns', JSON.stringify(btns))
        localStorage.setItem('data-img', JSON.stringify(document.querySelector('.gallow-img').getAttribute('src')))
    }
    
    loadFromLocaleStorage() {
        document.querySelector('.gallow-img').setAttribute('src', JSON.parse(localStorage.getItem('data-img')))
        const btns_status = JSON.parse(localStorage.getItem('data-btns'))
        document.querySelector('.keyboard--btn').remove()
        const KEYS = document.querySelectorAll('.keyboard--btn')
    
        app.state = JSON.parse(localStorage.getItem('data-state'))
        KEYS.forEach((el, index) => {
            if (btns_status[index][0] === 'true') {
                const indexes = []
                this.state.word.split('').forEach((char, index) => {
                    if (char === el.innerText) {
                        indexes.push(index)
                    }
                })
                const nextField = this.state.field.map((v, index) => {
                    return indexes.includes(index) ? 1 : v
                })
               setField(nextField)
                app.render(false)
                el.setAttribute('disabled', 'true')
            }
            el.setAttribute('class', btns_status[index][1])
        })
    }
}