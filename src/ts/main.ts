let myName: string = "Ivan";
let definitionOfLife: number;
let isLoading: boolean;
let album: any;

definitionOfLife = 15;
isLoading = true;
album = 2222; //can be any datatype, try not to use this too much as it defeats ts purpose
album = "The Black Album";

const sum = (a: number, b: string) => {
    return a + b;
}

//Realistic Cases Where You May Use Union Type
let postId: string | number;
let isActive: number | boolean;

let re = /\w+/g; //If not sure what type something is, mouse over and see what typescript infers
let reWithSpecifiedType:RegExp = /\w+/g; // the result