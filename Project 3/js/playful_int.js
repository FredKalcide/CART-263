//i figured we could use the mousePressed as a calibration tool. so basically. we have ppl wear a red piece of paper on their hands,
// and calibrate the findColor fx to look for that red by clicking on it! its simple and it works. we can do it with ppls hands too and just use the red as backup if the color tracking gets weird with skin tones

let cam;
let colorToFind;
let colorrange = 12
let step = 0 // used for triggering the apparition of all targets
let currentTimeElapsed;
let keyToStart = 0 // using this to start the game on a key press

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
    colorToFind = color(255, 200, 0);
}


function draw(){
  
    translate (width, 0);
    scale(-1,1) ;
    image(cam, 0, 0, 640, 400)
  
//let firstPx = findColor(cam, colorToFind, colorrange) // this variable is used to have an x and y position to attach to something when the color we want is found
if (keyToStart === 1){
Targets.drawTarget1();
}
// calling our target object's other methods, they are ready to run once the first does
Targets.drawTarget2();
Targets.greatNotif()

/*if (firstPx !== undefined){ // draw a circle filled with the color being searched for on the pixel that color is found in.
    fill(colorToFind)
    stroke (0);
    strokeWeight(2);
    ellipse(firstPx.x, firstPx.y, 30)
    print ("color found in lower right")
}*/



}

function keyPressed(){ //using keyPressed to start the game
    currentTimeElapsed = millis() // the key press triggers the storage of the current value of millis, thus the amount of time that has passed
   // // // // // we need to have each hit of a target trigger the storage of the current elapsed time, so that it then can be subtracted from the value of millis thats constantly updated in draw, that will fix the "GREAT" / "MISS" text buggyness
    currentTimeElapsed; //calling millis
    print(currentTimeElapsed)
    keyToStart = 1 // starting the game
    // // // // //using keycodes, we can set keys to start and reset the game. like, one key sets key to start to 0, thus when it turns to 1 again the whole code runs back from the beginning
}

function mousePressed(){
    loadPixels();
    colorToFind = get(mouseX, mouseY) // the color of whatever pixel is clicked on is set to be the new color to be found. used for calibrating the color tracking to the hands of players
}

function findColor(input, c, range){

if (input.width === 0 || input.height === 0){
    return undefined
}

    let matchR = c[0];
    let matchG = c[1];
    let matchB = c[2];


    input.loadPixels();
    for (let y = 0; y < input.height; y++){ // running for loops to look through every pixel, like looking through a grid, for every vertical position, we then check every x position
        for(let x = 0; x < input.width; x++){

            let index = (y * cam.width + x) * 4
           
            let r = cam.pixels[index];
            let g = cam.pixels[index+1];
            let b = cam.pixels[index+2];
          
                if (r >= matchR - range && r <= matchR + range && // searching for the color to match to, within the section of the screen we want. the values of x and y changing in the for loop are what allow us to check for both color and position, since the x and y of the for loop correspond to every pixel, and thus "every" x and y coordinate
                    g >= matchG - range && g <= matchG + range&& // 
                    b >= matchB - range && b <= matchB + range &&
                    x > xminthresh && x < xmaxthresh && y > yminthresh && y < ymaxthresh){ //using global variables defined earlier, we set the lmits of the region we want to search for our color within 
                    return true
                    return createVector(x,y); //return to stop the findColor from looking for other pixels matching the color 
                    }
                

        }
    }

}



class Target {
    constructor(){
        this.hg = 40// height of rectangle
        this.wd = 30// width of rectangle
        this.targetx = width - 40//x position
        this.targety = height/2//y position
        this.notifX = width - 40
        this.notifY = height/2
        this.fill = colorToFind // the color of the square is the color being tracked
        this.notiftext;
        this.notiftextr;
        this.notiftextg;
        this.notiftextb;
        this.notiftextstrokeweight = 3
        this.notiftextop = 255
        this.textsize = 30
    }

    drawTarget1(){
        hitTimer = millis() - currentTimeElapsed
        print (hitTimer)
        //we define the regions to find a color in by changing our universal threshold variables searching 
        xminthresh = 590//
        xmaxthresh = 640//searching for color on the right side
        yminthresh = 200//
        ymaxthresh = 250//
        if (findColor(cam, colorToFind, colorrange) === true){// if the color we are looking has been found within the region on the right, we draw the square on the left
            //fill(this.fill) // trying to set the color of the square to be the color being tracked, wont work somehow
            rect (this.targetx, this.targety, this.wd, this.hg)
            step = 1
            print ("color found!");
        }else if( step === 0){// otherwise if the page has just loaded, draw the square to the left only
            rect (this.targetx, this.targety, this.wd, this.hg) 
        }  
    }
    
    
    drawTarget2(){
        hitTimer = 0
        hitTimer = millis() - currentTimeElapsed
        print (hitTimer)
 
        xminthresh = 0//
        xmaxthresh = 160// searching for color on the left
        yminthresh = 200//
        ymaxthresh = 250//

        if (step === 1){ // if the first step has run, that is if the color was found on the right side, we draw the second square on the right
            rect (this.targetx + 10 - width + 10, this.targety, this.wd )
        }
        
        if (findColor(cam, colorToFind, colorrange) === true){ //if the color we are looking has been found within the region on the left, we return the step variable to 0, thus going back to the first step, running things as if the page had just loaded
             step = 0
        }
    }
    hitNotif(){
        this.notiftext = 'HIT!'

    }
    greatNotif(){
        this.notiftext = 'GREAT!!'
        this.notiftextr = 50;
        this.notiftextg = 255;
        this.notiftextb = 10;
        this.notiftextop = 255;



        if (hitTimer < 2000){
            stroke(this.notiftextr, this.notiftextg,this.notiftextb, this.notiftextop)
            text(this.notiftext, this.notifX, this.notifY)
            // // // // // the text is also mirrored, gotta fix that
            this.notiftextop -= 20
            this.notifY -= 1
        }


    }
    missNotif(){
        this.notiftext = 'MISS...'


    }
}

