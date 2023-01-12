"use strict";

function setup() {
 createCanvas(1200, 600); // Create the Canvas
 background(200, 175, 240);
}



function drawTarget() {
  noStroke();
  let rdmvalA0 = random(255); // set of random color values to be applied when modulo of i is 0
  let rdmvalB0 = random(255);
  let rdmvalC0 = random(255);
  let rdmvalA1 = random(255); // set of random color values to be applied when modulo of i is 1
  let rdmvalB1 = random(255);
  let rdmvalC1 = random(255);
  let rdmtrgsize = random(30);
  let rdmcircnum = random(2, 30);
  if (checkmousePosURorLL()){
    print ("URorLLtrue");
    var i = i + 1; // attempting to have the value of i go up by one at the end of the loop, if the mouse is in upper right corner or the lower left corner, i just cant figure out how to have the starting i value for the loop be affected by "let" or "var" outside the loop, aftr a loop is completed.
    }
  if (checkmousePosLRorUL()){
    print ("LRorULtrue");
    var i = i - 1; // attempting to have the value of i go down by one at the end of the loop, if the mouse is in lower right corner or the upper left corner, i just cant figure out how to have the starting i value for the loop be affected by "let" or "var" outside the loop, after a loop is completed.
  }
  for (var i = rdmcircnum; i > 0; i--){ // loop producing the concentric circles
    print (i);// showing the i value
    if (i%2==0){ //modulo value of i that draws circles of a same certain random color
      fill (rdmvalA0, rdmvalB0, rdmvalC0 );
      ellipse (mouseX, mouseY, i* rdmtrgsize, i*rdmtrgsize);
    } else if (i%2==1){ //other modulo value of i that draws circles of a same second certain random color
      fill(rdmvalA1, rdmvalB1, rdmvalC1);
      ellipse(mouseX,mouseY, i*30,i*30);
    }
  }

}


function mouseReleased(){
  drawTarget();
// drawing the target if the mouse button is released
}



function checkmousePosURorLL() { // range of coordinates that make the function return true if the mouse is within them, when a target is drawn, when the mouse is clicked
  if (mouseX > 1000 && mouseY < 100) {
    return true;
  }else if (mouseX < 200 && mouseY > 500) {
    return true;
  }else {
    return false;
  }
}



function checkmousePosLRorUL(){ // range of coordinates that make the function return true if the mouse is within them, when a target is drawn, when the mouse is clicked
  if (mouseX > 1000 && mouseY > 500) {
    return true;
  }else if (mouseX < 200 && mouseY < 100) {
    return true;
  }else {
    return false;
  }
}
