//Type Aliases
//Can apply to more than just objects

type stringOrNumber = string | number;
type stringOrNumberArr = (string | number)[];
type TriangePlayer = {
    name?: string,
    active: boolean,
    albums: stringOrNumberArr
}

type userId = stringOrNumber; //type userId is now a stringOrNumberType which defines that (string | number) can be held

//this doesn't work because interfaces don't work the same as types,
//interfaces should really be thought of just objects or classes
//while types can store anything:
//interface PostId = stringOrNumber

// Literal Types
let myName: 'Ivan'; //Variable can ONLY be equaled to 'Ivan'

let userName: 'Ivan' | 'Flavio' | 'Max'; //More useful usage that only allows userName to be equaled to the specified things
userName = 'Ivan'; //Intelisence shows certain names

// functions
const add = (a: number, b: number): number =>{
    return a + b;
}
//function that doesn't have return at all should be void
const logMsg = (message: any): void =>{
    console.log(message);
}

logMsg('Hello!');
logMsg(add(2,3));
//logMsg(add('a', 3));//doesn't work because we specified our add function to be numbers

//standard function works the same as arrow function
let subtract = function(c: number, d: number): number{
    return c-d;
}

// If you make many functions that take the same input parameter types and return the same type, then an alias is useful since it saves typing out :number every time.
type mathFunction = (a: number, b: number) => number
/* Interfaces can be used to do the same thing here, but usually you use types with function definitions
interface mathFunction {
    (a: number, b: number) : number
}*/
//here we just create a function of type mathFunction and it already knows the expected input parameter types and the return type
let multiply: mathFunction = function (c, d) {
    return c * d;
}

logMsg(multiply(2,3));

// Optional Parameters
//When using optional parameters you need to put in a type guard with typescript
//optional parameters MUST be the last in the list of inputs
const addAll = (a:number, b: number, c?: number): number => {
    if(typeof c !== 'undefined') {//typeguard
        return a + b + c;
    }
    return a + b;
}
//Specifying a default param value for an input parameter avoids the need for a typeguard all together.
const sumAll = (a:number = 9, b: number, c: number = 2): number => {
    return a + b + c;
}

logMsg(addAll(2, 3 , 2));
logMsg(addAll(2, 3));
logMsg(sumAll(2, 3));
//if you wanna utilize the default value for a in sumAll, you MUST pass in 'undefined' for a
logMsg(sumAll(undefined, 2));
//when defining a function type or interface, default values DO NOT work


//Rest Parameters
// Rest parameters are named that because they represent the rest of the parameters after specifically defined ones
// rest parameter should come at the end of all of your parameters for a function
const total = (a:number, ...nums: number[]):number => {
    return a + nums.reduce((prev, curr) => prev + curr); //no need to specify prev or curr type or return type since in total function definition that has already been done
}

logMsg(total(1, 2, 3, 4));

//never type
//for functions that intentionally throw errors
const createError = (errMsg: string): never =>{
    throw new Error(errMsg);
}
//when mousing over function, if return type is never, MAKE SURE that the function is meant to throw an error.
//Otherwise, you could have an endless loop inside of it like this:
const infinite = () => {
    let i: number = 1
    while (true) {
        i++;
        //if (i > 100) break; //makes return type void
    }
}
//defining a custom type guard so that you don't need to rewrite the same thing over and over again if one type guard is used often.
const isNumber = (value: any): boolean =>{
    return typeof value === 'number' ? true: false;
}
//Use of the never type
const numberOrString = (value: number| string): string =>{
    if(typeof value === 'string') return 'string';
    if(isNumber(value)) return 'number';
    return createError ('This should never happen'); //Allows for an undefined return to not exist by returning a never type instead
}