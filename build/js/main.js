"use strict";
//Utility Types
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const updateAssignment = (assign, propsToUpdate) => {
    return Object.assign(Object.assign({}, assign), propsToUpdate);
};
const assign1 = {
    studentId: 'COP4610',
    title: 'Final Project',
    grade: 0
};
console.log(updateAssignment(assign1, { grade: 80 }));
const assignGraded = updateAssignment(assign1, { grade: 80 });
console.log(assignGraded); //updated assing1
console.log(assign1); //Original assing1 is unchanged
// Required and Readonly utility types
//Required makes it such that all of the properties in Assignment (including verified) are required for function to be called
const recordAssignment = (assign) => {
    //send to database, etc.
    return assign;
};
//creates an assignVerified that CONNOT be modified due to Readonly<> utility type
const assignVerified = Object.assign(Object.assign({}, assignGraded), { verified: true }); //verified is set to true so it works in recordAssignment function
//assignVerified.grade = 69; //Doesn't work because assignVerified has Readonly<> property
recordAssignment(Object.assign(Object.assign({}, assignGraded), { verified: true })); //works because verified has been created and set to true
//assignVerified must have an assertion made to be of type Required<Assignment> rather than Readonly<Assignment> despite containing a verified key to call recordAssignment
recordAssignment(assignVerified);
//recordAssignment({...assignVerified}); //doesn't work because verified in Assignment can be undefined or boolean
// Record Utility Type
const hexColorMap = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF"
};
const finalGrades = {
    Sara: "B",
    Kelly: "U"
};
const gradeData = {
    Sara: { assign1: 34, assign2: 99 },
    Kelly: { assign1: 4, assign2: 10 }
};
const score = {
    studentId: "A233",
    grade: 23
};
const preview = {
    studentId: "A233",
    title: "Midterm Project"
};
// ReturnType
/* This has limitation where if you ever want to update your createNewAssign function return, then you have to update the type newAssign as well
type newAssign = {title: string, points: number};

const createNewAssign = (title: string, points: number): newAssign => {
    return {title, points};
}
*/
//Using ReturnType, this limitation can be overcome
const createNewAssign = (title, points) => {
    return { title, points };
};
const tsAssign = createNewAssign("ReturnTypes", 69); //this will always be valid, no matter the modifications to the return on createNewAssign() because type NewAssign updates accordingly.
console.log(tsAssign);
const assignArgs = ["Generics", 100];
const tsAssign2 = createNewAssign(...assignArgs);
console.log(tsAssign2);
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json();
    }).catch(err => {
        if (err instanceof Error)
            console.log(err.message);
    });
    return data;
});
fetchUsers().then(users => console.log(users)); //gives us the users content
