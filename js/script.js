// ------- CONSTANTS -------
// statuses
const STATUS_WIN = 'STATUS_WIN'
const STATUS_FAIL = 'STATUS_FAIL'
const STATUS_CONTINUE = 'STATUS_CONTINUE'
const STAGE_OF_IMG = ['./img/Gallow-0.svg', './img/Gallow-1.svg', './img/Gallow-2.svg', './img/Gallow-3.svg', './img/Gallow-4.svg', './img/Gallow-5.svg', './img/Gallow-6.svg']
// options

// ------- MAIN STATE ------

const f = (e) => {
    const el = e.target;
    const action = el.hasAttribute('data-action') ? el.getAttribute('data-action') : ''

    if ('turn' === action) {
        app.turn(el.innerText)
    }
    if ('resetGame' === action) {
        app.resetGame()
    }
    if ('resetScore' === action) {
        app.resetAll()
    }
}
document.addEventListener('click', f)
const getNewWord = () => {
  return vocabulary[Math.floor(Math.random() * vocabulary.length)].toUpperCase()
}
const app = runApp();
app.init( getNewWord())

