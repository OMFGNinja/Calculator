//querySelectors para darle funcionabilidad a la Calculadora
const numButtons = document.querySelectorAll('.btn')
const operatorButtons = document.querySelectorAll('.btnOperator')
const point = document.querySelector('.btnPoint')
const equal = document.querySelector('.btnEqual')
const clear = document.querySelector('.clearButton')
const change = document.querySelector('.changeSign')
const deleteBtn = document.querySelector('.deleteButton')
const currentOperation = document.querySelector('.currentOperation')
const wholeOperation = document.querySelector('.wholeOperation')
const power = document.querySelector('.powerOf2')

//Variables necesarias para almacenar los numeros y los operandos
let operator = null
let first = ''
let second = ''
let activate = false

//Todos los eventListener necesarios al momento de darle click a un boton con el mouse o presionar una tecla en el teclado
numButtons.forEach((button) => 
    button.addEventListener('click', () => addNumbers(button.textContent))
)
operatorButtons.forEach((button) => 
    button.addEventListener('click', () => setOperator(button.textContent))
)
power.addEventListener('click', powerOfTwo)
point.addEventListener('click', addPoint)
equal.addEventListener('click', evaluate)
clear.addEventListener('click', clearScreen)
deleteBtn.addEventListener('click', deleteChar)
change.addEventListener('click', changeSign)
window.addEventListener('keydown', keyboardInput)

//Funciones que manejan el input por teclado
function keyboardInput(e){
    if (e.key >= 0 && e.key <= 9) addNumbers(e.key)
    if (e.key === 'Enter' || e.key === '=') evaluate()
    if (e.key === '.') addPoint()
    if (e.key === 'Backspace') deleteChar()
    if (e.key === 'Escape') clearScreen()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(convert(e.key))
}

function convert(op) {
    if (op ==='+') return '+'
    if (op ==='-') return '-'
    if (op ==='*') return 'x'
    if (op ==='/') return '÷'
}

//Funciones que controlan la pantalla (Borrar, resetearla, agregar decimal, cambiar signo del numero introducido y agregar los numeros)
function changeSign(){
    let minus = '-'
    if (currentOperation.textContent.toString().charAt(0) !== '-') {
        if (currentOperation.textContent.toString().charAt(0) === '0') return
        currentOperation.textContent = minus.concat(currentOperation.textContent.toString()) 
    } 
    else currentOperation.textContent = currentOperation.textContent.toString().slice(1)
}

function deleteChar(){
    currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1)
    if (currentOperation.textContent.toString().length === 0) currentOperation.textContent = '0'
    if (currentOperation.textContent.toString().length === 1 && currentOperation.textContent === '-') currentOperation.textContent = ''
}

function clearScreen(){
    wholeOperation.textContent = ''
    currentOperation.textContent = '0'
    first = ''
    second = ''
    operator = null
}

function addPoint() {
    if (activate) reset()
    if (currentOperation.innerHTML === '') currentOperation.innerHTML = '0'
    if (currentOperation.innerHTML.includes('.')) return
    currentOperation.innerHTML += '.'
}

function addNumbers(text) {
    if (currentOperation.textContent === '0' || activate) reset()
    currentOperation.innerHTML += text
}

function reset() {
    currentOperation.textContent = ''
    activate = false
}

//Funciones que evaluan los operandos y los numeros introducidos para asi seleccionar la operacion adecuada
function evaluate() {
    if (operator === null || activate) return
    if (operator === '÷' && currentOperation.textContent === '0'){
        alert("You can't divide by 0!")
        return
    }
    if (currentOperation.textContent === '') second = '0'
    else second = currentOperation.textContent
    currentOperation.textContent = Math.round(operate(first, second, operator) * 100) / 100
    wholeOperation.textContent = `${first} ${operator} ${second} =`
    operator = null
}

function setOperator(text) {
    if (operator !== null) evaluate()
    if (currentOperation.textContent === '') currentOperation.textContent = '0'
    first = currentOperation.textContent
    operator = text
    wholeOperation.textContent = first + ' ' + operator
    activate = true
}

function operate(a, b, operating){
    a = Number(a)
    b = Number(b)
    if (operating === '+') return add(a,b)
    if (operating === '-') return substract(a,b)
    if (operating === 'x') return multiply(a,b)
    if (operating === '÷') {
        if (b === 0) return null
        else return divide(a,b)
    }
}

//Funciones que realizan los calculos
function add(a,b) {
    return a + b
}

function substract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function powerOfTwo(){
    if (currentOperation.textContent === '') currentOperation.textContent = '0'
    let a = Number(currentOperation.textContent)
    currentOperation.textContent = Math.pow(a,2)
}