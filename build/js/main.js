"use strict";
let stringArr = ["one", "hey", "Dave"];
let guitars = ["Strat", "Les Paul", 5150];
let mixedData = ["EVH", 1952, true];
stringArr[0] = "Jeff";
//stringArr.push(21); //Typescrpit does't like; however, it doesn't put a limit on the amount of data we have in an array
stringArr.push("Hola");
guitars[0] = 1116; //Due to union type (string | number) Typescript is fine with this
guitars.unshift("Donald"); //fine with adding string to beginning cause of earlier comment
//stringArr = guitars; //cannot assign an array with both string and number into string only array
guitars = stringArr; //Can assign just a string array into an array of union type (string | number)
//guitars = mixedData; //Again not allowed cause guitars is only an array of union type (string | number) while mixedData is an array of union type: (string | number | boolean)
let test = []; //Empty array is assigned as an "any" type array by Typescript cause there are no values for Typescript to infer off of
let bands = []; //Empty array can be a specific type as long as the type desired is explicitly stated when array is first declared
bands.push("Beatles"); //Works fine
/*
  Tuple:
    If you want to declare an array and explicitly state how long it will be and
    what types will be at what positions, you want to create a tuple.
*/
let myTuple = ["evanmico", 19, true]; //only allows explicitly stated data types in explicitly statedd locations
let mixed = ["Jeff", 2, false]; //Just an array that has union type of (string | number | boolean), not a tuple (can be seen by mousing over)
//mixed = myTuple; // this works fine cause mixed has union type (string | number | boolean) that allows all the values in the tuple to be in the array
//myTuple = mixed; //Doesn't work because it's possible for mixed to have less than 3 elements; however, the tuple REQUIRES 3 elements so it cannot be assigned
//myTuple[3] = 19; //Doesn't work since the tuple doesn't have a "4th" position, it only has 3 or indexes 0-2
myTuple[1] = 21; // Works fine because the tuple does indeed have a number type specified to the second position
//Objects
let myObj; // The easiest way to declare an object, but needs to be done with caution
myObj = []; // An array is also a type of an object in JS so Typescript is fine with this assignment
console.log(typeof (myObj)); // Still has an object type, despite now having an array in it
myObj = bands; //Perfectly Fine, still an object
myObj = {}; // Perfectly Fine, still an object
//TypeScript has inferred specific types for each prop based on the assignment (hover over to see)
const exampleObj = {
    prop1: "evanmico",
    prop2: true
};
let evh = {
    name: "Don",
    active: false,
    albums: [2121, "OB83C"]
}; //Now when we declare an object of type "Guitarist", we can only provide the data in the appropriate types specified earlier in the new type declaration
let abraham = {
    name: "Abraham Lincoln",
    active: false,
    albums: ["emancipation proclamation", 1887]
};
let han = {
    name: "Han Solo",
    albums: ["Empire Strikes back", 4, "IV"]
}; //Can be declared with only 2 properties cause active property is optional
let leia = {
    name: "Princess Padame",
    active: true,
    albums: ["rich", "queen", "basic", 21]
};
//han = leia; //Still perfectly fine, despite han not having an active property, because they are both of type "Pianist"
/*
    Each individual property can also be specified for a function and only be assigned a name to be used inside of the function like below:
*/
//const greetPianist = (pianist: {name: string, active?: boolean, albums: (string | boolean)}) => (`Hello ${pianist.name}!`); 
//However, if a type is already specified, then this makes more sense:
const greetPianist = (pianist) => (`Hello ${pianist.name}!`);
console.log(greetPianist(leia));
let steve = {
    name: "Minecraft Steve",
    active: true,
    albums: ["minecraft", "C13", "1"]
};
let nameless = {
    active: false,
    albums: ["Ruh Roh", 0.0]
};
/*
    Because name property in interface TrianglePlayer is optional, when calling a function upon it, you must specify that calling a function is optional
    This is because you cannot call a function on an "undefined" value in JS
*/
//const greetTrianglePlayer = (trianglePlayer: TriangePlayer) => (`Hello ${trianglePlayer.name?.toUpperCase}!`); //This is one way to make it optional (the question mark before the .); however, narrowing is preferred (if statement to check)
const greetTrianglePlayer = (trianglePlayer) => (trianglePlayer.name ? `Hello ${trianglePlayer.name.toUpperCase()}!` : "Triangle Player Is Unnamed"); // Better solution using narrowing
console.log(greetTrianglePlayer(steve)); // Returns Hello and name
console.log(greetTrianglePlayer(nameless)); // Returns else condition
/*
    Enums (Enumeration):
        "Unlike most TypeScript features, Enums are
        not a type-level addition to JavaScript, but something
        added to the language at runtime"
        Basically, they don't natively exist in JS.
*/
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 1] = "U";
    Grade[Grade["D"] = 2] = "D";
    Grade[Grade["C"] = 3] = "C";
    Grade[Grade["B"] = 4] = "B";
    Grade[Grade["A"] = 5] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U);
function multiplicationTable(size) {
    let multArr = [];
    for (let i = 0; i < size; i++) {
        multArr.push([]);
        for (let j = 0; j < size; j++) {
            multArr[i].push((i + 1) * (j + 1));
        }
    }
    return multArr;
}
console.log(multiplicationTable(1));
console.log(multiplicationTable(2));
console.log(multiplicationTable(3));
let commaSplit = /[\w\s\.]*[^,]/g;
let streetNumRegEx = /^\d+/;
let testStr = "54 Holy Grail Street Niagara Town ZP 32908,3200 Main Rd. Bern AE 56210,1 Gordon St. Atlanta RE 13000";
let matchArr;
if (testStr.match(commaSplit) != null) {
    matchArr = testStr.match(commaSplit);
    console.log(matchArr);
    console.log(streetNumRegEx.test(matchArr[1]));
    console.log(matchArr[1].match(streetNumRegEx)[0]);
    console.log(matchArr ? matchArr.map((x) => x.match(streetNumRegEx)[0]) : console.log("failed match"));
}
else {
}
