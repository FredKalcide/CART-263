"use strict"

let myInterval;
let timer = false;
let endTime;
let duration = 5
function setup(){
  createCanvas(500, 500);
  background(50);
}

function mousePressed(){
  //myInterval = setInterval(randomCircle, 1000);
  endTime = millis() + (duration*1000);
  timer = true;
  console.log ("start timer");
  myInterval = setInterval (checkTimer);
}


function checkTimer (){
  if(millis()> endTime){
    print ("ended")
    clearInterval(myInterval)
    background(50);

  }else{
    background (255, 0, 0)
  }
}
function keyPressed(){
  clearInterval(myInterval);
}

function randomCircle(){
  fill(random(255));
  ellipse (random(width), random(height), 100, 100);
}
