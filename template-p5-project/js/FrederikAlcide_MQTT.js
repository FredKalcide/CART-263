'use strict';




let mudaSound;
let reverb;
let lowpass;
let fft;
let effects;
let xRect = 250;
let bitFont;
var count = 0;
var mudaButton;


function preload() {
  mudaSound = loadSound('assets/sounds/muda_muda_muda_sound_effect.wav');
  reverb = new p5.Reverb();
  effects = new p5.Effect();
  bitFont= loadFont ('js/Rude Goldberg/PixeloidMono-1G8ae.ttf')// font courtesy of https://www.fontspace.com/tvcd-font-f78518
}


function setup() {
	createCanvas(1000, 500);


  mudaSound.disconnect();
}

function draw(){
  background(150);
  loadingBarText();
  reverbText();
  loadingBar();
  firstStep();
  secondStep();



}
function reverbText(){

  let reverbvalue = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
  // 1 = all reverb, 0 = no reverb
  reverb.drywet(reverbvalue);
  textFont(bitFont);
  text('reverb: ' + round(reverbvalue * 100) + '%', width - 700, height - 50);
}

function keyPressed(){
  reverb.process (mudaSound,20, 5);
  console.log ("reverb activated");
  return true;

}

function firstStep(){
  if(xRect >= 500){ // stopping the progress of the bar once it reaches 500

    xRect = 500;
    setupMudaButton();

  }

}

function secondStep(){
  if (count >= 5){
    xRect = xRect - 1;
  }

}



function loadingBar() {
    fill(0, 0, 0)//black rectangle forming the border of the loading bar
    rect(240, 290, 520, 70)
    fill (255, 255, 255);//white rectangle, the inside of the loading bar
    rect(250, 300, 500, 50)
    fill (0, xRect-250, 50);//progress bar/square itself
    rect(xRect, 300, 50, 50);
      xRect = xRect+1;
     // movement for the progrees bar
    print(xRect);
    if(xRect > 700){//resetting the movement of the bar if it reaches the end
      xRect = 250;
    }

}

function setupMudaButton(){
    mudaButton = createButton('Muda');
    mudaButton.position(100, 100);
    mudaButton.mousePressed(changePosition);
    mudaSound.play();
    }

    function changePosition(){
      mudaButton.position(random(255), random(255));
    }

function loadingBarText(){
  for(let i=0; i<=3; i++){ //loading bar text with chromattic abberation effect
      if(i==0){
        fill(255, 0, 0);
      }else if(i==1){
        fill(0, 255, 0);
      }else if(i==2){
        fill(0, 0, 255);
      }else if(i==3){
          fill(255, 255, 255);
        }
      textSize(50);
      textFont(bitFont);
      text('LOADING', 400+(2.5*i), 260 );
  }
}
