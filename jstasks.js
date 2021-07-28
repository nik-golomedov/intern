const degree = (n, deg) => {
  if (deg === 1) {
    return n;
  } else {
    return n * degree(n, deg - 1);
  }
}

const flatArr = arr => arr.reduce((acc, item) => (
  acc.concat((Array.isArray(item)) ? flatArr(item) : item)
), []);

const toTranslate = (n, countCalls) => {

  const fn = {
    0: '',
    1: 'один',
    2: 'два',
    3: 'три',
    4: 'четыре',
    5: 'пять',
    6: 'шесть',
    7: 'семь',
    8: 'восемь',
    9: 'девять'
  };
  const sn = {
    10: 'десять',
    11: 'одиннадцать',
    12: 'двенадцать',
    13: 'тринадцать',
    14: 'четырнадцать',
    15: 'пятнадцать',
    16: 'шестнадцать',
    17: 'семнадцать',
    18: 'восемнадцать',
    19: 'девятнадцать'
  };
  const rsn = {
    2: 'двадцать',
    3: 'тридцать',
    4: 'сорок',
    5: 'пятьдесят',
    6: 'шестьдесят',
    7: 'семьдесят',
    8: 'восемьдесят',
    9: 'девяносто'
  };
  const rtn = {
    1: 'сто',
    2: 'двести',
    3: 'триста',
    4: 'четыреста',
    5: 'пятьсот',
    6: 'шестьсот',
    7: 'семьсот',
    8: 'восемьсот',
    9: 'девятьсот'
  };
  
  let stringNum = n.toString();

  let currentCountCalls;
  if (countCalls === undefined) {
    currentCountCalls = 0;
  } else {
    currentCountCalls = countCalls + 1;
  }

  if (stringNum === '0' && countCalls === undefined) {
    return 'ноль';
  }

  if (stringNum.length === 1) {
    return fn[stringNum];
  }

  if (stringNum.length === 2) {
    if (stringNum.startsWith('1')) {
      return sn[stringNum];
    }
    return (stringNum[0] === '0' ? '' : rsn[stringNum[0]]) +
      (checkSpace(stringNum[1]) +
        toTranslate(stringNum[1], currentCountCalls));
  }

  if (stringNum.length === 3) {
    if (stringNum[0] === '0') {
      return toTranslate(stringNum.slice(1), currentCountCalls);
    }
    return rtn[stringNum[0]] + checkSpace(stringNum[1]) +
      toTranslate(stringNum.slice(1), currentCountCalls);
  }

  if (stringNum.length === 4) {
    if (stringNum[0] === '0') {
      return countWithThous(stringNum) +
        toTranslate(stringNum.slice(1), currentCountCalls);
    }
    if (stringNum[0] === '1') {
      return 'одна' + countWithThous(stringNum) +
        toTranslate(stringNum.slice(1), currentCountCalls);
    }
    if (stringNum[0] === '2') {
      return 'две' + countWithThous(stringNum) +
        toTranslate(stringNum.slice(1), currentCountCalls);
    }
    return fn[stringNum[0]] + countWithThous(stringNum) +
      toTranslate(stringNum.slice(1), currentCountCalls);
  }

  if (stringNum.length === 5) {
    if (sn.hasOwnProperty(stringNum.slice(0, 2))) {
      return sn[stringNum.slice(0, 2)] + ' тысяч' +
        ((stringNum[2] === '0' && stringNum[3] === '0') ? '' :
          hardCheckSpace(stringNum)) +
        toTranslate(stringNum.slice(2), currentCountCalls);
    }
    return rsn[stringNum[0]] + ' ' +
      toTranslate(stringNum.slice(1), currentCountCalls);
  }

  if (stringNum === '100000') {
    return 'сто тысяч';
  }
  return 'Ваше число слишком большое';
}

function checkThous(n) {
  if (n === '1') {
    return ' тысяча';
  }
  if (n === "2" || n === "3" || n === "4") {
    return ' тысячи';
  }
  return ' тысяч';
}

function checkSpace(n) {
  if (n === '0') {
    return ''
  }
  return ' '
}

function hardCheckSpace(n) {
  return (checkSpace(n[1]) && checkSpace(n[2])) ?
    checkSpace(n[1]) :
    (checkSpace(n[1]) + checkSpace(n[2]));
}

function countWithThous(n) {
  return checkThous(n[0]) +
    hardCheckSpace(n);
}
