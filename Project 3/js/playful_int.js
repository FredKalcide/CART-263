//i figured we could use the mousePressed as a calibration tool. so basically. we have ppl wear a red piece of paper on their hands,
// and calibrate the findColor fx to look for that red by clicking on it! its simple and it works. we can do it with ppls hands too and just use the red as backup if the color tracking gets weird with skin tones

let cam;
let colorToFind;
let colorrange = 12
let step = 0 // used for drawing the first target
let Targets
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

Targets.drawTarget1(); // calling our target object's methods
Targets.drawTarget2();

/*if (firstPx !== undefined){ // draw a circle filled with the color being searched for on the pixel that color is found in.
    fill(colorToFind)
    stroke (0);
    strokeWeight(2);
    ellipse(firstPx.x, firstPx.y, 30)
    print ("color found in lower right")
}*/



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
        this.x = width - 40//x position
        this.y = height/2//y position
        this.fill = colorToFind // the color of the square is the color being tracked
    }

    drawTarget1(){
        //we define the regions to find a color in by changing our universal threshold variables searching 
        xminthresh = 590//
        xmaxthresh = 640//searching for color on the right side
        yminthresh = 200//
        ymaxthresh = 250//
        if (findColor(cam, colorToFind, colorrange) === true){// if the color we are looking has been found within the region on the right, we draw the square on the left
            //fill(this.fill) // trying to set the color of the square to be the color being tracked, wont work somehow
            rect (this.x, this.y, this.wd, this.hg)
            step = 1
            print ("color found!");
        }else if( step === 0){// otherwise if the page has just loaded, draw the square to the left only
            rect (this.x, this.y, this.wd, this.hg) 
        }  
}
    
    
    drawTarget2(){ 
        xminthresh = 0//
        xmaxthresh = 160// searching for color on the left
        yminthresh = 200//
        ymaxthresh = 250//

        if (step === 1){ // if the first step has run, that is if the color was found on the right side, we draw the second square on the right
            rect (this.x + 10 - width + 10, this.y, this.wd )
        }
        
        if (findColor(cam, colorToFind, colorrange) === true){ //if the color we are looking has been found within the region on the left, we return the step variable to 0, thus going back to the first step, running things as if the page had just loaded
             step = 0
        }
    }
} // basically this is touch the targets. if we touch a target on one side, the next one appears, and so on. I am tired :) 
