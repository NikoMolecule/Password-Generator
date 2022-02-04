// inputs from checklists
const characterInput = document.getElementById('amountOfChars')
const numbersCheck = document.getElementById('includeNums')
const uppercaseCheck = document.getElementById('includeUppercase')
const symbolsCheck = document.getElementById('includeSymbols')
const passForm = document.getElementById('passForm')
const passDisplay = document.getElementById('passPutter')
const copyButton = document.getElementById('copyBtn')

//Function to easly create ASCII characters array
const detectNumbers = (a, b) => {
    const array = [];
    for (let i = a; i<=b; i++){
        array.push(i)
    }
    return array
}

// certain character ASCII codes
const UppercaseChars = detectNumbers(65, 90);
const LowercaseChars = detectNumbers(97, 122)
const NumbersChars = detectNumbers(48, 57)
const SymbolsChars = detectNumbers(33, 47).concat(detectNumbers(58, 64)).concat(detectNumbers(91, 96)).concat(detectNumbers(123, 126))

// Dom Manipulation, whever we click a button.
passForm.addEventListener('submit', thing => {
    thing.preventDefault()
    const characterAmount = characterInput.value 
    const includeNumbers = numbersCheck.checked
    const includeUppercase = uppercaseCheck.checked
    const includeSymbols = symbolsCheck.checked
    const generatedPass = generatePassword(characterAmount, includeNumbers, includeUppercase, includeSymbols)
    passDisplay.innerText = generatedPass
})

// Function for Pass Generation
const generatePassword = (characterAmount, includeNumbers, includeUppercase, includeSymbols) => {
    let allowedChars = LowercaseChars
    if(includeNumbers == true) allowedChars = allowedChars.concat(NumbersChars)
    if(includeUppercase == true) allowedChars = allowedChars.concat(UppercaseChars)
    if(includeSymbols == true) allowedChars = allowedChars.concat(SymbolsChars)

    let passwordThing = []
    for(let i = 0; i < characterAmount; i++){
        const theCharCode = allowedChars[Math.floor(Math.random() * allowedChars.length)]
        passwordThing.push(String.fromCharCode(theCharCode))
    }
    return passwordThing.join('')
}

//Copy the password
copyButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const passMolecule = passDisplay.innerText

    if(!passMolecule){return}

    textarea.value = passMolecule
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove();
})