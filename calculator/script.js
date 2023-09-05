const text = document.querySelector('#input')
const buttons = document.querySelectorAll('button')
let values = '';
let numbers = [];
let infixToPos = [];
let res = [];
let stack = []
function onOrOff() {
    infixToPos = [];
    numbers = [];
    res = [];
    stack = [];
}
for (let b of buttons) {
    b.addEventListener('click', function () {
        let op;
        if (b.className=='equal') {
            try {
                op=infixToPostfix(values);
                text.value=!Number.isNaN(op) && op!==undefined? op:"SYNTAX ERROR";
            }
            catch (e) {
                text.value ="SYNTAX ERROR"
            }
            onOrOff();
            numbers.push(text.value.toString().substring(text.value.toString().lastIndexOf('R')+1));
              
        }
        else if (b.className=='clear') {
            text.value='';
            onOrOff();
        } else if (b.className==='del') {
            numbers.pop();
            text.value=numbers.toString().replaceAll(',', '');
        }
        else {
            if (b.id=='sqrt') {
                op=infixToPostfix(values);
                text.value=!Number.isNaN(op) && op!==undefined? Math.sqrt(op):"SYNTAX ERROR";
                onOrOff();
                numbers.push(text.value.toString().substring(text.value.toString().lastIndexOf('R')+1));
            }
            else {
                numbers.push(b.innerText);
                text.value=numbers.toString().replaceAll(',', '');
            }
        }
        values = numbers.toString().replaceAll(',', '');
    })
}

function getPrecedence(ch) {
    if(ch === '/' || ch==='x' || ch==='*' || ch=='%')
        return 3;
    else if(ch === '+' || ch === '-')
        return 2;
    else
        return 1;
}
function isValid(dig) {
    return dig.trim().length>0;
}
function infixToPostfix(values) {
    let dig='';
    let open=0, close=0;
    for (let i = 0; i < values.length; i++){
        if((values[i] >= '0' && values[i] <= '9' || values[i]==='.'))
            dig=dig+values[i];
        else if (values[i]=='(') {
            stack.push('(');
            open++;
        }
        else if (values[i]==')') {
            close++;
            if(isValid(dig))
                infixToPos.push(dig);
            dig=''
            while (stack.length && stack[stack.length-1]!='(') {
                dig+=stack.pop();
            }
            stack.pop();
            console.log(stack)
            if (isValid(dig)) {
                infixToPos.push(dig)
                dig = '';
            }
        }
        else {
            if(isValid(dig))
                infixToPos.push(dig);
            dig='';
            while(stack.length!==0 && getPrecedence(values[i])<=getPrecedence(stack[stack.length-1]))
                dig=dig+stack.pop();
            stack.push(values[i]);
            if (isValid(dig)) {
                infixToPos.push(dig)
                dig = '';
            }
        }
    }
    if(isValid(dig))
        infixToPos.push(dig)
    dig = '';
    while (stack.length !== 0 && stack[stack.length-1]!=')' && stack[stack.length-1]!='(') {
        dig=dig+stack[stack.length-1];
        stack.pop();
    }
    if (stack.length>0) return NaN;
    if (open!=close) return NaN;
    if(isValid(dig))
        infixToPos.push(dig)
    return evaluatePostfix(infixToPos);
}

function evaluatePostfix(infixToPos) {
    let oper = {
        '+': (a, b) => a + b,
        '-': (a, b) => b - a,
        'x': (a, b) => a * b,
        '/': (a, b) => b / a,
        '*': (a, b) => a*b,
        "%": (a, b) => (a/100*b)
    }    
    for (let i = 0; i < infixToPos.length; i++){
        let ch=infixToPos[i];
        if (ch==='') continue;
        if (!Number.isNaN(parseFloat(ch)))
            res.push(parseFloat(infixToPos[i]))
        else
            res.push(oper[infixToPos[i]](res.pop(), res.pop()))
    }
    return res[0];
}