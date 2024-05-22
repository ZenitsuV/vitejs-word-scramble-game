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
const scrambledWords = wordsData.map((word) => scramble(word));

const displayArea = document.querySelector('.display__area');
const inputWrapper = document.querySelector('.input__wrapper');

const inputFields = Array.from(
  inputWrapper.getElementsByClassName('input__field')
);

const lastInput = inputFields[inputFields.length - 1];

inputWrapper.addEventListener('input', function (e) {
  const target = e.target;
  const val = target.value;
  if (val != '') {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
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

lastInput.addEventListener('keyup', (e) => {
  inputFields.forEach((ele) => {});
});

const displayWords = (index = 5) => {
  const scrambledWord = Object.keys(scrambledWords[index]);
  displayArea.innerHTML = Object.keys(scrambledWord);
};

const random = () => {
  let randomIndex = Math.floor(Math.random() * wordsData.length);
  displayWords(randomIndex);
};

const reset = () => {
  inputFields.forEach((ele) => {
    ele.value = '';
    ele.style.border = '';
  });
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
