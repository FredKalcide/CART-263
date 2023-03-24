


// okay so basically rigth now it tracks the color orange, you can try with a clementine or orange to experience it. It works with mousex, mouseY, so when you appear in the camera with ur clementine
//you just have to click directly on it and the tracker will appear. There is a tolerence set so that if lightning where you are is high or low, it can still track it. It is not perfectly twweaked for the targets and our project, 
// but soon enought hehe ! 



let cam ; 
let colorToMatch ;
let tolerance = 5;  


function setup () {
    createCanvas (500,500); 
    cam = createCapture (VIDEO); 
    cam.hide (); 


    colorToMatch = color (255, 240, 120); 

}

function draw () {
  
    translate (width, 0); 
    scale(-1,1) ;
    image (cam, 0 , 0, 500,500 ); 

    let firstPx = findColor( cam, colorToMatch, tolerance); 
if ( firstPx !== undefined) {

    fill(colorToMatch); 
    stroke (255); 
    strokeWeight (2) ; 
    circle (firstPx.x , firstPx.y , 30); 
}

}

function mousePressed() {
loadPixels (); 
colorToMatch = get (mouseX, mouseY); 

}

function findColor (input, c , tolerance ){

    

    let matchR = c[0]; 
    let matchG = c[1]; 
    let matchB = c[2]; 


 input.loadPixels (); 
    for ( let y = 0 ; y < input.height ; y ++) {
        for (let x = 0 ; x < input.width ; x ++ ){


            let index = ( y * cam.width + x ) * 4 ; 
            let r = cam.pixels[index]; 
            let g = cam.pixels[index+1]; 
            let b = cam.pixels[index+2]; 

            

            if ( r >= matchR- tolerance  && r <= matchR + tolerance && 
                g >= matchG- tolerance && g <= matchG + tolerance &&
                b >= matchB - tolerance && b <= matchB + tolerance){

                    return createVector  ( x , y ) ; 
                    


                }

        }
    }

}
