window.onload = function() {
  updateInfo();

  var drawClassBtn = document.getElementById("drawClass");
  drawClassBtn.onclick = drawClass;

  var drawChairBtn = document.getElementById("drawChair");
  drawChairBtn.onclick = drawChair;

  var clearBtn = document.getElementById("clear");
  clearBtn.onclick = clear;

  var saveBtn = document.getElementById("save");
  saveBtn.onclick = save;

  canvas.onclick = selectChair;
}

function getCtx() {
  var canvas  = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  return ctx;
}

function getWidth() {
  return canvas.width;
}

function getHeight() {
  return canvas.height;
}

function getRows() {
  var rows = document.getElementById("rows").value;
  return rows;
}

function getCols() {
  var cols = document.getElementById("cols").value;
  return cols;
}

function save() {
  window.location = canvas.toDataURL('image/png');
}

function clear() {
  getCtx().clearRect(0, 0, getWidth(), getHeight());
}

function updateInfo() {
  document.getElementById("rowVal").innerHTML = getRows();
  document.getElementById("colVal").innerHTML = getCols();
  setTimeout(updateInfo, 10);
}

function drawClass() {
  clear();
  
  getCtx().strokeStyle = 'black';
  // Draw rows
  for (i = 0; i <= getRows(); ++i) {
    getCtx().beginPath();
    getCtx().moveTo(0, i/getRows()*getHeight());
    getCtx().lineTo(getWidth(), i/getRows()*getHeight());
    getCtx().stroke();
  }
  
  // Draw cols
  for (i = 0; i <= getCols(); ++i) {
    getCtx().beginPath();
    getCtx().moveTo(i/getCols()*getWidth(), 0);
    getCtx().lineTo(i/getCols()*getWidth(), getWidth());
    getCtx().stroke();
  } 
}

function drawChair() {
  var chairX = document.getElementById("chairX").value - 1;
  var chairY = document.getElementById("chairY").value - 1;
  var chairID = document.getElementById("chairID").value;
  var startX = chairX/getCols()*getWidth();
  var startY = chairY/getRows()*getHeight();
  
  getCtx().fillStyle = 'gray';
  getCtx().fillRect(startX, startY, getWidth()/getCols(), getHeight()/getRows());
  getCtx().strokeStyle = 'white';
  getCtx().strokeText(chairID, startX, (chairY+1)/getRows()*getHeight());
}

function selectChair(mouseEvent) {
  var xPos = mouseEvent.pageX-canvas.offsetLeft;
  var yPos = mouseEvent.pageY-canvas.offsetTop;
  var chairX = document.getElementById("chairX");
  var chairY = document.getElementById("chairY");
  
  xPos = Math.floor(xPos/(getWidth()/getCols())) + 1;
  yPos = Math.floor(yPos/(getHeight()/getRows())) + 1;
  
  
  chairX.value = xPos;
  chairY.value = yPos;
}
