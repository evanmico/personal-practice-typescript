let stringArr = ["one","hey","Dave"];
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
let bands: string[] = []; //Empty array can be a specific type as long as the type desired is explicitly stated when array is first declared
bands.push("Beatles"); //Works fine

/*
  Tuple:
    If you want to declare an array and explicitly state how long it will be and 
    what types will be at what positions, you want to create a tuple.
*/
let myTuple: [string, number, boolean] = ["evanmico", 19, true]; //only allows explicitly stated data types in explicitly statedd locations
let mixed = ["Jeff", 2, false]; //Just an array that has union type of (string | number | boolean), not a tuple (can be seen by mousing over)

//mixed = myTuple; // this works fine cause mixed has union type (string | number | boolean) that allows all the values in the tuple to be in the array
//myTuple = mixed; //Doesn't work because it's possible for mixed to have less than 3 elements; however, the tuple REQUIRES 3 elements so it cannot be assigned
//myTuple[3] = 19; //Doesn't work since the tuple doesn't have a "4th" position, it only has 3 or indexes 0-2
myTuple[1] = 21; // Works fine because the tuple does indeed have a number type specified to the second position

//Objects
let myObj: object; // The easiest way to declare an object, but needs to be done with caution
myObj = []; // An array is also a type of an object in JS so Typescript is fine with this assignment
console.log(typeof(myObj)); // Still has an object type, despite now having an array in it
myObj = bands; //Perfectly Fine, still an object
myObj = {}; // Perfectly Fine, still an object

//TypeScript has inferred specific types for each prop based on the assignment (hover over to see)
const exampleObj = {
    prop1: "evanmico",
    prop2: true
}

//exampleObj.prop2 = 19; //Doesn't work because we already have boolean type data due to earlier declaration
//exampleObj.prop1 = 22; //Doesn't work because it is limited to (number) type

type Guitarist = {
    name: string,
    active: boolean,
    albums: (string | number)[]
} //This has created a new type with specification "Guitarist"

let evh: Guitarist = {
    name: "Don",
    active: false, //If you are using a type that you specified, you must have all of the properties specified when declaring a new object. So you cannot just delete a property as then you will only have 2 properties in a Guitarist type, despite it requiring 3
    albums: [2121, "OB83C"]
} //Now when we declare an object of type "Guitarist", we can only provide the data in the appropriate types specified earlier in the new type declaration

let abraham: Guitarist = {
    name: "Abraham Lincoln",
    active: false,
    albums: ["emancipation proclamation", 1887]
}

//evh = abraham; // Perfectly fine because both are of type Guitarist
//evh.years = 15;//won't work because years property is not a part of the defined "Guitarist" type

type Pianist = {
    name: string,
    active?: boolean, //Due to the ? active is now an optional property. It basically has a union type of (boolean | undefined) cause if it exists, it must be boolean, but it may also be undefined and therefore not exist
    albums: (string | number)[]
}

let han: Pianist = {
    name: "Han Solo",
    albums: ["Empire Strikes back", 4, "IV"]
}//Can be declared with only 2 properties cause active property is optional

let leia: Pianist = {
    name: "Princess Padame",
    active: true,
    albums: ["rich", "queen", "basic", 21]
}

//han = leia; //Still perfectly fine, despite han not having an active property, because they are both of type "Pianist"

/*
    Each individual property can also be specified for a function and only be assigned a name to be used inside of the function like below:
*/
//const greetPianist = (pianist: {name: string, active?: boolean, albums: (string | boolean)}) => (`Hello ${pianist.name}!`); 
//However, if a type is already specified, then this makes more sense:
const greetPianist = (pianist: Pianist) => (`Hello ${pianist.name}!`);
console.log(greetPianist(leia));


/*
    Interface:
        At the current moment, an interface is essentially the same thing as type.
        They will have differences down the road, but atm they do the same thing as a type.
        Right now it is preferance based whether to use an interface or a type.
        Usually they may be used when having methods in a class [OOP]
*/

interface TriangePlayer {
    name?: string,
    active: boolean,
    albums: (string | number)[]
}

let steve: TriangePlayer = {
    name: "Minecraft Steve",
    active: true,
    albums: ["minecraft", "C13", "1"]
}

let nameless: TriangePlayer = {
    active: false,
    albums: ["Ruh Roh", 0.0]
}
/*
    Because name property in interface TrianglePlayer is optional, when calling a function upon it, you must specify that calling a function is optional
    This is because you cannot call a function on an "undefined" value in JS
*/
//const greetTrianglePlayer = (trianglePlayer: TriangePlayer) => (`Hello ${trianglePlayer.name?.toUpperCase}!`); //This is one way to make it optional (the question mark before the .); however, narrowing is preferred (if statement to check)
const greetTrianglePlayer = (trianglePlayer: TriangePlayer) => (trianglePlayer.name?`Hello ${trianglePlayer.name.toUpperCase()}!`:"Triangle Player Is Unnamed"); // Better solution using narrowing

console.log(greetTrianglePlayer(steve)); // Returns Hello and name
console.log(greetTrianglePlayer(nameless)); // Returns else condition

/*
    Enums (Enumeration):
        "Unlike most TypeScript features, Enums are 
        not a type-level addition to JavaScript, but something 
        added to the language at runtime"
        Basically, they don't natively exist in JS.
*/

enum Grade {
    U = 1, //By default U has index 0, but by specifying an index with "= x" it changes not just the starting value, but all the following values as well to each be 1 higher than the last
    D,
    C,
    B,
    A
}

console.log(Grade.U);