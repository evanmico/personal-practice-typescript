//Index Signatures
//used when you wanna access an object key, but you don't know the names of the keys

//Traditional Interface WITHOUT use of index signatures
// interface TransactionObj {
//     Pizza: number,
//     Books: number,
//     Job: number
// }

//Standard Way to Provide a Generic Index Signature
// interface TransactionObj {
//     //States that all of the keys in the object are gonna be strings, and all the values will be numbers. (union types can be used for both; however, index cannot be something like boolean)
//     readonly [index: string]: number //"key" can also be used in place of "index"
// }

//Combination of traditional Interface WITH an index signature so that keys are explicitly stated
interface TransactionObj{
    readonly [index: string]: number, //Allows for more keys to be addded than are explicity stated; however, they must have number values
    //Requires these 3 keys when used to create object
    Pizza: number,
    Books: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Dave: 42 //added so undefined value won't be returned later
}

console.log(todaysTransactions.Pizza);
console.log(todaysTransactions['Pizza']);

let prop: string = 'Pizza';

//TS REQUIRES an index signature when you try to access an object dynamically
console.log(todaysTransactions[prop]); //this doesn't work in TS when index signatures aren't used for interface declaration

const todaysNet = (transactions: TransactionObj): number => {
    let total = 0;
    for(const transaction in transactions) { //loops through all keys in transactions object, storing each one in transaction dynamically
        total += transactions[transaction]; //Works when index signature is used in interface declaration
    }
    return total;
}

console.log(todaysNet(todaysTransactions));

//todaysTransactions.Pizza = 40; //doesn't work cause we set readonly on transactionObj interface

//If, generic index signature declaration interface is used, then This returns undefined because 'Dave' is not a key; however, TS doesn't know that so it will NOT throw an error, this is a drawback of this system.
console.log(todaysTransactions['Dave']); 



interface Student {
    //[key: string]: string | number | number[] | undefined
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
    name: 'Ivan',
    GPA: 3.1,
    classes: [3000, 4000]
}

// console.log(student.test); //issue cause accessing key that doesn't exist
/*Traditional JS method for looping through object keys
for (const key in student) {
    console.log(`${key}: ${student[key]}`); //Only works if index key is provided
}
*/
//TS variation using assertions
for (const key in student) {
    //Assertion "as keyof Interface" creates a union type of string literals that contains all of the keys in the interface. (name, GPA, classes) 
    console.log(`for loop TS variation\n${key}: ${student[key as keyof Student]}`); //Works regardless of an index key being provided
}
//Alternative TS way using map function
Object.keys(student).map(key => {
    console.log(`map TS variation\n${key}: ${student[key as keyof typeof student]}`); //typeof is used because we may not know what interface student is derived from so typeof student grabs the interface itself and does the same thing as earlier
})

//Alternative TS way using a function
//This works because key has an "assertion" to be type "keyof Interface"
//The result is that student and key can be referenced as normal JS because the type for key has already been defined.
const logStudentKey = (student: Student, key: keyof Student): void =>{
    console.log(`Student ${key}: ${student[key]}`);
}

logStudentKey(student, 'GPA');


//Declaring a type to create index signatures more efficiently
// interface Incomes{
//     [key: string]: number,

// }

type Streams = 'salary' | 'bonus' | 'sidehustle';
//Here Incomes uses Record<> to make all the index literals in Streams as keys and states that each one will be a number. A union type can be used (Record<Streams, number | string>); however, all of the keys will be of that union type. This drawback means that you won't be able to assign a specific type to a specific key.
type Incomes = Record<Streams, number>;
//Created an object of type Incomes
const monthlyIncomes: Incomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
}

for(const revenue in monthlyIncomes) {
    console.log(monthlyIncomes[revenue as keyof Incomes]);
}

//Personal Attempt at Linked List Implementation
interface NodeInterface {
    nextNode: NodeInterface | undefined,
    prevNode: NodeInterface | undefined,
    nodeData: string
}

const originNode: NodeInterface = {
    nextNode: undefined,
    prevNode: undefined,
    nodeData: 'Hello'
}

const createNode = (prevNode: NodeInterface, data: string ): NodeInterface => {
        const newNode: NodeInterface = {
            prevNode: prevNode,
            nextNode: prevNode.nextNode,
            nodeData: data
        }
        if(prevNode.nextNode){
            prevNode.nextNode.prevNode = newNode;
        }
        prevNode.nextNode = newNode;
        return newNode
}

const node1 = createNode(originNode, "My");
const node2 = createNode(node1, 'Name');
const node4 = createNode(node2, 'Ivan');
const node3 = createNode(node2, 'Is');

for(let node: NodeInterface | undefined = originNode; 
    node != undefined; 
    node = node.nextNode
){
    console.log(`${node.nodeData} `);
}

