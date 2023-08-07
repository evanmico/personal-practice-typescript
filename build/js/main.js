"use strict";
//convert to more or less specific type using assertion/casting
let a = 'hello';
let b = a; //b has been assigned to a as a type two, this is assignment to a less specific type
let c = a; // More specific
//This method CANNOT be used in react
let d = 'world'; //using angle brackets to do same type assertion
let e = 'world';
//realistic example of type assertion usage
const addOrConcat = (a, b, c) => {
    if (c === 'add')
        return a + b;
    return '' + a + b;
};
// an assertion must be made because addOrConcat() can return number | string, but myVal is string.
//Since we know that the return of the function will be a string due to the 'concat' specification
//we can just cast it as a string and store it in myVal without any issues with TypeScript.
let myVal = addOrConcat(2, 2, 'concat');
// TS sees no issue, but a string will be returned into a type number causing an error
let nextVal = addOrConcat(2, 2, 'concat');
//10 as string;
//double casting/double assertion/forced casting
10; //try to avoid this cause it over-rules TS
//The DOM
//const img = document.getElementById('img') as HTMLImageElement; //Cast it to image element to get src
//const myImg = document.getElementById('#img') as HTMLImageElement;
//const nextImg = <HTMLImageElement> document.getElementById('#img');
//img.src;
//myImg.src;
