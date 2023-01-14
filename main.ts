let word = document.querySelector('#inputWord') as HTMLInputElement;
let text = document.querySelector('textarea') as HTMLTextAreaElement;
let btnAdd = document.querySelector('#btnAdd') as HTMLButtonElement;
let btnReset = document.querySelector('#btnReset') as HTMLButtonElement;
let btnCenzor = document.querySelector('#btnCenzor') as HTMLButtonElement;
let arr: string[] = [];

word.oninput = function () {
    word.style.boxShadow = '0 0 10px green';
    word.style.border = '1px solid green';
}

word.onblur = function () {
    word.style.boxShadow = '';
    word.style.border = '1px solid gray';
    word.placeholder = 'word here...';
}
//add enterd word to Bad words:
btnAdd.addEventListener('click', function () {
    if (word.value.length > 0) {
        arr.push(word.value);
        let newArr = [];
        arr.forEach(element => {
            if (!newArr.includes(element)) {
                newArr.push(element);
                document.querySelector('.bw').innerHTML = `${newArr}`;
                word.value = '';
                word.style.boxShadow = '';
                word.style.border = '1px solid gray';
                word.placeholder = 'word here...';
            } else {
                word.style.boxShadow = '0 0 10px red';
                word.style.border = '1px solid red';
                word.placeholder = `The word <${element}> was already added!`;
            }
        });
        return newArr;
    } else if (word.value == '') {
        word.style.boxShadow = '0 0 10px red';
        word.style.border = '1px solid red';
        word.placeholder = 'Please write a word!';
    }
});
//clear field Bad words:
btnReset.addEventListener('click', function () {
    arr.length = 0;
    document.querySelector('.bw').innerHTML = '';
});
//while typing your text
text.oninput = function () {
    text.style.boxShadow = '0 0 10px green';
    text.style.border = '1px solid green';
}
text.onblur = function () {
    text.style.boxShadow = '';
    text.style.border = '1px solid gray';
    text.placeholder = 'text here...';
}
//make cenzor on entered words in field Bad words:
btnCenzor.addEventListener('click', function () {
    if (text.value) {
        let wordsStr: string = "";
        for (let i = 0; i < arr.length; i++) {
            wordsStr += arr[i];
            if (i < arr.length - 1) {
                wordsStr += "|";
            }
        }
        let regex = new RegExp(wordsStr, "gi");
        text.value = text.value.replace(regex, function (a) {
            return '*'.repeat(a.length)
        });
    } else {
        text.style.border = '1px solid brown';
        text.style.boxShadow = '0 0 10px brown';
        text.placeholder = 'Please write a text!';
    }
});

