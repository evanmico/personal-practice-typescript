//Utility Types

//Partial
interface Assignment {
    studentId: string,
    title: string,
    grade: number,
    verified?: boolean
}

const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
    return {...assign, ...propsToUpdate};
}

const assign1: Assignment = {
    studentId: 'COP4610',
    title: 'Final Project',
    grade: 0
}

console.log(updateAssignment(assign1, {grade: 80}));
const assignGraded: Assignment = updateAssignment(assign1, {grade: 80});
console.log(assignGraded); //updated assing1
console.log(assign1); //Original assing1 is unchanged


// Required and Readonly utility types
//Required makes it such that all of the properties in Assignment (including verified) are required for function to be called
const recordAssignment = (assign: Required<Assignment>): Assignment => {
    //send to database, etc.
    return assign;
}
//creates an assignVerified that CONNOT be modified due to Readonly<> utility type
const assignVerified: Readonly<Assignment> = { ...assignGraded, verified: true}; //verified is set to true so it works in recordAssignment function
//assignVerified.grade = 69; //Doesn't work because assignVerified has Readonly<> property

recordAssignment({...assignGraded, verified: true}); //works because verified has been created and set to true
//assignVerified must have an assertion made to be of type Required<Assignment> rather than Readonly<Assignment> despite containing a verified key to call recordAssignment
recordAssignment(assignVerified as Required<Assignment>);
//recordAssignment({...assignVerified}); //doesn't work because verified in Assignment can be undefined or boolean


// Record Utility Type
const hexColorMap: Record<string, string> = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF"
}
//using a record to use string literals to force specific keys and values Record<key, value>
type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "U";
const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kelly: "U"
}

interface Grades {
    assign1: number,
    assign2: number
}
const gradeData: Record<Students, Grades> = {
    Sara: {assign1: 34, assign2: 99},
    Kelly: {assign1: 4, assign2: 10}
}

// Pick and Omit Utility Classes
//Pick and Omit WORK WITH INTERFACES
//Pick selects only the keys you specify out of an interface
type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = {
    studentId: "A233",
    grade: 23
}
//Omit selects all the keys EXCEPT the ones you specify from an interface
type AssignPreview = Omit<Assignment, "grade" | "verified">;
const preview: AssignPreview = {
    studentId: "A233",
    title: "Midterm Project"
}


//Exclude and Extract
//Exclude and Extract work with UNION TYPES AND STRING LITERALS

//Exclude keeps everything EXCEPT the specified string literal/union type
type adjustedGrade = Exclude<LetterGrades, "U">;
//Extract keeps ONLY the specified string literal/union type
type highGrades = Extract<LetterGrades, "A" | "B">;


// NonNullable

type AllPossibleGrades = 'Dave' | 'John' | null | undefined;
//NonNullable excludes both null and undefined
type NamesOnly = NonNullable<AllPossibleGrades>;


// ReturnType

/* This has limitation where if you ever want to update your createNewAssign function return, then you have to update the type newAssign as well
type newAssign = {title: string, points: number};

const createNewAssign = (title: string, points: number): newAssign => {
    return {title, points};
}
*/
//Using ReturnType, this limitation can be overcome
const createNewAssign = (title: string, points: number) => {
    return {title, points};
}

type NewAssign = ReturnType<typeof createNewAssign>;

const tsAssign: NewAssign = createNewAssign("ReturnTypes", 69); //this will always be valid, no matter the modifications to the return on createNewAssign() because type NewAssign updates accordingly.
console.log(tsAssign);


// Parameters
//This allows you to make a type that is updated in accordance with the parameters of a function. You can then create a new variable of the type (AssignParams) that can then be set to an array that contains the parameters. Using this, you can call the function and have the parameters specified by using the spread operator on the newly created variable of the type that is in accordance with the parameters of the function.
type AssignParams = Parameters<typeof createNewAssign>;

const assignArgs: AssignParams = ["Generics", 100];

const tsAssign2: NewAssign = createNewAssign(...assignArgs);
console.log(tsAssign2);



// Awaited Utility Type
//This helps with the return type of a Promise

interface User {
    id: number,
    name: string,
    username: string,
    email: string
}

const fetchUsers = async (): Promise<User[]> => {
    const data = await fetch(
        'https://jsonplaceholder.typicode.com/users'
    ).then(res => {
        return res.json();
    }).catch(err =>{
        if(err instanceof Error) console.log(err.message);
    })
    return data;
}
//using just ReturnType, FetchUsersReturnType is a promise type
//type FetchUsersReturnType = ReturnType<typeof fetchUsers>;
//using ReturnType in conjunction with Awaited, you FetchUsersReturnType is no longer a promise, but rather just the content that is return by fetch users.
type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>;

fetchUsers().then(users => console.log(users)); //gives us the users content