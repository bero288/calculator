//objectes of buttons
let calculator_buttons = [
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  ,
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
];
const INPUT_ELEMENT = document.querySelector(".calc-container .input");
const OUTPUT_RESULT_ELEMENT = document.querySelector(".result .value");
const OUTPUT_OPERATION_ELEMENT = document.querySelector(".output .operation");
//create every button
function createButtons() {
  const BTNS_PER_ROW = 4;
  let addedButtons = 0;
  calculator_buttons.forEach((button) => {
    if (addedButtons % BTNS_PER_ROW == 0) {
      INPUT_ELEMENT.innerHTML += '<div class="row"></div>';
    }
    const ROW = document.querySelector(".row:last-child");
    ROW.innerHTML += `<button id = "${button.name}" > ${button.symbol} </button>`;
    addedButtons++;
  });
}
createButtons();
//click event
INPUT_ELEMENT.addEventListener("click", (event) => {
  const TARGET_BTN = event.target;
  calculator_buttons.forEach((btn) => {
    if (btn.name == TARGET_BTN.id) calcutor(btn);
  });
});
//calc data
let data = {
  operation: [],
  result: [],
};
function calcutor(btn) {
  if (btn.type == "key") {
    if (btn.name == "delete") {
      data.operation.pop();
      data.result.pop();
    } else if (btn.name == "clear") {
      data.operation = [];
      data.result = [];
      updateOutPutResult(0);
    }
  } else if (btn.type == "number") {
    data.operation.push(btn.symbol);
    data.result.push(btn.formula);
  } else if (btn.type == "operator") {
    data.operation.push(btn.symbol);
    data.result.push(btn.formula);
  } else if (btn.type == "calculate") {
    let joined_data = data.result.join("");
    let result = joined_data;
    result = formatResult(result);
    updateOutPutResult(result);
    data.operation = [];
    data.result = [];
    data.operation.push(result);
    data.result.push(result);
    return;
  }
}
function updateOutPutOperation(operation) {
  OUTPUT_OPERATION_ELEMENT.innerHTML = operation;
}
function updateOutPutResult(result) {
  OUTPUT_RESULT_ELEMENT.innerHTML = result;
}
//format number
function formatResult(result) {
  const MAX_NUMB_OF_DIGITS = 10;
  const OUTPUT_PERCESION = 5;
  if (counter(result) < MAX_NUMB_OF_DIGITS) {
    return result;
  } else {
    if (isFloat(result)) {
      const RESULT_INTG = parseInt(result);
      let RESULT_INTG_LENGTH = counter(RESULT_INTG);
      if (RESULT_INTG_LENGTH > MAX_NUMB_OF_DIGITS) {
        result.toPrecision(OUTPUT_PERCESION);
      } else {
        const NUMBER_OF_DIGITS_AFTER_POINT =
          MAX_NUMB_OF_DIGITS - RESULT_INTG_LENGTH;
        return result.toFixed(NUMBER_OF_DIGITS_AFTER_POINT);
      }
    } else {
      return result.toPrecision(OUTPUT_PERCESION);
    }
  }
}
//count the number of digits
function counter(result) {
  let length = result.toString().length;
  return length;
}
//check if it is a decimal number
function isFloat(number) {
  return number % 1 != 0;
}
