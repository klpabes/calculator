"use strict";

const output = document.querySelector("[data-output]");
const input = document.querySelector("[data-input]");
const numBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");

const allClearBtn = document.querySelector("[data-all-clear]");
const clearBtn = document.querySelector("[data-clear]");
const periodBtn = document.querySelector("[data-period]");
const equalsBtn = document.querySelector("[data-equals]");

// calculation
function operate(a, b, operator) {
  const first = parseFloat(a);
  const second = parseFloat(b);
  if (isNaN(first) || isNaN(second)) return;
  switch (operator) {
    case "+":
      return first + second;
    case "-":
    case "−":
      return first - second;
    case "×":
      return first * second;
    case "÷":
      return first / second;
    default:
      return;
  }
}

//input numbers to calculator screen
[...numBtns].forEach((button) =>
  button.addEventListener("click", function () {
    if (input.textContent.length < 12) appendNumber(button.textContent);
  })
);

//appending numbers to text content of input
function appendNumber(number) {
  input.textContent += number;
}

//AC - all clear function
allClearBtn.addEventListener("click", function () {
  input.textContent = "";
  output.textContent = "";
});

//C - clear function, backspace
clearBtn.addEventListener("click", function () {
  input.textContent = input.textContent.toString().slice(0, -1);
});

//period button for decimals
periodBtn.addEventListener("click", function (e) {
  if (input.textContent.length > 0 && !input.textContent.includes("."))
    input.textContent += e.target.textContent;
});

//operator button function
[...operatorBtns].forEach((button) =>
  button.addEventListener("click", function (e) {
    if (output.textContent !== "") {
      const outputStr = output.textContent.split(" ");
      if (e.target.innerText !== outputStr[1]) {
        //operator change
        outputStr[1] = e.target.innerText;
        output.textContent = outputStr.join(" ");
        return;
      }
      const [num, op] = [...outputStr]; //produce output when operator is pressed again
      output.textContent =
        roundResult(operate(num, input.innerText, op)) +
        " " +
        e.target.innerText +
        " ";
      input.textContent = "";
      return;
    }
    output.textContent = input.textContent + " " + e.target.innerText + " ";
    input.textContent = "";
  })
);

//equals button function
equalsBtn.addEventListener("click", function () {
  if (input.textContent === "") return;
  if (output.textContent !== "") {
    const outputStr = output.textContent.split(" ");
    const [num, op] = [...outputStr];
    input.textContent = roundResult(operate(num, input.textContent, op));
    output.textContent = "";
  }
});

// round the output if using equals, to exponent if length exceeds
function roundResult(result) {
  return !Number.isInteger(result)
    ? result.toFixed(2)
    : result.toString().length >= 16
    ? result.toExponential(2)
    : result;
}
