//screens_in_spaces project
// the goal was to invite the public to share a moment of calm and meditation in the hallway, focusing on the screen while interacting with it for a minute, using a common sign as a prompt to be in touch with oneself
// wish i couldve gone futher with the concept, with perhaps a variety of prompts appearing over time, with different interactive effects for each prompt, but i wanted to keep things simple for my first project
let font;
let rectX = [];
let rectY = [];

function preload() {

  font = loadFont ('assets/antonio-bold.ttf') // downloaded from https://www.fontsquirrel.com/fonts/list/tag/condensed
}
function setup(){
  createCanvas(2800,1900);
  background(250,250,250);
  textFont(font);
  fill(240, 50, 0);
  textSize(1000);
  text('SORTIE', 0, 1200); //drawing exit signage spoof
  triangle(2500, 1100, 2500, 500, 2700, 800);
  for (let i = 0; i < 50; i++){ //loop assigning random x and y coordinate values to coordinate variables
    rectX[i] = random (0, width)
    rectY[i] = random (0, height)
  }
}

function SORTIEsquarePositions(){

  for (let i = 0; i < 50; i++){ //loop assigning random x and y coordinate values to rectangles' coordinate variables
    rectX[i] = random (0, height)
    rectY[i] = random (0, width)
  }
}





function draw(){
  if (screenisTouched()){
    for (let i = 0; i < 50; i++){ //loop drawing descending squares when screen is touched, using the randomly assigned coordinates in the last function
      fill (0, 200, 80)
      rect (rectX [i], rectY [i], 200);
      rectY[i]++;
      if (rectY [i] > height){
        rectY [i] = 0
      }
    }

  }if (millis() >= 180000){ //overlay the second sign over the initial one after 60 seconds have passed
    ENTERyourmind();
  }print (millis()/1000, 'seconds'); //displaying the amount of seconds having passed in the console

}




function ENTERyourmind(){ // second screen with text's characteristic
  background (0, 200, 80);
  fill (250, 250, 210);
  textSize(1250);
  text('ENTER', 100, 1300);
  textSize(200);
  stroke(100);
  fill (230, 230, 180)
  text('YOUR MIND', 1000, 1400)

}


function screenisTouched(){// function to return true in the draw function to fulfill the condition for squares to be drawn on-screen
  if (mouseIsPressed){
  return true;
}
}
