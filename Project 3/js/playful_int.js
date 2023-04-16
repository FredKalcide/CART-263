//Tania & Frederik - BREAK THE FIREWALL 
//consult the visuals&logic and logic sketches for Tania and Fred's (mostly) separate works, respectively
// make sure that the images and font are downloaded !!
let onclick ; 

let timer;  

let img ; 
let myfont; 

let b ; 
var scene = "home";
var clicked = false ; 
var page = "home";


let cam;
let colorToFind;
let colorrange = 20
let step = 0 // used for triggering the apparition of all targets
let currentTimeElapsed;
let keyToStart = 0 // using this to start the game on a key press

let mousepress = 0
let screentouch = 0
let mousepresstonotif = 0
let opacity = 255
let great = 0
let misstime = 0
let misslocation = 0

let hitTimer; //the timer that determines if a target hit is fast or not, displaying text appropriately  

let points = 0 // keeping track of score

// object variables
let Targets


// the limits of the search region for findColor
let xminthresh;// the limits of the search region for findColor
let xmaxthresh;
let yminthresh;
let ymaxthresh;


function preload (){
  myfont = loadFont ('myfont.ttf'); 
  
  print('loaded'); 
  img = loadImage('img.jpg'); 
  print('loadedimg');
  
  onclick = loadSound ('onclick.wav'); 
  print('done');
  
}


function mouseClicked (){
  
  clicked = true ; 
  
  onclick.play(); 
  
}

function setup(){
   createCanvas(640, 400);
  
    b = 0 ; 
  
  switch (scene) { // elements that let us switch pages/scene from menu to game or instructions etc 
    case "home":
      background(0, 0, 0);
      break;

    case "how":
      background(0, 255, 0);
      break;

    case "howtoplay":
      background(0);
      break;
      
       case "instructions":
      background(0);
      break;
      
  }
  
    Targets = new Target // assigning the target object to a variable
    cam = createCapture(VIDEO);
    cam.size(640, 400);
    cam.hide();
    colorToFind = color(255, 200, 0);
}

function button(x, y, w, h, pageSwitch, txt, txtSize) { // holds the info about buttons ( color, stroke size)
  
  textFont('myfont'); 
  stroke(0,255,17);
  fill(255); 

  if (mouseX > x && mouseX < x + w) {
    if (mouseY > y && mouseY < y + w) { // if cursor of the mouse over over, change the color for cue indication
      
    stroke(0,0,139); 
      fill(0,0,139);
      
      

      if (clicked) {
        page = pageSwitch;
      }
    }
  }
  //rect(x, y, w, h);
  
  //fill(255, 255, 255);
   textFont (myfont);
 // textFont(matrix);
  textSize(txtSize);
  text(txt, x + w / 2, y + h / 2);
}


function draw(){
  
  background(20);
    tint(120, 255); // diminish the opacity of the image 
image(img,0,0, 640, 400);
  textAlign(CENTER, CENTER);

  switch (page) {
      
      case "home":
    
      button(width/2-50, 26, 92, 65, "help", "function Break the FIREWALL (){ ", 30);

      button(width/2-50, 50+110, 92, 65, "play", "Play.go", 30);
      
       button (width/2, 110+190, 70, 50 , "drawhowtoplay",  "howToPlay.go }", 30); 
      
       

      break;

    case "play":
      play(); 
      break;

    case "drawhowtoplay":
      
    
      drawhowtoplay(); 
      
      break;
      
      
      case "endgame":
      
      background (255,255,0); 
    //  drawend(); 
   
      break ; 
      
      
   
  }
  
  
 clicked = false ; 

  //score tracker
  if (keyToStart === 1){
    if (points === 1){
      text (points + ' point', width/2, height - 20 )
    }
    else{
      text (points + ' points', width/2, height - 20 )
    }
  }




}

 function drawhowtoplay (){
  
  background(0);
   
   
   button(36,342,70,50,"home", "<- back", 30);
   stroke(0,255,17);
  fill(255); 
  textFont (myfont);
  textSize(30); 
  //textAlign(CENTER,CENTER);
  
  
  text('. . . hello there ',170 , 40);
  textSize (20)
  text('We know that being a computer wizz can be rough . . .', 400, 130); 
  text('So test out your hacking skills!', 342,155); 
  text('Targets will appear on screen . . .' , 331,180); 
  text('make sure to click on them as quickly as possible ', 392, 205);
  text('to get through the firewall !', 392, 230) 
  
  textSize(18);
  text ('know that you can always be faster . . .', 475, 376); 
  
}

function play(){
  
   
  background(0,143,17);

  timer = millis()
   if ( timer >= 60000 ){ // if the game as been played for 1 minute // endgame 
  
         endpage(); 
   //  textSize(50);
  //  stroke(255,255,0); 
 //text("gameover", width/2, height*0.7); 
  }
  print (timer)
  let gridSize = 10

  // makes the video have pixels
  cam.loadPixels();
  for (let y=0; y<cam.height; y+=gridSize) {
    for (let x=0; x<cam.width; x+=gridSize) {
      
      // at the current position, get the red value and use to create diameter
  
      let index = (y * cam.width + x) * 4;
      let r = cam.pixels[index];
      let dia = map(r, 0,255, gridSize,26);
      
      // draw a circle at the current location, using the diameter
    
      fill(20);
      noStroke();
      circle(x+gridSize/2,y+gridSize/2, dia);
    }
  }
  
if (keyToStart === 1){//starting the game
    Targets.drawTarget();
    createVector() //to only use drawtarget here, when loading the page
}

// calling our target object's other methods, they are ready to run once the first does
if (mousepresstonotif === 1){// trigger the notifications once the mouse is pressed. this needs to be in draw so that the opacity of the text can change over time
    Targets.textgreatnotif()
    Targets.textmissnotif()
}



  
}

function endpage(){

  cam.remove(); // remove the DOM element created by p5
  cam.stop(); 
  thankyoupage(); 

  
}

function thankyoupage(){
  
  
    background(0); 
   stroke(0,255,17);
  fill(255); 
  textFont (myfont);
  textSize(50); 
  text('THE END', width/2, height/2 ); 
  
}

function keyPressed(){ //using keyPressed to start the game
  currentTimeElapsed = millis() // the key press triggers the storage of the current value of millis, thus the amount of time that has passed, allowing the timer for how quickly the player presses on the first target to begin
  currentTimeElapsed; //calling millis
  
  keyToStart = 1 // starting the game
  Targets.randomizer()
  }

function mousePressed(){
 
    mousepresstonotif = 1//activating the notification 

    mousepress++ //activating the target detection
    screentouch ++//activating the target detection on touch
    

    
   
     // have the randomizer run once by clicking on or off a target
    Targets.drawTarget();
                        //Side note, having the target be drawn before randomizing its position was small but critical in making the code work. Another small thing i lost sleep over until i caught it. 
                        //The target detection being in drawTarget, it was important to draw the target first (that is, set coordinates of the target because the variables that hold those values are undefined), and then randomize its position (thus giving the randomize fx something to randomize)
    Targets.randomizer()
    if (misslocation === 1){
        mousepresstonotif = 0 //resetting the notification trigger
    }
    
    return false// using this to prevent default functionality of the mousePressed fx. At default, it messes with touches activating the next target properly. improves the issues with playing the game with touch, but doesnt solve the notification text eventually not appearing when playing with touch

  }




class Target {
  constructor(){
      this.hg = 100// height of rectangle
      this.wd = 80// width of rectangle
      this.targetx ;//x position
      this.targety ;//y position
      this.notiftext;// text notification
      this.textsize = 50 // text notification size
  }

drawTarget(){
      hitTimer = 0
      hitTimer = millis() - currentTimeElapsed //we create a timer that begins at 0 when the target is drawn
      //print (hitTimer + ' hit timer') //use this to see the timer being reset on every click

      //we define the regions to the target in in by changing our universal threshold variables 
      xminthresh = this.targetx - 50//
      xmaxthresh = this.targetx + 50//searching for mouse clicks on or around target
      yminthresh = this.targety - 50//
      ymaxthresh = this.targety + 50//
      
      
     //  if the page has just loaded, draw target 
          fill(255, 220, 0, 200)
          rect (this.targetx, this.targety, this.wd, this.hg)
          textSize(20) 
          print(this.targetx + this.targety)
          
          

      



      if (mousepress === 1  || screentouch === 1){ //if the mouse is clicked or screen touched
          if (mouseX > xminthresh && mouseX < xmaxthresh ){ //check if mouse position is within threshold on x axis
              if(mouseY > yminthresh && mouseY < ymaxthresh ){//check if mouse position is within threshold on y axis
                  
                  
                  if (hitTimer < 1000){// and if the target is touched within the time
                     great =1 // activate the "great" text notification
                      points++ //give a point
                     
                  }
                  else if(hitTimer > 1000 ){ //if the target is touched outside of the allowed time
                      misstime = 1// activate the "miss" text notification
                      points-=1 //deduct a point
              }
          
          } 
          
             
          
         
          currentTimeElapsed = millis()// storing the current time elapsed value on every click allows for the timer to start at 0 every time a new target is drawn, since a new target is drawn every time we click

          mousepress = 0 //resets the mouse press switch
          screentouch = 0 //resets the screen touch switch
          
          
      }
      else{
      //reset all triggers if we click outside the target 
      mousepresstonotif = 0
      mousepress = 0 // resetting both mousepress and screentouch in this else conditional seems to have fixed the messiness of the notifications appearing, i used to only reset the mousepresstonotif variable here. After 4 nights of trying everything and streamlining my code, this was the simple fix it seems.
      screentouch = 0 
     
      
      }

  }
}

textgreatnotif(){
if (great=== 1){
  this.notiftext = 'GREAT!!' // set the text to great if the target is hit

                      noStroke()
                      fill(50, 255, 10,opacity) //setting the opacity in fill so that it can be made to fade by decreasing the variable's value below, and by being in draw
                      textSize(this.textsize)
                      text(this.notiftext, this.targetx, this.targety) //draw the text at the target location
                      
                      //print ('great text drawn')
                      //print ("hit target"); // confirmations that the target was hit and its notification appeared
                      
                      
                      
                      opacity -=10 // since this is in draw, the opacity will lower
                      
                      
                      if (opacity <= 0 ){
                          great = 0
                          mousepresstonotif = 0
                          opacity = 255//resetting the switch  that activates the notification and its opacity on a mousepress, if the text disappears
                          
                      }
                        
}
}

textmissnotif(){
if (misstime ===1){

  this.notiftext = 'MISS...' // set the text to miss if the target is not hit
    
  noStroke()
  fill(255, 10, 50, opacity) //setting the opacity in fill so that it can be made to fade by decreasing the variable's value below, and by being in draw
  textSize(this.textsize)
  text(this.notiftext, this.targetx, this.targety)//draw the text at the target location
  //print ('miss text drawn')// confirmation that the text was drawn
  opacity -=10
  
  if (opacity <= 0  ){  
      misstime = 0
      mousepresstonotif = 0
      opacity = 255//resetting the switch that activates the notification on a mousepress, if the text disappears
      
  }
  
 }  
 




if (misslocation === 1){// was unable to get this to work, but wanted to show my process for making a miss notification appear when the target is not hit. the logic is the same as the other notifications
                      // misslocation, in mousePressed, only resets the mousepressnotif to 0 
  this.notiftext = 'MISS...' 
                 
                  noStroke()
                  fill(255, 10, 50, opacity)
                  text(this.notiftext, this.targetx, this.targety)
                 // print ('missed location text drawn')

                  opacity -=10
                  
                  
                  if (opacity <= 0 ){
                      misslocation = 0
                      mousepresstonotif = 0
                      opacity = 255
                      
                  }
                  
}
}
 
// basically when we click, the draw target function checks the area where the target is, if the step we have reached activates said function. it checks to see if the mouse is within a region set around the target. then the next target in the sequence is drawn, and depending on where the mouse is when pressed, a number of things happen, like text displayed, particle effects 


randomizer(){
  this.targetx = random (100, 600)//x position
  this.targety = random (100, 350)//y position
  //print(this.targetx + 'targetx') //to see the new coordinates of the target
  //print(this.targety + 'targety')
}
}
