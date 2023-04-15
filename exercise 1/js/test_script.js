/*"use strict";


let table; 

function preload() {   
    table = loadTable("EVA_Data.csv", "csv", "header"); 
} 

function setup() { 
    
    createCanvas(500, 500);   
    console.log(table.getRowCount() + " total rows in table");   
    console.log(table.getColumnCount() + " total columns in table");   
    console.log(table.getColumn("Crew")); 
    // use a nested for loop to cycle through the table's cells 
    for (var r = 0; r < table.getRowCount(); r++){ 
        for (var c = 0; c < table.getColumnCount(); c++) {       
            console.log(table.getString(r, c));    
        }   
    } 
}
*/

