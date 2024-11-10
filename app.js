function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const content = document.querySelector(".content");

  sidebar.classList.toggle("open");
  content.classList.toggle("sidebar-open");
}

// this code for the painting the tools

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("paintCanvas");
  const context = canvas.getContext("2d");
  let isPainting = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let brushSize = 5;
  let color = "black";
  let drawingHistory = []; // Array to store drawing actions

  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseout", stopPainting);

  function startPainting(event) {
    isPainting = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
  }

  function stopPainting() {
    isPainting = false;
    // Push current state to history when painting stops
    if (isPainting === false) {
      drawingHistory.push(
        context.getImageData(0, 0, canvas.width, canvas.height)
      );
    }
  }

  function draw(event) {
    if (!isPainting) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
  }

  // Set brush color
  document.getElementById("blackBrush").addEventListener("click", function () {
    color = "black";
  });

  document.getElementById("pinkBrush").addEventListener("click", function () {
    color = "#f50057";
  });

  document.getElementById("blueBrush").addEventListener("click", function () {
    color = "#2879ff";
  });

  document.getElementById("yellowBrush").addEventListener("click", function () {
    color = "yellow";
  });

  // Clear canvas
  document.getElementById("clearBtn").addEventListener("click", function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawingHistory = []; // Clear drawing history when canvas is cleared
  });

  // Eraser
  document.getElementById("eraserBtn").addEventListener("click", function () {
    color = "white";
  });

  // Brush size
  document.getElementById("brushSize").addEventListener("input", function () {
    brushSize = this.value;
  });

  // Undo functionality
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "z") {
      event.preventDefault();
      undoLastDrawing();
    }
  });

  function undoLastDrawing() {
    if (drawingHistory.length > 0) {
      context.putImageData(drawingHistory.pop(), 0, 0);
    }
  }
});
// Brush size
document.getElementById("brushSize").addEventListener("input", function () {
  brushSize = parseInt(this.value);
  document.getElementById("brushSizeDisplay").textContent = brushSize;
});
// fuction for sidebar clicking
function showSection(sectionId) {
  // Get all sections
  const sections = document.querySelectorAll("main > section");

  // Hide all sections
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Show the selected section
  document.getElementById(sectionId).style.display = "block";
}

// Initially show the home section
document.addEventListener("DOMContentLoaded", () => {
  showSection("home");
});

// this the calculator section for js

let display = document.getElementById("display");
let currentInput = "";
let operator = null;
let operand1 = null;

function appendNumber(number) {
  if (display.innerText === "0" || currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  display.innerText = currentInput;
}

function appendOperator(op) {
  if (currentInput === "" && operand1 !== null) {
    operator = op;
  } else {
    operand1 = parseFloat(currentInput);
    operator = op;
    currentInput = "";
  }
}

function clearDisplay() {
  display.innerText = "0";
  currentInput = "";
  operand1 = null;
  operator = null;
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  display.innerText = currentInput;
}

function calculate() {
  if (operator === null || currentInput === "") return;

  let operand2 = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "*":
      result = operand1 * operand2;
      break;
    case "/":
      if (operand2 === 0) {
        alert("Cannot divide by zero");
        clearDisplay();
        return;
      }
      result = operand1 / operand2;
      break;
  }

  display.innerText = result;
  currentInput = result.toString();
  operand1 = result;
  operator = null;
}

// Tax calculator

function calculateTax() {
  // Get input values
  const amount = parseFloat(document.getElementById("amount").value);
  const taxRate = parseFloat(document.getElementById("taxRate").value);

  // Validate input
  if (isNaN(amount) || isNaN(taxRate)) {
    document.getElementById("taxResult").innerText =
      "Please enter valid numbers for both fields.";
    return;
  }

  // Calculate tax and total
  const taxAmount = (amount * taxRate) / 100;
  const totalAmount = amount + taxAmount;
  const deductedAmount = amount - taxAmount;

  // Display the result
  document.getElementById("taxResult").innerHTML = `
    <p>Tax Amount: $${taxAmount.toFixed(2)}</p>
    <p>Total Amount: $${totalAmount.toFixed(2)}</p>
    <p>Amount in Hand: $${deductedAmount.toFixed(2)}</p>
  `;
}

// Function to show tax calculator section
function showTaxCalculator() {
  document.getElementById("tax-calculator").style.display = "block";
  document.getElementById("calculator").style.display = "none";
  document.getElementById("painting").style.display = "none";
  document.getElementById("other").style.display = "none";
}
