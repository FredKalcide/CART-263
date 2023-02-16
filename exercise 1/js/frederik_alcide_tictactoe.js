"use strict";

let size = 166.667
let width = 500
let height = 500



function setup() {
    createCanvas(500, 500);
    background( 100, 100, 100);
    for (let i = 0; i < (width/size); i++){
        for(let j = 0; j <(height/size); j++){
            rect(i*size, j*size, size, size)
        }
    }
}