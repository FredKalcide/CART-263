/*
Screen based Rube Goldberg machine template
CART253, Creative Computation, Fall 2022
Concordia University
l wilkins

The goal of this project is to pass along a variable between programs to create a chain. Every person will get a number from someone else, use this number to create a piece of generative art, then pass along a new number to the next person.


We are using the Eclipse Paho MQTT client library: https://www.eclipse.org/paho/clients/js/ to create an MQTT client that sends and receives messages. The client is set up for use on the shiftr.io test MQTT broker (https://shiftr.io/try)

*/

// Rube Goldberg setup, update with your own info!
let myName = "Fred"; // Who are you? Make sure it matches the previous person's variable!
let nextName = "Fred"; // Who is next on the list? Make sure it matches the next person's variable!
let dataToSend;  // Variable to hold the data to send to the next person on the list


// MQTT client details. We are using a public server called shiftr.io. Don't change this.
let broker = {
  hostname: 'public.cloud.shiftr.io',
  port: 443
};
let client;
let creds = {
  clientID: Math.random().toString(16).slice(3),
  userName: 'public',
  password: 'public'
}
let topic = 'CART253'; // This is the topic we are all subscribed to

// End of MQTT client details

let dataReceivelocal = false; //for testing receiving a variable, when the mouse is clicked, in mousePressed
var dataReceive;
let startBar = false; //
let mudaSound;
let reverb;
let xRect = 250;
let bitFont; // variable holding the pixelated font
let myData; // the interger value of dataReceive[2], aka the number i receive, held in this variable
let xmultrect = 0; // for moving the small squares forward by making this = itself + 1 in draw
let buttoncreated = false; // this being false allows for the muda button to not be drawn everytime it is called
let mudabuttonpressed = false; // variable to check if the button has been pressed
let restartloadingbar = false;
let buttonxposition = 0; // holding the x coordinate of the muda button



function preload() {
  mudaSound = loadSound('assets/sounds/muda_muda_muda_sound_effect.wav');
  reverb = new p5.Reverb();
  bitFont = loadFont ('js/Rude Goldberg/PixeloidMono-1G8ae.ttf')// font courtesy of https://www.fontspace.com/tvcd-font-f78518
}




function setup() {
  // Normal program setup goes here
  createCanvas(1000, 500);
  mudaSound.disconnect();
  background(50);
  MQTTsetup(); // Setup the MQTT client
  //console.log("setup has run");

}

function draw(){
  background(150);
  loadingBarText();
  reverbText();
  if(dataReceivelocal === true){ //only starts running what comes next, all of what is in draw after this point, if the mouse has been pressed (which is to say if i receive a "pretend" message from myself)
    if(startBar == true){ //the bar starts drawing when i receive a message tagged with my name
      loadingBar();
      staticBg();
      if (buttoncreated === false){ //the muda button is drawn once, then set to true so it's never drawn again. only the position changes with changePosition.

        firstStep(); //firstStep only runs if the button isnt drawn. Once it is, it no longer runs, thus no longer checks for the progress position of the square in the loading bar, and thus stops its x position from being continuously set back to 500 once the conditions are fulfilled for its x position to progress once again
      }

      for(let i = 0; i <= 30; i++){ // drawing a cluster of scrolling squares in the background
        rect (xmultrect, random(0, 500), 10, 10);// the random y value combined with this loop being in draw makes the small 120 squares flicker as they change vertical positions every frame
        fill (255); // 4 sets of 30 squares, each set having a different gray value for its squares
        rect (xmultrect - 1, random(0, 500), 10, 10); // offsetting the position of each set of squares horizontally from each other
        fill (170);
        rect (xmultrect - 2, random(0, 500), 10, 10);
        fill (80);
        rect (xmultrect - 3, random(0, 500), 10, 10);

        xmultrect = xmultrect + 1; // moving the squares horizontally by 1 pixel every frame
        if (xmultrect == 1000){// resetting / looping the movement of the scrolling squares
          xmultrect = 0;
        }
      }
    }
    if (buttoncreated === true){ // if the button is drawn, the promt text appears
      fill (50, 50, 50);
      textSize (25);
      text('play sound with 80% or more reverb to progress', 150, 200);

      if(restartloadingbar === true ){ // since the function that makes this true is changePosition further below, this is about showing the word 'activated' and setting the progress bar in motion again if BOTH the variable holding the x coordinate of the muda button has a value above 1200 AND if the switch restarting the movement of the progress bar is switched on. if the button is drawn, check if the position of the button is past 1200, and check if the switch variable that allows the movement to continue is turned on. if the position is past 1200 and the switch is on, reinitiate the movement.
        fill (50, 230, 10);
        textSize (50);
        text ('activated', 300, 500)
        xRect = xRect + 1;
      }

    }
    console.log (mouseX);
  }
}


function mousePressed(){
  dataReceivelocal = true; // if the mouse is pressed, send a pretend message to myself in the form of turning on the switch that engages all the nested conditions and their functions of the if(dataReceivelocal === true) conditional in draw: the loading bar, the scrolling squares, etc.
  sendMQTTMessage(dataToSend); // if the mouse is clicked anywhere, send a message
  print("pressed");
} 

function firstStep(){
  if(xRect >= 500){ // stopping the progress of the bar once it reaches 500
    xRect = 500;
    setupMudaButton(); // drawing in the button if the first step is reached
    buttoncreated = true;
  }else{
    xRect = xRect + 1 // keep the movement of the progress bar going so long as it's x position is under 500
  }
  //  console.log ("hi this is first step")

}

function staticBg(){
  for (let i = 0; i<=100; i++){
     ellipse(random(0,1000), random(0,500), 2); // drawing a flickering background
  }
}



function reverbText(){

  let reverbvalue = constrain(map(mouseX, 0, width, 0, 1), 0, 1); //mapping / constraining the value of the drywet effect to positions on the x axis
    // 1 = all reverb, 0 = no reverb
    reverb.drywet(reverbvalue); // having the displayed reverb percentage increase or decrease depending on the x position of the mouse, assigning the value of the reverb to a variable
    textFont(bitFont);
    text('reverb: ' + round(reverbvalue * 100) + '%', width - 700, height - 50);
}



/*function keyPressed(){
    reverb.process (mudaSound,20, 5);
    fill (50, 230, 10);
    textSize (50);
    text ('activated', 300, 500)
    console.log ("reverb activated");
    return true;
}*/




function loadingBar() {
    fill(0, 0, 0)//black rectangle forming the border of the loading bar
    rect(240, 290, 520, 70);
    fill (255, 255, 255);//white rectangle, the inside of the loading bar
    rect(250, 300, 500, 50);
    fill (0, xRect-250, 50);//progress bar/square itself, with its green color channel's value depending on the x position of the square
    rect(xRect, 300, 50, 50);
    print(xRect);
  if(xRect > 700){//stopping the movement of the bar if it reaches the end
    xRect = 700;
    dataToSend = random (3, 50); //if the end of the loading bar is reached, pick a number between 200 and 700, to be held in this variable to send to the next person  --------------------------------------------------------------------------------------------------
    //sendMQTTMessage(dataToSend);

  }

}

function setupMudaButton(){ //creating the muda buttton, placing it and having it change position

  mudaButton = createButton('Muda');

  mudaButton.position(1000, 800);
  mudaButton.mousePressed(changePosition);
}


 
function changePosition(){ // changing the position of the button when the button is pressed
  if(buttonxposition>=1200 && restartloadingbar===false){ //  turning the switch giving the go ahead to the if(restartloadingbar === true ) condition above to reinitiate the movement of the progress bar. turning the switch on, in effect, if the position of the button is past 1200 and if the switch is off.
    restartloadingbar = true;
  }// no matter if the previous condition is true, the following runs when the button is pressed

  reverb.process (mudaSound,20, 5);//activating reverb
  buttonxposition = random(500, 1800)
  mudaButton.position(buttonxposition, random(window.height));// randomizing / reassigning the position of the button upon clicking on it, within a certain range, keeping track of the x position by assigning to a variable
  mudabuttonpressed = true;
  mudaSound.play(); //playing the sound
    }

function loadingBarText(){
  for(let i=0; i<=3; i++){ //loading bar text with chromatic abberation effect
      if(i==0){
        fill(255, 0, 0);
      }else if(i==1){
        fill(0, 255, 0);
      }else if(i==2){
        fill(0, 0, 255);
      }else if(i==3){
          fill(255, 255, 255);
        }
      textSize(50);
      textFont(bitFont);
      text('LOADING', 400+(2.5*i), 260 ); // offset the sets of the same word to create the illusion of chromatic abberation
  }
}

// function checkifeightyReached(){
//
//   if (mudabuttonpressed === true && buttonxposition >= 1500){
//         restartloadingbar = true;
//         reverb.process (mudaSound,20, 5);
//         console.log ("restartloadingbar")
//   }
// }



// Callback functions
function onConnect() {
  client.subscribe(topic);
  console.log("connected");
  // is working
}
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    // If it stops working
  }
}
function MQTTsetup(){
  client = new Paho.MQTT.Client(broker.hostname, Number(broker.port), creds.clientID);
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
        onSuccess: onConnect,
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true
  });
}


// When a message arrives, do this:
function onMessageArrived(message) {
  let dataReceive = split(trim(message.payloadString), "/");// Split the incoming message into an array deliniated by "/"
  console.log("Message Received:");
  console.log(String(dataReceive[1]));
// 0 is who its from
// 1 is who its for
// 2 is the data
// 3 is second piece of data
  console.log(dataReceive[2])
  if(dataReceive[1] == myName){ // Check if its for me
    console.log("It's for me! :) ");
    startBar = true; // draw the loading bar, scrolling squares etc, only when i receive a message tagged for me
    myData = int(dataReceive[2]);
  } else {
    console.log("Not for me! :( ");

  }

}



// Sending a message
function sendMQTTMessage(msg, msg2) {
      message = new Paho.MQTT.Message(myName + "/" + nextName +"/"+ msg); // add messages together:
// My name + Next name + data separated by /
      message.destinationName = topic;
      console.log("Message Sent!");
      client.send(message);
      // background(50);
      // fill (0, 0, 255);
      // ellipse (700, 350, 100);

}
