let arcs = []; // making a variable that holds an array
let blobs = []; // array holding my second set of blurry arcs
let click = false; // click variable to activate a bunch of stuff once the mouse is pressed
let t = 2 // variable used for setting the rate of change for rgb values in the second second set of arcs
let op = 0 //opacity variable
let r = 0;//color channel variables
let g = 0;
let b = 0;
//sound variables
let flashsound;


function preload(){
    flashsound = loadSound('assets/sounds/flashbang_sfx_edited.wav')
   
}

function setup(){
    createCanvas (1000, 600);
    let angleoffset = 2/PI; //multiplying this by i further down makes the "angle" variable we pass through the constructor hold a number that grows as we pass through every element in both arrays
    for (let i = 0; i < 8; i++){
        arcs[i] = new LightArcs(i*angleoffset); //making the arcs[] array setup earlier hold the class for our object, the different values in the array will be all the instances of our object
        blobs[i] = new DizzyBlobs(i*angleoffset);
    }// i*angleoffset is what is held by the variable "angle" further down 

}

function draw(){
    background(50+mouseY, mouseY, 0);
    for (let i = 0; i < arcs.length; i++){ // applying all the following fx to all the elements in the array
        arcs[i].display(); //drawing the data held in the arcs array, that is, the instances of the object we made with our class, using the display method we setup further down
        arcs[i].jitter();// making the arcs jitter
        if (click){// if click returns true, which it does when the mouse is pressed withing a certain region, it runs the following fx
            arcs[i].expand();
        }
        }
    warningline(); //this custom fx is setup outside of draw further down, it draws one line to the first, 0th element in the arcs array, using dist()
    if (whiteout()){ //if the whiteout fx has run, aka if it has returned true, we run what follows 
        for (x = 0; x < width; x+=10) {// drawing a checkerboard
            for (y = 0; y < height; y+=10) {
                 c = 250 * noise(0.01 * x, 0.01 * y);// setting up the variable that will be used for creating a noisy background. essentially each square in the grid is made to shift in its rgb value in relation to the position of each square, giving the illusion of a cohesive background 
                ca = 200 * noise(0.01 * x, 0.01 * y) // i want the rgb value for the respective color channel to essentially hover around the 200 value on this line, for example, with an added thing making the hue shift, instead of only the fullness of the color. to get more than just degrees of color brightness changes
                cb = 150 * noise(0.01 * x, 0.01 * y)
                 noStroke()
                fill(c, ca, cb, op);
                rect(x, y, 10, 10);
            }		
          }
        for (let i = 0; i < blobs.length; i++){ //another for loop to apply the fx to the blobs array
             blobs[i].displayblobs();
        }
        r = 250 * noise(t+5);// setting the color of the arcs
        g = 250 * noise(t+10);
        b = 250 * noise(t+20);
        op += 0.1 // opacity increasing every frame 
        t = t + 0.01;// this is to make it so that every time the color is drawn, since this is all in draw, the value of the color parameters is a bit different
        
    };
    
}


class LightArcs{
    constructor(angle){// the value of angle is i*angleoffset , it is basically creating a variable to manipulate the angle of each instance of the particle system
        this.x = width/2;// assigning all the parameters for the arc() fx
        this.y = height;
        this.ellw = 300;
        this.ellh = 300;
        this.ellstrt = angle + PI; //adding pi to the start angle value from the previous start angle, itself determined by i*offset in the array. this is how the arc segments change every time. we essentially rotate the arc drawn,using the start angle of the last arc drawn as the new start point, on every instance. 
        this.ellstp = angle;
        this.jitterspd = 1;
        this.pie = PIE;
        this.hotzone = 175;
        let self = this;// assigning the "this" variables the variable "self", essentially making the variables under this constructor a category called self, to refer to in setInterval
        setInterval (function(){self.return()}, 1000);// here, we set an interval to run the return() function every second. i learned that using this notation is required in order to tell the setInterval fx to run my custom fx
    }
    display(){
        fill(map(mouseY, 0,height, 0, 250), 0, 0); //mapping the range of y coordinates for the mouse to the range of color values for the red channel. the color of the arcs redshifts the further down the page my mouse is
        arc(this.x, this.y, this.ellw, this.ellh, this.ellstrt, this.ellstp, this.pie);
    }
    jitter(){
        
        this.x += random(-(this.jitterspd + mouseY/30), (this.jitterspd + mouseY/30));// making the jitter, and making its speed depend on the y position of mouse. harder jitters the closer we are to the arcs
        this.y += random(-(this.jitterspd + mouseY/30), (this.jitterspd + mouseY/30));
        

    }
    return(){
            this.x = width/2;// resetting the position of the arcs to their initial one every second with setInterval, because the particles had a tendency to jitter away from each other all over the after a few seconds, so this keeps them together
            this.y = height;
    }
    expand(){
        this.ellw += 100;//the ellipse arcs grow in size fast
        this.ellh += 100;
    }

}


function mousePressed(){
    for (let i = 0; i < arcs.length; i++){ // i have to remember use a for loop passing through my array of particules everytime i want to make a new fx outside the class, in order for this new fx to apply to all instances of my particle system. 
    if(dist(mouseX, mouseY, arcs[i].x, arcs[i].y) <= arcs[i].hotzone){// if the mouse is within a hotzone around the center point of the arcs, this returns true, which makes the arcs expand using the expand method. parameters in the constructor, when referred to outside the class for manipulation, need to be referred to using the array they are in, arcs[i] in this case
        click = true
        flashsound.play(); //the sound plays if the the mouse is clicked within the hotzone
    }
    }
}



function warningline(){
    dist(mouseX, mouseY, arcs[0].x, arcs[0].y);// we draw one line from the mouse position to the first arc in the array, using arc[0] to refer to that one instance specifically
    line(mouseX, mouseY, arcs[0].x, arcs[0].y);
    stroke(mouseY, 0, 0)
    strokeWeight(10)
}

function whiteout(){
   
    if (arcs[0].ellw >= 1000 ){//once the arcs hve grown to a sufficient size, i draw a new white background over everything and play a sound, as well as return true so that the if(whiteout) conditional can run 
        background(250, 250, 250);
        return true;
    }
    return false;
}



class DizzyBlobs{// new class of arcs, the angles are handled the same way as before
    constructor(angle){
        this.x = width/2;
        this.y = height/2;
        this.ellw = 300;
        this.ellh = 150;
        this.ellstrt = angle + PI;
        this.ellstp = angle;
        this.jitterspd = 1;
        this.pie = PIE;
        this.n = random(0, 5); //making variables that we will use to add perlin noise to the jitter of these particles
        this.t = random(0, 5);
    }
    displayblobs(){
        stroke(25, mouseY, 25, op)// the color of the stroke for all elements in this class changes based on the vertical position of the mouse
        fill(r, g, b, op) //shifting color and opacity smoothly with variables setup in draw
        arc (this.x+noise(this.t)*100, this.y+noise(this.n)*100, this.ellw, this.ellh, this.ellstrt, this.ellstp, this.pie);//drawing the blobs and making the sway
        this.n += 0.01;//these 2 variables are the values that are added to the position of the blobs and have their movement affected by noise every frame
        this.t = this.t + 0.01 //these 2 basically dictate the rate of change of any parameter they are put into, with noise affecting the values these variables hold. I did the addition for the variables in both the "x=x+1" and "x+=1" ways to remember they are equivalent.
    }
}