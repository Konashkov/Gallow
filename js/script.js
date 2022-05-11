// ------- CONSTANTS -------
// statuses
const STATUS_WIN = 'STATUS_WIN'
const STATUS_FAIL = 'STATUS_FAIL'
const STATUS_CONTINUE = 'STATUS_CONTINUE'
const STAGE_OF_IMG = ['./img/Gallow-0.svg', './img/Gallow-1.svg', './img/Gallow-2.svg', './img/Gallow-3.svg', './img/Gallow-4.svg', './img/Gallow-5.svg', './img/Gallow-6.svg']
// options
const alphabet = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
]
// ------- MAIN STATE ------

const f = (e) => {
    const el = e.target;
    if (el.hasAttribute('data-action') && el.getAttribute('data-action') === 'turn') {
        el.setAttribute('disabled', 'true')
        app.turn(el.innerText)
    }
}
document.addEventListener('click', f)
const getNewWord = () => {
  return vocabulary[Math.floor(Math.random() * vocabulary.length)].toUpperCase()
}
const app = runApp();
app.init( getNewWord())