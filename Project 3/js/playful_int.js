let cam ; 

function setup () {
    createCanvas (500,500); 
    cam = createCapture (VIDEO); 
    cam.hide (); 

}

function draw () {
  
    translate (width, 0); 
    scale(-1,1) ;
    image (cam, 0 , 0, 500,500 ); 

}
