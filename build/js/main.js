"use strict";
// The Redundant and Traditional class declaration
// class Coder {
//     //Properties and methods inside of a class are called members
//     name: string; //(1) must have property exist in class as member
//     music: string;
//     age: number;
//     lang: string;
//     //you need a constructor when dealing with classes
//     constructor(name: string, 
//                 music: string, 
//                 age: number, 
//                 lang: string)
//      {
//         this.name = name; //(2) AND you must initialize the member in the constructor
//         this.music = music;
//         this.age = age;
//         this.lang = lang;
//     }
// }
//Visibility/Data/Access Modifiers method to avoid above redundancy
class Coder {
    //you need a constructor when dealing with classes
    constructor(name, //public visibility mod allows not declaring member above, avoiding redundancy
    music, age, //Can only be accessed within this class while protected can be accessed by derived classes
    lang = 'Typescript' // " = 'Typescript' " means that a default value has been assigned so lang is not always necessary to be provided when creating a new instance of this class 
    ) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        //Assignments in the constructor body ARE NOT required when visibility modifiers are used in params
        /*
        this.name = name; //(2) AND you must initialize the member in the constructor
        this.music = music;
        this.age = age;
        this.lang = lang;
        */
    }
    getAge() {
        return `Hello, I'm ${this.age}.`;
    }
}
const Ivan = new Coder('Ivan', 'Dubstep', 20); //Doesn't require 4th parameter because Coder class has default value available for 4th param
console.log(Ivan.getAge()); //Works because we access public method to get age
/* TS doesn't like this, but JS will be okay with this:
console.log(Ivan.age); //Doesn't work because age is private and cannot be accessed from outside the class
console.log(Ivan.lang); //Doesn't work because lang is protected and can ONLY be accessed by derived classes
*/
class WebDev extends Coder {
    constructor(computer, name, music, age) {
        super(name, music, age); // In Derived Classes a call to super MUST be made for all members that are being brought in from parent class. This call must be made FIRST, before any assignment can happen.
        this.computer = computer;
        //this.computer = computer; // super must be called before this
    }
    getLang() {
        return `I write ${this.lang}.`;
    }
}
const Flavio = new WebDev('MacBook', 'Flavio', 'Alt', 21);
console.log(Flavio.getLang()); //This method can be called to get language, in this case default language from parent class.
//Verbose Way
// class Pianist implements Musician {
//     name: string;
//     instrument: string;
//     constructor(name: string, instrument: string) {
//         this.name = name;
//         this.instrument = instrument;
//     }
//     play(action: string) {
//         return `${this.name} ${action} the ${this.instrument}`
//     }
// }
//Dry Way of class implementing an interface
class Pianist {
    constructor(name, instrument = 'piano') {
        this.name = name;
        this.instrument = instrument;
    }
    ;
    play(action) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}
const Rivas = new Pianist("Tomas Rivas");
console.log(Rivas.play('plays'));
//Static Members in classes
class Peeps {
    //This method is static so it can be called NO MATTER what by referencing the class itself directly
    static getCount() {
        return Peeps.count;
    }
    constructor(name) {
        this.name = name;
        this.id = ++Peeps.count; //Increments count first, then assigns it as an id for a particular instance
    }
}
/*
count applies DIRECTLY to the class, NOT a specific instance of said class
This means that count will be accessible by referencing the class directly, rather than a specific instance of the class
count will be the same between all instances of the class.
*/
Peeps.count = 0;
const Max = new Peeps('Max');
const Mark = new Peeps('Mark');
const Yasha = new Peeps('Yasha');
console.log(Peeps.count); //returns count of 3 because count is static between instances
console.log(Mark.id); //id = 2 cause made second
console.log(Max.id); //id = 1 cause made first
//Getters and Setters
class Artists {
    constructor() {
        this.dataState = [];
    }
    get data() {
        return this.dataState;
    }
    set data(value) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.dataState = value;
            return;
        }
        else
            throw new Error('Param is not an array of strings');
    }
}
const myArtists = new Artists();
myArtists.data = ['Skrillex', 'Nero', 'Knife Party']; //when there is a setter, you just call .data and set equal to what you want
console.log(myArtists.data); //When there is a getter, you can just do .data and the data will be returned
myArtists.data = [...myArtists.data, 'Apashe']; //takes all the artists already in array and reassigns them using the rest operator, but also appends one more
console.log(myArtists.data);
/* Both throw error due to type guard we have put in place on setter
myArtists.data = 'Britney';
myArtists.data = ['Britney', 99];
*/ 
