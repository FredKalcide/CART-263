//i figured we could use the mousePressed as a calibration tool. so basically. we have ppl wear a red piece of paper on their hands,
// and calibrate the findColor fx to look for that red by clicking on it! its simple and it works. we can do it with ppls hands too and just use the red as backup if the color tracking gets weird with skin tones

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
let randomizerx;
let randomizery;



let hitTimer; //the timer that determines if a target hit is fast or not, displaying text appropriately  


// object variables
let Targets


// the limits of the search region for findColor
let xminthresh1;// the limits of the search region for findColor
let xmaxthresh1;
let yminthresh1;
let ymaxthresh1;
let xminthresh2;// the limits of the search region for findColor
let xmaxthresh2;
let yminthresh2;
let ymaxthresh2;



function setup(){
    createCanvas(640, 400);
    Targets = new Target // assigning the target object to a variable
    cam = createCapture(VIDEO);
    cam.size(640, 400);
    cam.hide();
    colorToFind = color(255, 200, 0);
}


function draw(){
    rectMode(CENTER)
    print (screentouch + ' touch')
    //print (mousepresstonotif + ' mousepresstonotif')
    //print (opacity + ' opacity')
   // print(mousepress + ' mousepress');
   // print (step + ' step')
    push();
    translate (width, 0);
    scale(-1,1) ;
    image(cam, 0, 0, 640, 400)
    pop();// push and pop are meant to only reverse the camera image, and not everything else
  


if (keyToStart === 1){
Targets.drawTarget1();
//print (hitTimer + ' hitTimer')
}
// calling our target object's other methods, they are ready to run once the first does
Targets.drawTarget2();






}

function keyPressed(){ //using keyPressed to start the game
    currentTimeElapsed = millis() // the key press triggers the storage of the current value of millis, thus the amount of time that has passed, allowing the timer for how quickly the player presses on the first target to begin
    // // // // // we need to have each hit of a target trigger the storage of the current elapsed time, so that it then can be subtracted from the value of millis thats constantly updated in draw, that will fix the "GREAT" / "MISS" text buggyness
    currentTimeElapsed; //calling millis
    //print(currentTimeElapsed + 'current time elapsed')
     
    Targets. randomizer1()
    
    keyToStart = 1 // starting the game
    // // // // //using keycodes, we can set keys to start and reset the game. like, one key sets key to start to 0, thus when it turns to 1 again the whole code runs back from the beginning
}

function touchStarted(){
    mousepress++
    mousepresstonotif = 1 //activating the notification 
    screentouch ++
    if(step === 0){
    Targets.randomizer1()
    }
    if (step === 1){
    Targets.randomizer2()
    }

   
    return false // using this to prevent default functionality of the mousePressed fx. At default, it messes with touches activating the next target properly 



}
class Target {
    constructor(){
        this.hg = 100// height of rectangle
        this.wd = 80// width of rectangle
        this.targetx1 = random (100, 600)//x position
        this.targety1 = random (100, 350)//y position
        this.targetx2 = random (100, 600)//x position
        this.targety2 = random (100, 350)//y position
        
        
   
        this.notifX = 0
        this.notifY = height/2
        this.notiftext;
        this.textsize = 200
    }

    drawTarget1(){
        hitTimer = 0
        hitTimer = millis() - currentTimeElapsed //we create a timer that begins at 0 when the target is drawn
        //print (hitTimer + ' hit timer')

        //we define the regions to find a color in by changing our universal threshold variables searching 
        xminthresh2 = this.targetx2 - 100//
        xmaxthresh2 = this.targetx2 + 100//searching for mouse clicks on or around target 2
        yminthresh2 = this.targety2 - 100//
        ymaxthresh2 = this.targety2 + 100//
        if (mousepress === 1 && step === 0 || screentouch === 1 && step === 0){ //if the mouse is clicked or screen touched and no other step has been reached
            if (mouseX< xmaxthresh2 && mouseX > xminthresh2){ //check if mouse position is within threshold on x axis
                if(mouseY < ymaxthresh2 && mouseY > yminthresh2){//check if mouse position is within threshold on y axis
                    
                    // notification text appears
                    if (hitTimer < 2000 && mousepresstonotif === 1){
                       
                        this.notiftext = 'GREAT!!'
                        noStroke()
                        fill(50, 255, 10,opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                        text(this.notiftext, this.notifX, this.notifY)
                        textSize(this.textsize)
                        
                        
                        opacity -=2
                        
                        
                        if (opacity <= 0 ){
                            
                            mousepresstonotif = 0
                        }
                        
                       
                    }
                    else if(hitTimer > 2000 && mousepresstonotif === 1){
                        this.notiftext = 'MISS...'
        
               
                        noStroke()
                        fill(255, 10, 50, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                        text(this.notiftext, this.notifX, this.notifY)
                        textSize(this.textsize)
                        opacity -=2
                        
                        if (opacity <= 0  ){  
                            
                            mousepresstonotif = 0 //resetting the switch that activates the notification on a mousepress, if the text disappears
                        }
                       }  

                    print ("hit target 2");
                }
            
            } 
            else {
            //miss text appears if we clicked outside the threshold or after the time limit
            this.notiftext = 'MISS...'
            
                   
                    noStroke()
                    fill(255, 10, 50, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                    text(this.notiftext, this.notifX, this.notifY)
                    textSize(this.textsize)
                    opacity -=2
                    
                    
                    if (opacity <= 0 ){
                        mousepresstonotif = 0 //resetting the switch that activates the notification on a mousepress once text disappears
                    }
            
            }
            step = 1 // this activates the next step, regardless of where the mouse is pressed 
            currentTimeElapsed = millis()// storing the current time elapsed value on every click allows for the timer to start at 0 every time a new target is drawn, since a new target is drawn every time we click

            mousepress = 0 //resets the mouse press switch
            screentouch = 0 //resets the screen touch switch
           
        }
      
        else if(step === 0){// otherwise if the page has just loaded, draw target 1 only
            fill(255, 220, 0)
            rect (this.targetx1, this.targety1, this.wd, this.hg) 
           
        }
       
          
    }



    
    
    drawTarget2(){ // all the conditions that make it so this target is drawn. The quirk is that the conditions that make a target appear are the mouse being in the position range of the preceding target
        hitTimer = 0
        hitTimer = millis() - currentTimeElapsed
        
       
        xminthresh1 = this.targetx1 - 100//
        xmaxthresh1 = this.targetx1 + 100//searching for mouse clicks on target 1
        yminthresh1 = this.targety1 - 100//
        ymaxthresh1 = this.targety1 + 100
        

        if (step === 1){ // if the first step has run, that is if target 1 was pressed, we draw target 2
            fill(255, 220, 0)
            rect (this.targetx2, this.targety2, this.wd, this.hg )
        }
        if (mousepress === 1 && step === 1|| screentouch === 1 && step === 1){ //if the mouse is clicked or screen touched and the first step has run,
            if (mouseX < xmaxthresh1 && mouseX > xminthresh1){ //check if x mouse position is within threshold on target 1
                if(mouseY < ymaxthresh1 && mouseY > yminthresh1){//check if y mouse position is within threshold on target 1
                    fill(255, 220, 0)
                    rect (this.targetx2, this.targety2, this.wd, this.hg ) //draw target 2 
                    // notification text appears
                    if (hitTimer < 2000 && mousepresstonotif === 1){
                        this.notiftext = 'GREAT!!'
                        
                        noStroke()
                        fill(50, 255, 10, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                        text(this.notiftext, this.notifX, this.notifY)
                        textSize(this.textsize)
                        opacity -=2
                        
                        
                        if (opacity <= 0 ){
                            
                            mousepresstonotif = 0
                        }
                        
                         
                    }
                    else if(hitTimer > 2000 && mousepresstonotif === 1){
                        this.notiftext = 'MISS...'
        
               
                        noStroke()
                        fill(255, 10, 50, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                        text(this.notiftext, this.notifX, this.notifY)
                        textSize(this.textsize)
                        opacity -=2
                        
                        if (opacity <= 0  ){  
                            
                            mousepresstonotif = 0 //resetting the switch that activates the notification on a mousepress, if the text disappears
                        }
                       }  

                    print ('hit target /1')
                }
                
            }
            else {
                //miss text appears if we clicked outside the threshold or after the time limit
                this.notiftext = 'MISS...'
            
                    this.notiftextr = 255;
                    this.notiftextg = 10;
                    this.notiftextb = 50;
                    this.notiftextop = 255;
                    noStroke()
                    fill(255, 10, 50, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                    text(this.notiftext, this.notifX, this.notifY)
                    textSize(this.textsize)
                    opacity -=2
                    
                    
                    if (opacity <= 0 ){
                        mousepresstonotif = 0 //resetting the switch that activates the notification on a mousepress once text disappears
                    }
                if (hitTimer > 2000 && mousepresstonotif === 1){
                    this.notiftext = 'MISS...'
            
                    
                    noStroke()
                    fill(255, 10, 50, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                    text(this.notiftext, this.notifX, this.notifY)
                    textSize(this.textsize)
                    opacity -=2
                    
                    
                    if (opacity <= 0 ){
                        mousepresstonotif = 0 //resetting the switch that activates the notification on a mousepress once text disappears
                    }
                
                }
            }
            currentTimeElapsed = millis()// storing the current time elapsed value on every click allows for the timer to start at 0 every time a new target is drawn, since a new target is drawn every time we click

            mousepress = 0 //resets the mouse press switch
            screentouch = 0
            step = 0 // the step is changed regardless of where on the screen we press the mouse

        }
    } 

    
// basically when we click, the draw target functions check the areas where the targets could be, if the step we have reached activates said function. it checks to see if the mouse is within a region set around the target. then the next target in the sequence is drawn, and depending on where the mouse is when pressed, a number of things happen, like text displayed, particle effects 
   randomizer1(){
    this.targetx1 = random (100, 600)//x position
    this.targety1 = random (100, 350)//y position
   }
   randomizer2(){
    this.targetx2 = random (100, 600)//x position
    this.targety2 = random (100, 350)//y position
   }
   
   
}