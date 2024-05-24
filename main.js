const wordsData = [
  'apples',
  'oranges',
  'mango',
  'carrots',
  'onions',
  'brocoli',
  'Cherry',
  'Coconut',
  'Kiwi',
  'Starfruit',
];

let triesCount = 1;
let pointsCount = 0;
const scrambledWords = wordsData.map((word) => scramble(word.toLowerCase()));

const displayArea = document.querySelector('.display__area');
const inputWrapper = document.querySelector('.input__wrapper');
const triesSpan = document.getElementById("tries");
const pointsSpan = document.getElementById("points");
let displayingWord = '';
let displayingWordObj;


let inputFields = Array.from(
  inputWrapper.getElementsByClassName('input__field')
);


const displayWords = (index = 5) => {
  displayingWordObj = scrambledWords[index];
  displayingWord = Object.keys(displayingWordObj)[0];
  displayArea.innerHTML = displayingWord;
 

  localStorage.setItem("displayingWordObj", JSON.stringify(displayingWordObj));
  localStorage.setItem("displayingWord", displayingWord);


  let inputFiled = '';

  for(let i=0; i<displayingWord.length; i++) {
    inputFiled += `<input type="text" class="input__field" maxlength="1" value="" />`;
  }
  inputWrapper.innerHTML = inputFiled;
  inputFields = Array.from(
    inputWrapper.getElementsByClassName('input__field')
  );
  lastInput = inputFields[inputFields.length - 1];
  inputFields[0].focus();
  triesSpan.innerText = `Tries(1/5):`;
};


inputWrapper.addEventListener('input', function (e) {
  const target = e.target;
  const val = target.value;
  if (val != '') {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    } else {     
      validateAnswer(); 
    }
  }
});

inputWrapper.addEventListener('keyup', function (e) {
  const target = e.target;
  const key = e.key.toLowerCase();
  if (key == 'backspace' || key == 'delete') {
    target.value = '';
    const prev = target.previousElementSibling;
    if (prev) {
      prev.focus();
    }
    return;
  }
});


const validateAnswer = () => {
  let word = localStorage.getItem("displayingWord");
  let obj = JSON.parse(localStorage.getItem("displayingWordObj"));

  let result = '';
  inputFields.forEach((ele)=> {
    result += ele.value;
  })
  
  if(result === obj[word]){
    pointsCount++;
    pointsSpan.innerText = `${pointsCount}`;

      if(pointsCount == 10) {
        alert("You are winner..!!");
      }
      else {
        random();
      }
    }
  else {
    inputFields.forEach((ele)=> {
      ele.style.border = "1px solid red";
    })
    triesCount++;
  }
  
} 
  
  

const random = () => {
  let randomIndex = Math.floor(Math.random() * wordsData.length);
  displayWords(randomIndex);
};

const reset = () => {

  inputFields.forEach((ele) => {
    ele.value = '';
    ele.style.border = '';
  });

  if(triesCount < 6) {
    triesSpan.innerText = `Tries(${triesCount}/5):`;
  } 
  else {
    triesCount = 1;
    random();
  }  

};

function scramble(word) {
  const orginalword = word;
  let obj = {};
  strarray = word.split('');
  var i, j, k;
  for (i = 0; i < strarray.length; i++) {
    j = Math.floor(Math.random() * i);
    k = strarray[i];
    strarray[i] = strarray[j];
    strarray[j] = k;
  }
  word = strarray.join('');
  obj[word] = orginalword;
  return obj;
}

displayWords();


