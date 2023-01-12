/**
Self-Portrait
Frederik Alcide
September 22nd 2022
Title: Fragmented Mind
I just wanted to use simple shapes and colors, along with the interactions that are possible between them to represent my state of mind when it comes to all the mental processes im called to draw upon this semester. i wanted a nice soft set of colors, too.
*/

"use strict";


/**

*/
function preload() {

}


/**
loading in the static parts of the portrait here
*/
function setup() {
  createCanvas(500,600); // Create the Canvas




/**
the functions with repetition in them are here
*/
 function draw() {

  if(mouseIsPressed == true){
    fill(random(255));
    ellipse(mouseX,mouseY,100,100);
    print ("this is the mouse being pressed");
  }
}
