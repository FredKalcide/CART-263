//i figured we could use the mousePressed as a calibration tool. so basically. we have ppl wear a red piece of paper on their hands,
// and calibrate the findColor fx to look for that red by clicking on it! its simple and it works. we can do it with ppls hands too and just use the red as backup if the color tracking gets weird with skin tones

let cam;


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


// object variables
let Targets


// the limits of the search region for findColor
let xminthresh;// the limits of the search region for findColor
let xmaxthresh;
let yminthresh;
let ymaxthresh;



function setup(){
    createCanvas(640, 400);
    Targets = new Target // assigning the target object to a variable
    cam = createCapture(VIDEO);
    cam.size(640, 400);
    cam.hide();
    
}


function draw(){
    
    //print (screentouch + ' touch')
    print (mousepresstonotif + ' mousepresstonotif')
    //print (opacity + ' opacity')
   // print(mousepress + ' mousepress');
   // print (step + ' step')
    
    drawcamera()

   

if (keyToStart === 1){
Targets.drawTarget();
createVector() //to only use drawtarget here, when loading the page
//print (hitTimer + ' hitTimer')
}
// calling our target object's other methods, they are ready to run once the first does
text (mouseX,mouseX, mouseY)
    text (mouseY,mouseX + 30, mouseY)
if (mousepresstonotif === 1){
    
    Targets.textgreatnotif()
    Targets.textmissnotif()
    
}





}

function drawcamera(){
    push();
    translate (width, 0);
    scale(-1,1) ;
    image(cam, 0, 0, 640, 400)
    pop();// push and pop are meant to only reverse the camera image, and not everything else
  
}

function keyPressed(){ //using keyPressed to start the game
    currentTimeElapsed = millis() // the key press triggers the storage of the current value of millis, thus the amount of time that has passed, allowing the timer for how quickly the player presses on the first target to begin
    // // // // // we need to have each hit of a target trigger the storage of the current elapsed time, so that it then can be subtracted from the value of millis thats constantly updated in draw, that will fix the "GREAT" / "MISS" text buggyness
    currentTimeElapsed; //calling millis
    //print(currentTimeElapsed + 'current time elapsed')
     
    Targets.randomizer()
    
    keyToStart = 1 // starting the game
    // // // // //using keycodes, we can set keys to start and reset the game. like, one key sets key to start to 0, thus when it turns to 1 again the whole code runs back from the beginning
}

function touchStarted(){
    mousepresstonotif = 1//activating the notification 

    mousepress++
    screentouch ++
    

    
   
     // have the randomizer run once, when the step is changed by clicking on or off a target
    Targets.drawTarget();
    
    Targets.randomizer()
    if (misslocation === 1){
        mousepresstonotif = 0
    }
    
    
     // using this to prevent default functionality of the mousePressed fx. At default, it messes with touches activating the next target properly 



}
class Target {
    constructor(){
        this.hg = 100// height of rectangle
        this.wd = 80// width of rectangle
        this.targetx ;//x position
        this.targety ;//y position
        
        
   
        this.notifX = width/2
        this.notifY = height/2
        this.notiftext;
        this.textsize = 50
    }

    drawTarget(){
        hitTimer = 0
        hitTimer = millis() - currentTimeElapsed //we create a timer that begins at 0 when the target is drawn
        //print (hitTimer + ' hit timer')

        //we define the regions to find a color in by changing our universal threshold variables searching 
        xminthresh = this.targetx - 50//
        xmaxthresh = this.targetx + 50//searching for mouse clicks on or around target
        yminthresh = this.targety - 50//
        ymaxthresh = this.targety + 50//
        
        
       //  if the page has just loaded, draw target 
            fill(255, 220, 0)
            rect (this.targetx, this.targety, this.wd, this.hg)
            textSize(20) 
            
            

        



        if (mousepress === 1  || screentouch === 1){ //if the mouse is clicked or screen touched and no other step has been reached
            if (mouseX > xminthresh && mouseX < xmaxthresh ){ //check if mouse position is within threshold on x axis
                if(mouseY > yminthresh && mouseY < ymaxthresh ){//check if mouse position is within threshold on y axis
                    
                    
                    if (hitTimer < 1000){
                       great =1
                        
                       
                    }
                    else if(hitTimer > 1000 ){
                        misstime = 1
                }
            
            } 
            
               
            
           
            currentTimeElapsed = millis()// storing the current time elapsed value on every click allows for the timer to start at 0 every time a new target is drawn, since a new target is drawn every time we click

            mousepress = 0 //resets the mouse press switch
            screentouch = 0 //resets the screen touch switch
            
            
        }
        else{
        //miss text appears if we clicked outside the threshold or after the time limit
        mousepresstonotif = 0
        
        }

    }
    }

textgreatnotif(){
if (great=== 1){
    this.notiftext = 'GREAT!!'

                        noStroke()
                        fill(50, 255, 10,opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                        textSize(this.textsize)
                        text(this.notiftext, this.targetx, this.targety)
                        print (this.notifX + ' notif x')
                        print ('great text drawn')
                        print ("hit target 1");
                        
                        
                        
                        opacity -=10
                        
                        
                        if (opacity <= 0 ){
                            great = 0
                            mousepresstonotif = 0
                            opacity = 255//resetting the switch that activates the notification on a mousepress, if the text disappears
                            
                        }
                          
}
}

textmissnotif(){
if (misstime ===1){

    this.notiftext = 'MISS...'

        
               
    noStroke()
    fill(255, 10, 50, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
    textSize(this.textsize)
    text(this.notiftext, this.targetx, this.targety)
    print ('miss text drawn')
    opacity -=10
    
    if (opacity <= 0  ){  
        misstime = 0
        mousepresstonotif = 0
        opacity = 255//resetting the switch that activates the notification on a mousepress, if the text disappears
        
    }
    
   }  
   




if (misslocation === 1){
    this.notiftext = 'MISS...'

                   
                    noStroke()
                    fill(255, 10, 50, opacity)// need to map the alpha value to the y position, so that as it rises, it fades out
                    textSize(this.textsize)
                    text(this.notiftext, this.targetx, this.targety)
                    print ('missed location text drawn')

                    opacity -=10
                    
                    
                    if (opacity <= 0 ){
                        misslocation = 0
                        mousepresstonotif = 0
                        opacity = 255//resetting the switch that activates the notification on a mousepress, if the text disappears
                        
                    }
                    
}
}

    
   

    
// basically when we click, the draw target functions check the areas where the targets could be, if the step we have reached activates said function. it checks to see if the mouse is within a region set around the target. then the next target in the sequence is drawn, and depending on where the mouse is when pressed, a number of things happen, like text displayed, particle effects 
randomizer(){
    this.targetx = random (100, 600)//x position
    this.targety = random (100, 350)//y position
    print(this.targetx + 'targetx')
    print(this.targety + 'targety')
}
}