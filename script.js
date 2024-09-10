let inputDisplay = document.querySelector(".inputDisplay");
let autoClaculatedValueDisplayer = document.querySelector(
  ".autoClaculatedValueDisplayer"
);

let buttons = document.querySelectorAll(".buttonClass");

let currentEquation = "";
let equationLength = 0;
let isOpeningParenthesis = true;

let operatorsArray = ["+", "-", "*", "/", "%", "(", ")"];

buttons.forEach((button) => {
  let clickedValue = button.getAttribute("id");
  button.addEventListener("click", () => {
    buttonClickVibration();
    if (clickedValue === "=") {
      calculateValue();
    } else if (clickedValue === "idAllClear") {
      inputDisplay.value = "";
      currentEquation = "";
      equationLength = 0;
      autoClaculatedValueDisplayer.innerText = "0";
    } else if (clickedValue === "delete") {
      currentEquation = currentEquation.slice(0, -1);
      inputDisplay.value = currentEquation;
      equationLength = currentEquation.length;
    } else {
      currentEquation += clickedValue;
      inputDisplay.value = currentEquation;
      equationLength++;

      inputDisplayToRight();

      if (operatorsArray.every((operator) => operator !== clickedValue)) {
        autoCalculate();
      }
    }
    displayInputSize();
  });
});

function displayInputSize() {
  if (equationLength <= 10) {
    inputDisplay.style.fontSize = "4em";
  } else if (equationLength === 11) {
    inputDisplay.style.fontSize = "3.5em";
  } else if (equationLength === 12) {
    inputDisplay.style.fontSize = "3.2em";
  } else if (equationLength === 13) {
    inputDisplay.style.fontSize = "2.9em";
  } else if (equationLength >= 14) {
    inputDisplay.style.fontSize = "2.6em";
  }
}

function calculateValue() {
  let equationsLastChar = currentEquation.charAt(currentEquation.length - 1);
  if (operatorsArray.every((operator) => operator !== equationsLastChar)) {
    try {
      currentEquation = eval(currentEquation);
      inputDisplay.value = currentEquation;
      autoClaculatedValueDisplayer.innerText = "";
    } catch (error) {
      resultErrorVibration();
      inputDisplay.value = "ERROR";
      autoClaculatedValueDisplayer.innerText = "";
    }
  } else {
    alert(`Equations last value cannot be ${equationsLastChar} `);
  }
}

function autoCalculate() {
  try {
    autoCalculatedEquation = eval(currentEquation);
    autoClaculatedValueDisplayer.innerText = autoCalculatedEquation;
  } catch (error) {
    console.log(error);
  }
}

// VIBRATION ON BUTTONCLICK FUNCTION
function buttonClickVibration() {
  if (navigator.vibrate) {
    navigator.vibrate(20);
  } else {
    alert("Vibration API not supported on this device.");
  }
}
// VIBRATION ON ERROR FUNCTION
function resultErrorVibration() {
  if (navigator.vibrate) {
    navigator.vibrate(300);
  } else {
    alert("Vibration API not supported on this device.");
  }
}

// BUTTONS HIDING FUNCTION
function hideButtonsFunction() {
  let buttonsCnt = document.querySelector(".buttonsContainer");
  buttonsCnt.classList.add("hideButtonsClass");
}
// BUTTONS UNHIDING FUNCTION
function showButtonsFunction() {
  let buttonsCnt = document.querySelector(".buttonsContainer");
  buttonsCnt.classList.remove("hideButtonsClass");
}
