// this logic file is merged with the main file. it is my part of the work (Fred)
// bugs:
// screen touch is still finnicky, causes the notifications to stop displaying sometimes
// clicking off target is still finnicky, it also eventually also causes text notifications to not appear (FIXED, but wanted to acknowledge this because it caused me a lot of grief)
// in both these cases, the notification trigger<s value returning to 0 seems to be the issue, and i cannot solve it after MANY tries (Fred)

let cam; // camera variable for displaying camera view


let currentTimeElapsed;
let keyToStart = 0 // using this to start the game on a key press


let hitTimer; //the timer that determines if a target is hit fast enough, displaying text appropriately  
let points = 0 // keep track of score

// object or target related global variables
let Targets
let mousepress = 0// checking for mouse presses
let screentouch = 0//checking for screen touches
let mousepresstonotif = 0// mouse presses/screen touches activate the notifications
let misstime = 0 //trigger for missing the time window notification
let misslocation = 0 //trigger for  missing the target notification
let opacity = 255 //opacity for notification text
let great = 0// trigger for the great notification



let xminthresh;// the limits of the search region for target hits 
let xmaxthresh;
let yminthresh;
let ymaxthresh;



function setup(){
    createCanvas(640, 400);
    Targets = new Target // assigning the target object to a variable
    cam = createCapture(VIDEO); //creating a video capture
    cam.size(640, 400); //setting the size of the camera view
    cam.hide(); //hiding the original camera view we cant manipulate
}


function draw(){   
    image(cam, 0, 0, 640, 400)// displaying the camera view 
    
    //score tracker
    if (points === 1){
        text (points + ' point', width/2, height - 20 )

    }
    else{
        text (points + ' points', width/2, height - 20 )
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
            fill(255, 220, 0)
            rect (this.targetx, this.targety, this.wd, this.hg)
            textSize(20) 
            
            

        



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