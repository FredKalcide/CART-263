let table;
let n = 4;
let opdcr = false // marker for when opacity has decreased to 0
let txtmv1 = 100 // txt movement 
let txtmv2 = 900
let click = false // mouse clicked trigger
let key = false // key pressed trigger

let op = 255 //setting opacity to full
let points = []; //array for holding the datapoints

function preload() {
  table = loadTable("assets/Oscar Winners - Director.csv", "csv", "header");
  crowdclapsound = loadSound('assets/sounds/Applause Crowd.mp3')
  mediumclapsound = loadSound('assets/sounds/Applause Medium Group.mp3')
  smallclapsound = loadSound('assets/sounds/Applause Small Group.mp3')
  bigcrowdclapsound = loadSound('assets/sounds/Applause Crowd 2.mp3')

}

function setup() {

  createCanvas(800, 800);
  for (var r = 0; r < table.getRowCount(); r++){ 
      points[r] = new DataPoint(table.getString(r, 0), // index
                                table.getString(r, 1), // Year
                                table.getString(r, 2), // Gender
                                table.getString(r, 3), // Race
                                table.getString(r, 4), // Director
                                table.getString(r, 5), // Film
                                table.getString(r, 6))  // Noms & Wins;
                                // go through every row, gathering the data at each column
  }                             // when a piece of data is gathered at row 0, column 0, for example, whatever string or integer is there is gathered, assigned to the column 'index' because of the of the order of the variables i pass through the constructor (column 0 means gather the 0th value in the constructor and assign it to this data point) 
                                // and then it made an instance of the object by being assigned to a variable by the constructor, and then that instance is sent into an array points[i], we essentially label each piece of data according to the column it is in, before gathering it into the array. 
  let whiterows = table.findRows('White', 'Race') // assigning the whiterows variable to represent the rows where white directors are listed
  print (whiterows.length + ' white directorial nominees and winners') // getting the number of rows where white director are mentionned

  let winnerrows = table.findRows ( 'Winner', 'Nomination/Winner') //assigning again for winners row
  print (winnerrows.length + ' total directorial winners')

  let blkrows = table.findRows('Black', 'Race') //assigning for black nominees
  print(blkrows.length + ' black directorial nominees');
}




class DataPoint { 
    constructor(index, Year, Gender, Race, Director, Film, NomWin){ 
        // assigning each variable passed through the constructor to its respective column in the csv, the variable order determines the column variables are assigned to.
        this.index = index;
        this.year = Year;
        this.gender = Gender;
        this.race = Race;
        this.director = Director;
        this.film = Film
        this.nomwin = NomWin;
        this.x = random (width);
        this.y = random (height);
        this.op = 255 //setting full opacity
    }


    drawPpl(){
        n = n + 0.1; //changing the color value for the red channel, and making the size of circles shift
        stroke(n, 255, 0, this.op)
        strokeWeight(5);
        fill (255, n, 0, this.op);
        ellipse(this.x, this.y, noise(n+10)* 100); //the noise produces the change in size for the winners
    }


    opDecrease(){
        if (n >= 255){ //once the color reaches yellow, decrease the opacity
        this.op -= 5
        }
        if (this.op<=0){
            this.op = 0;
            opdcr = true; // when the opacity has decresed to zero, turn a universal variable to true so that other stuff can happen in draw
            //i realized that to have functions run after other functions have run using variables and conditionals, i need to use global variables setup outside of the class, then changed by something in the class, and then referred to again in draw, because trying to have a conditional in draw or in a function in draw outside of the class change based on an element in the constructor will just not work. variabes unique to the constructor cant have their change be read by conditionals outside the constructor, but global variables can be set to change inside the constructor, and that change can be read by conditionals outside the constructor.
            
        }
    }


}




function draw(){
    background(80, 50, 50);
    if (click === true){
    oscarStatue();
    blkNoms();
    }



    if (opdcr === true){ //have instructions appear when the opacity is 0
        background(80, 50, 50);
        oscarStatue();
        noFill();
        textSize(30)
        stroke(220, 170, 0)
        text('press key to proceed', 25, 400);
        if(key === true){ //if the opacity is 0 and and the key is pressed, run white winners fx  
        whtWins();
        }
    }
}

function oscarStatue(){
    fill (255, 210, 0)
    ellipse(400, 270, 90, 150) // head of the oscar statue
    rect(345, 325, 110, 150, 20) // body of the oscar statue
    rect (325, 390, 150, 75) // arms of the oscar statue
    quad(325, 465, 475, 465, 450, 515, 350, 515) // statue forearms
    rect(345, 500, 110, 200)  //statue legs
    quad(345, 700, 450, 700, 490, 720, 305, 720) //statue feet
}

function blkNoms(){
    let bncount = 0 //black nominees count variable
    for (let i = 0; i < points.length; i++){
        if (points[i].race === 'Black' && points[i].nomwin === 'Nomination'){ // call the following methods for datapoints that contain both a specific race and the status of nomination
        points[i].drawPpl();
        points[i].opDecrease();
        bncount++;
        }
       

        textSize(35)
        stroke(230, 230, 0)
        strokeWeight(0.5)
        noFill()
        text('Black director Oscar Winners?', 250, txtmv1 -= 0.001) // draw text and make it move
        text('Black director Oscar Nominees.', 250, txtmv2 -= 0.001)
        if (txtmv2 <= 750){
            txtmv2 = 750 // make text stop once it reaches a certain position
            
        }
        
    } 

    print (bncount + ' black nominees') // using print to see the amount of times our methods were ran with bncount variable, and thus the number of black nominees 

}

function whtWins(){
    background(80, 50, 50);
    oscarStatue();
    

    let wwcount = 0 //white winners count variable
    for (let i = 0; i < points.length; i++){
        if (points[i].race === 'White' && points[i].nomwin === 'Winner'){
        points[i].drawPpl();
        wwcount++;
        }
    } print (wwcount + ' white directorial winners') // using print to see the amount of times our methods were ran with wwcount variable, and thus the number of white winners 
    
    stroke(250, 150, 0);
    strokeWeight(1);
    textSize(60);
    noFill();
    text('White director Oscar Wins', 100, 100)
}


function mousePressed(){
    click = true; // once the mouse is pressed, returns true for the variable, which, in draw, activates the blkNoms fx
    smallclapsound.play();   
}


function keyPressed(){
    key = true;// once a key is pressed, returns true for the variable, which, in draw, activates the whtWins fx
    crowdclapsound.play();
    bigcrowdclapsound.play();
}