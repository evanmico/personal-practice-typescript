"use strict";
let myName = "Ivan";
let definitionOfLife;
let isLoading;
let album;
definitionOfLife = 15;
isLoading = true;
album = 2222; //can be any datatype, try not to use this too much as it defeats ts purpose
album = "The Black Album";
const sum = (a, b) => {
    return a + b;
};
//Realistic Cases Where You May Use Union Type
let postId;
let isActive;
let re = /\w+/g; //If not sure what type something is, mouse over and see what typescript infers
let reWithSpecifiedType = /\w+/g; // the result
