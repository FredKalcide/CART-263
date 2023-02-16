let table;
let points = [];

function preload() {
  table = loadTable("EVA_Data.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 800);
  background(0);
  for (var r = 0; r < table.getRowCount(); r++){ // Cycle through each row of the table
      points[r] = new DataPoint(table.getString(r, 1), 
                                table.getString(r, 2), 
                                table.getString(r, 5), 
                                table.getString(r, 0)); // we use a for loop to create an array that, on every loop, goes to a different row "r" and adds a few numbers to the array, in packets, from specific columns we want, using getString 
                                // Pass through the values in each row
  points[r].drawBasic();
    
  }
}


class DataPoint { 
    constructor(country, name, duration, ID){ 
        // Add each data point to the object
        this.country = country;
        this.duration = duration;
        this.name = name;
        this.ID = ID;
        this.x=0;
        this.y=0;
    }

    drawBasic(){ 
      if(this.country =='USA'){
        fill(0,0,250);
        }
        else{
        fill(250, 0, 0);
        }
        this.x = int(this.duration)*50;
        //print(this.duration);
        this.y = random(height);// this is the line that gave us trouble
        print(this.y);
        noStroke();
        ellipse(this.x, this.y, int(this.duration)*3);
        fill(250, 250, 250);
        textSize(5);
        text(this.name, this.x, this.y);
    }

    drawCircle(){
        this.radius = 150;
        this.t=0;
        this.angle = map(this.ID, 0, table.getRowCount(), 0, 1)*Math.PI*2;
        this.x = Math.cos(this.angle)*this.radius+width/2;
        this.y = Math.sin(this.angle)*this.radius+height/2;
        noStroke();
        fill(0, 200, 20, 40);
        ellipse(this.x, this.y,int(this.duration)*3);
        fill(0, 100, 200);
        textSize(5);
        push();
        if(this.angle > Math.PI/2 && this.angle < Math.PI*1.5){
          this.t = textWidth(this.name);
          fill(255, 0,0);
          translate(this.x, this.y);
          rotate(this.angle+Math.PI);
        } else { 
          translate(this.x, this.y);
          rotate(this.angle);
        }
        text(this.name, 0-this.t, 0);
        pop();
    }
}


