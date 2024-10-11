const canvas_width = 480;
const canvas_height = 305;

let pitch;
let mic;
let currentFreq;
let currentString;
let targetAngle = 0;
let currentAngle = 0;

const guitarStrings = [
{
  name: 'DO',
  frequency: 16.35
},
{
  name: 'DO',
  frequency: 32.70
},
{
  name: 'DO',
  frequency: 65.41
},
{
  name: 'DO',
  frequency: 130.81
},
{
  name: 'DO',
  frequency: 261.63
},
{
  name: 'DO',
  frequency: 523.25
},
{
  name: 'DO',
  frequency: 1046.50
},
{
  name: 'DO',
  frequency: 2093.00
},
{
  name: 'DO',
  frequency: 4186.01
},
{
  name: 'DO#',
  frequency: 17.32
},
{
  name: 'DO#',
  frequency: 34.65
},
{
  name: 'DO#',
  frequency: 69.30
},
{
  name: 'DO#',
  frequency: 138.59
},
{
  name: 'DO#',
  frequency: 277.18
},
{
  name: 'DO#',
  frequency: 554.37
},
{
  name: 'DO#',
  frequency: 1108.73
},
{
  name: 'DO#',
  frequency: 2217.46
},
{
  name: 'DO#',
  frequency: 4434.92
},
{
  name: 'RE',
  frequency: 18.35
},
{
  name: 'RE',
  frequency: 36.71
},
{
  name: 'RE',
  frequency: 73.42
},
{
  name: 'RE',
  frequency: 146.83
},
{
  name: 'RE',
  frequency: 293.66
},
{
  name: 'RE',
  frequency: 587.33
},
{
  name: 'RE',
  frequency: 1174.66
},
{
  name: 'RE',
  frequency: 2349.32
},
{
  name: 'RE',
  frequency: 4698.64
},
{
  name: 'RE#',
  frequency: 19.45
},
{
  name: 'RE#',
  frequency: 38.89
},
{
  name: 'RE#',
  frequency: 77.78
},
{
  name: 'RE#',
  frequency: 155.56
},
{
  name: 'RE#',
  frequency: 311.13
},
{
  name: 'RE#',
  frequency: 622.25
},
{
  name: 'RE#',
  frequency: 1244.51
},
{
  name: 'RE#',
  frequency: 2489.02
},
{
  name: 'RE#',
  frequency: 4978.03
},
{
  name: 'MI',
  frequency: 20.60
},
{
  name: 'MI',
  frequency: 41.20
},
{
  name: 'MI',
  frequency: 82.41
},
{
  name: 'MI',
  frequency: 164.81
},
{
  name: 'MI',
  frequency: 329.63
},
{
  name: 'MI',
  frequency: 659.25
},
{
  name: 'MI',
  frequency: 1318.51
},
{
  name: 'MI',
  frequency: 2637.02
},
{
  name: 'MI',
  frequency: 5274.04
},
{
  name: 'FA',
  frequency: 21.83
},
{
  name: 'FA',
  frequency: 43.65
},
{
  name: 'FA',
  frequency: 87.31
},
{
  name: 'FA',
  frequency: 174.61
},
{
  name: 'FA',
  frequency: 349.23
},
{
  name: 'FA',
  frequency: 698.46
},
{
  name: 'FA',
  frequency: 1396.91
},
{
  name: 'FA',
  frequency: 2793.83
},
{
  name: 'FA',
  frequency: 5587.65
},
{
  name: 'FA#',
  frequency: 23.12
},
{
  name: 'FA#',
  frequency: 46.25
},
{
  name: 'FA#',
  frequency: 92.50
},
{
  name: 'FA#',
  frequency: 185.00
},
{
  name: 'FA#',
  frequency: 369.99
},
{
  name: 'FA#',
  frequency: 739.99
},
{
  name: 'FA#',
  frequency: 1479.98
},
{
  name: 'FA#',
  frequency: 2959.96
},
{
  name: 'FA#',
  frequency: 5919.91
},
{
  name: 'SOL',
  frequency: 24.50
},
{
  name: 'SOL',
  frequency: 49.00
},
{
  name: 'SOL',
  frequency: 98.00
},
{
  name: 'SOL',
  frequency: 196.00
},
{
  name: 'SOL',
  frequency: 392.00
},
{
  name: 'SOL',
  frequency: 783.99
},
{
  name: 'SOL',
  frequency: 1567.98
},
{
  name: 'SOL',
  frequency: 3135.96
},
{
  name: 'SOL',
  frequency: 6271.93
},
{
  name: 'SOL#',
  frequency: 25.96
},
{
  name: 'SOL#',
  frequency: 51.91
},
{
  name: 'SOL#',
  frequency: 103.83
},
{
  name: 'SOL#',
  frequency: 207.65
},
{
  name: 'SOL#',
  frequency: 415.30
},
{
  name: 'SOL#',
  frequency: 830.61
},
{
  name: 'SOL#',
  frequency: 1661.22
},
{
  name: 'SOL#',
  frequency: 3322.44
},
{
  name: 'SOL#',
  frequency: 6644.88
},
{
  name: 'LA',
  frequency: 27.50
},
{
  name: 'LA',
  frequency: 55.00
},
{
  name: 'LA',
  frequency: 110.00
},
{
  name: 'LA',
  frequency: 220.00
},
{
  name: 'LA',
  frequency: 440.00
},
{
  name: 'LA',
  frequency: 880.00
},
{
  name: 'LA',
  frequency: 1760.00
},
{
  name: 'LA',
  frequency: 3520.00
},
{
  name: 'LA',
  frequency: 7040.00
},
{
  name: 'LA#',
  frequency: 29.14
},
{
  name: 'LA#',
  frequency: 58.27
},
{
  name: 'LA#',
  frequency: 116.54
},
{
  name: 'LA#',
  frequency: 233.08
},
{
  name: 'LA#',
  frequency: 466.16
},
{
  name: 'LA#',
  frequency: 932.33
},
{
  name: 'LA#',
  frequency: 1864.66
},
{
  name: 'LA#',
  frequency: 3729.31
},
{
  name: 'LA#',
  frequency: 7458.62
},
{
  name: 'SI',
  frequency: 30.87
},
{
  name: 'SI',
  frequency: 61.74
},
{
  name: 'SI',
  frequency: 123.47
},
{
  name: 'SI',
  frequency: 246.94
},
{
  name: 'SI',
  frequency: 493.88
},
{
  name: 'SI',
  frequency: 987.77
},
{
  name: 'SI',
  frequency: 1975.53
},
{
  name: 'SI',
  frequency: 3951.07
},
{
  name: 'SI',
  frequency: 7902.13
}
];
function setup() {
  const containerWidth = select('#tuner-container').width;
  const canvasWidth = min(containerWidth, 480);
  const canvasHeight = (canvasWidth / 480) * 305;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('tuner-container');
  noLoop();
  createButtons();
}
function windowResized() {
  const containerWidth = select('#tuner-container').width;
  const canvasWidth = min(containerWidth, 480);
  const canvasHeight = (canvasWidth / 480) * 305;
  resizeCanvas(canvasWidth, canvasHeight);
}
function draw() {
  background(220);
  drawTuner();
  drawNoteInfo();
}
function drawTuner() {
  const centerX = width / 2;
  const centerY = height * 0.7;
  const radius = min(width, height) * 0.4;
  fill(30);
  noStroke();
  rect(0, centerY - radius - 30, width, radius * 2 + 60, 20);
  noFill();
  stroke(200);
  strokeWeight(2);
  arc(centerX, centerY, radius * 2, radius * 2, -PI * 5/6, -PI/6);
  stroke(255);
  for (let i = -4; i <= 4; i++) {
    let angle = map(i, -4, 4, -PI * 5/6, -PI/6);
    let x1 = centerX + cos(angle) * radius;
    let y1 = centerY + sin(angle) * radius;
    let x2 = centerX + cos(angle) * (radius - 10);
    let y2 = centerY + sin(angle) * (radius - 10);
    line(x1, y1, x2, y2);
  
    if (i === 0) {
      stroke(0, 255, 0);
      strokeWeight(3);
      line(x1, y1, x2, y2);
      stroke(255);
      strokeWeight(2);
    }
  }
  push();
  translate(centerX, centerY);
  rotate(currentAngle - PI/2);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(0, 0, radius - 10, 0);
  fill(255, 0, 0);
  pop();
}
function drawNoteInfo() {
  const noteText = currentString ? currentString.name : '--';
  const freqText = currentFreq ? currentFreq.toFixed(2) + ' Hz' : '--';
  fill(30);
  noStroke();
  rect(0, 0, width, height * 0.3, 20, 20, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(width * 0.1);
  text(noteText, width / 2, height * 0.1);
  textSize(width * 0.06);
  text(freqText, width / 2, height * 0.2);
}
function updateTuner() {
  if (!currentFreq) return;
  currentString = getCurrentString(currentFreq);
  if (!currentString) return;
  const targetFreq = currentString.frequency;
  const frequencyDifference = currentFreq - targetFreq;
  const maxDifference = 3;
  targetAngle = map(frequencyDifference, -maxDifference, maxDifference, -PI/4, PI/4);
  targetAngle = constrain(targetAngle, -PI/4, PI/4);
  const easing = 0.15;
  currentAngle += (targetAngle - currentAngle) * easing;
  redraw();
}
function getCurrentString(frequency) {
  return guitarStrings.reduce((closest, current) => {
    return (Math.abs(current.frequency - frequency) < Math.abs(closest.frequency - frequency)) ? current : closest;
  });
}
function startPitch() {
  const audioContext = new AudioContext();
  pitch = ml5.pitchDetection(
    'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/',
    audioContext,
    mic.stream,
    modelLoaded
  );
}
function modelLoaded() {
  getPitch();
}
function getPitch() {
  pitch.getPitch((err, frequency) => {
    if (frequency) {
      currentFreq = frequency;
      updateTuner();
    }
    getPitch();
  });
}
function createButtons() {
  const buttonContainer = select('#button-container');
  const startButton = createButton('COMENZAR A AFINAR');
  startButton.id('startButton');
  startButton.parent(buttonContainer);
  startButton.mousePressed(startTuner);
  const stopButton = createButton('DETENER MICRÓFONO');
  stopButton.id('stopButton');
  stopButton.parent(buttonContainer);
  stopButton.mousePressed(stopMicrophone);
  stopButton.attribute('disabled', '');
  const homeButton = createButton('VOLVER AL INICIO');
  homeButton.id('homeButton');
  homeButton.parent(buttonContainer);
  homeButton.mousePressed(goHome);
}
function startTuner() {
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  document.getElementById('startButton').setAttribute('disabled', '');
  document.getElementById('stopButton').removeAttribute('disabled');
  document.getElementById('homeButton').removeAttribute('disabled');
}
function stopMicrophone() {
  if (mic) {
    mic.stop();
  }
  document.getElementById('startButton').removeAttribute('disabled');
  document.getElementById('stopButton').setAttribute('disabled', '');
}
function goHome() {
  window.location.href = 'index.html';
  close()
}
function displayButton() {
  const button = createButton('COMENZAR A AFINAR');
  button.position(canvas_width / 2 - 100, canvas_height - 60);
  button.class('start-button');
  button.mousePressed(() => {
    userStartAudio();
    mic = new p5.AudioIn();
    mic.start(startPitch);
    button.remove();
  });
}