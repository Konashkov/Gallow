const createState = function () {
    this.counter = 0;
    this.status = STATUS_CONTINUE;
    this.word = '';
    this.field = [];
    this.mistakes = 0;
    return {
        counter,
        status,
        word,
        field,
        mistakes,

        setStatus: (status) => {
            state.status = status
        },
        setWord: (word) => {
            state.word = word
        },
        setField: (field) => {
            state.field = field
        },
        incriseMistakes: () => {
            const img = document.querySelector('.gallow-img')
            let prevIndex = STAGE_OF_IMG.indexOf(img.getAttribute('src'))
            if (prevIndex + 1 < STAGE_OF_IMG.length)
                img.setAttribute('src', STAGE_OF_IMG[prevIndex + 1])
            if ((prevIndex + 1)===(STAGE_OF_IMG.length - 1)){
                state.status = STATUS_FAIL
                document.removeEventListener('click', f)
            }
        },
    }
}
