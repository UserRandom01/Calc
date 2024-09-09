let buttons = document.querySelectorAll(".buttonClass");
let inputDisplay = document.querySelector(".inputDisplay");
let quickResultDisplayer = document.querySelector(".immediateResultDisplayer");

let currentEquation = "";
let equationLength = 0;
let isOpeningParenthesis = true;

buttons.forEach((button) => {
  changeParenthesis();
  button.addEventListener("click", () => {
    buttonClickVibration();
    let inputValue = button.getAttribute("id");

    if (inputValue === "=") {
      calculateSum();
      isOpeningParenthesis = true;
    } else if (
      inputValue === "idAllClear" ||
      inputDisplay.innerHTML === "ERROR"
    ) {
      currentEquation = "";
      inputDisplay.innerHTML = "";
      equationLength = 0;
      isOpeningParenthesis = true;
    } else {
      inputDisplay.style.color = "var(--colorText)";
      currentEquation += inputValue;
      inputDisplay.innerHTML = currentEquation;
      equationLength++;
    }
    equationFontSize(equationLength);
  });
});

function calculateSum() {
  try {
    resultsOfEquation = eval(currentEquation);
    inputDisplay.innerText = resultsOfEquation;
    equationLength = 0;
  } catch (error) {
    resultErrorVibration();
    inputDisplay.innerText = "ERROR";
    inputDisplay.style.color = "red";
    equationLength = 0;
  }
}

function changeParenthesis() {
  let parenthesisDiv = document.querySelector(".parenthesisClass");
  parenthesisDiv.addEventListener("click", () => {
    if (isOpeningParenthesis) {
      parenthesisDiv.setAttribute("id", ")");
      isOpeningParenthesis = false;
    } else {
      parenthesisDiv.setAttribute("id", "(");
      isOpeningParenthesis = true;
    }
  });
}

function buttonClickVibration() {
  if (navigator.vibrate) {
    navigator.vibrate(20);
  } else {
    alert("Vibration API not supported on this device.");
  }
}

function resultErrorVibration() {
  if (navigator.vibrate) {
    navigator.vibrate(300);
  } else {
    alert("Vibration API not supported on this device.");
  }
}

function hideButtonsFunction() {
  let buttonsCnt = document.querySelector(".buttonsContainer");

  buttonsCnt.classList.add("hideButtonsClass");
}
function showButtonsFunction() {
  let buttonsCnt = document.querySelector(".buttonsContainer");

  buttonsCnt.classList.remove("hideButtonsClass");
}
