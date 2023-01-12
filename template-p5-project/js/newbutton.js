let button;

function setup() {
  createCanvas(710, 400);
  button = createButton('Muda');
  button.position(100, 100);
  button.mousePressed(changePosition);
}

function changePosition(){
  button.position(random(255), random(255));
}
