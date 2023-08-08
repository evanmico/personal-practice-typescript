//Generics
//const stringEcho = (arg: string): string => arg; //Only works with strings
const stringEcho = <T>(arg: T): T => arg; //This function is generic so it works with any type

const isObj = <T>(arg: T): boolean => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}

console.log(isObj(true));
console.log(isObj('John'));
console.log(isObj([3, 5, 9]));
console.log(isObj({name: 'Donny'}));
console.log(isObj(null));

//A good time to use a generic is when a function needs to do something thinking on what type it needs to return

const isTrue = <T>(arg: T): {arg: T, is: boolean} => {
    if(Array.isArray(arg) && !arg.length) {
        return {arg, is: false};
    }
    if(isObj(arg) && !Object.keys(arg as keyof T).length) {
        return {arg, is: false};
    }
    return {arg, is: !!arg};
}
//Any data type can be passed and successfully processed due to generic
console.log(isTrue(false));
console.log(isTrue(0));
console.log(isTrue(true));
console.log(isTrue(1));
console.log(isTrue('Dave'));
console.log(isTrue(''));
console.log(isTrue(null));
console.log(isTrue(undefined));
console.log(isTrue({}));
console.log(isTrue({name: 'Dave'}));
console.log(isTrue([]));
console.log(isTrue([2, 4, 6]));
console.log(isTrue(NaN));
console.log(isTrue(-0));

//Same as isTrue, but a type generic is utilized in interface and interface is used in function return
interface BoolCheck<T> {
    value: T,
    is: boolean
}
const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
    if(Array.isArray(arg) && !arg.length) {
        return {value: arg, is: false}; //Changes because now we have a defined value as return in BoolCheck<T> interface
    }
    if(isObj(arg) && !Object.keys(arg as keyof T).length) {
        return {value: arg, is: false};
    }
    return {value: arg, is: !!arg};
}

interface HasID {
    id: number
}
//extends is used so that the generic T type MUST HAVE an id key in its properties as HasID interface defines
const processUser = <T extends HasID> (user: T): T => {
    //process user with logic here
    return user;
}

console.log(processUser({id: 1, name: 'mico'})); //Works because param being passed has id key
//console.log(processUser({name: 'mico'})); //Does not work because param being passed DOES NOT have id key

//K extends keyof T means that generic K must be made up of the keys of T (this saves us having to do an assertion later)
const getUsersProperty = <T extends HasID, K extends keyof T>(users: T[], key: K): T[K][] => {
    return users.map(user => user[key]); //no need to do an assertion with key because of earlier K
}
//users array obtained from json placeholder
const usersArray = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
      "address": {
        "street": "Hoeger Mall",
        "suite": "Apt. 692",
        "city": "South Elvis",
        "zipcode": "53919-4257",
        "geo": {
          "lat": "29.4572",
          "lng": "-164.2990"
        }
      },
      "phone": "493-170-9623 x156",
      "website": "kale.biz",
      "company": {
        "name": "Robel-Corkery",
        "catchPhrase": "Multi-tiered zero tolerance productivity",
        "bs": "transition cutting-edge web services"
      }
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
      "address": {
        "street": "Skiles Walks",
        "suite": "Suite 351",
        "city": "Roscoeview",
        "zipcode": "33263",
        "geo": {
          "lat": "-31.8129",
          "lng": "62.5342"
        }
      },
      "phone": "(254)954-1289",
      "website": "demarco.info",
      "company": {
        "name": "Keebler LLC",
        "catchPhrase": "User-centric fault-tolerant solution",
        "bs": "revolutionize end-to-end systems"
      }
    },
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "username": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",
      "address": {
        "street": "Norberto Crossing",
        "suite": "Apt. 950",
        "city": "South Christy",
        "zipcode": "23505-1337",
        "geo": {
          "lat": "-71.4197",
          "lng": "71.7478"
        }
      },
      "phone": "1-477-935-8478 x6430",
      "website": "ola.org",
      "company": {
        "name": "Considine-Lockman",
        "catchPhrase": "Synchronised bottom-line interface",
        "bs": "e-enable innovative applications"
      }
    },
    {
      "id": 7,
      "name": "Kurtis Weissnat",
      "username": "Elwyn.Skiles",
      "email": "Telly.Hoeger@billy.biz",
      "address": {
        "street": "Rex Trail",
        "suite": "Suite 280",
        "city": "Howemouth",
        "zipcode": "58804-1099",
        "geo": {
          "lat": "24.8918",
          "lng": "21.8984"
        }
      },
      "phone": "210.067.6132",
      "website": "elvis.io",
      "company": {
        "name": "Johns Group",
        "catchPhrase": "Configurable multimedia task-force",
        "bs": "generate enterprise e-tailers"
      }
    },
    {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "username": "Maxime_Nienow",
      "email": "Sherwood@rosamond.me",
      "address": {
        "street": "Ellsworth Summit",
        "suite": "Suite 729",
        "city": "Aliyaview",
        "zipcode": "45169",
        "geo": {
          "lat": "-14.3990",
          "lng": "-120.7677"
        }
      },
      "phone": "586.493.6943 x140",
      "website": "jacynthe.com",
      "company": {
        "name": "Abernathy Group",
        "catchPhrase": "Implemented secondary concept",
        "bs": "e-enable extensible e-tailers"
      }
    },
    {
      "id": 9,
      "name": "Glenna Reichert",
      "username": "Delphine",
      "email": "Chaim_McDermott@dana.io",
      "address": {
        "street": "Dayna Park",
        "suite": "Suite 449",
        "city": "Bartholomebury",
        "zipcode": "76495-3109",
        "geo": {
          "lat": "24.6463",
          "lng": "-168.8889"
        }
      },
      "phone": "(775)976-6794 x41206",
      "website": "conrad.com",
      "company": {
        "name": "Yost and Sons",
        "catchPhrase": "Switchable contextually-based project",
        "bs": "aggregate real-time technologies"
      }
    },
    {
      "id": 10,
      "name": "Clementina DuBuque",
      "username": "Moriah.Stanton",
      "email": "Rey.Padberg@karina.biz",
      "address": {
        "street": "Kattie Turnpike",
        "suite": "Suite 198",
        "city": "Lebsackbury",
        "zipcode": "31428-2261",
        "geo": {
          "lat": "-38.2386",
          "lng": "57.2232"
        }
      },
      "phone": "024-648-3804",
      "website": "ambrose.net",
      "company": {
        "name": "Hoeger LLC",
        "catchPhrase": "Centralized empowering task-force",
        "bs": "target end-to-end models"
      }
    }
]
//retrieves the emails of all the users
console.log(getUsersProperty(usersArray, 'email'));
//retrieves the usernames of all the users
console.log(getUsersProperty(usersArray, 'username'));


//Using Generics in Classes
class StateObject<T> {
    private data: T;

    constructor(value: T) {
        this.data = value;
    }

    get state(): T {
        return this.data
    }

    set state(value: T) {
        this.data = value;
    }
}

const store = new StateObject('Donny'); //infers the type of StateObject to be string based on passed param
console.log(store.state);
store.state = 'evan';
//store.state = 20; //Doesn't work because store of StateObject type was infered to be a string

//here the type of StateObject is explicitely stated to be an array that can contain string, number, or boolean values
const myState = new StateObject<(string | number | boolean)[]>([15]); //array with 15 is initially put into myState
myState.state = [...myState.state, 'Ivan', 20, false]; //Assigning new array with prior array's values and 3 new ones
console.log(myState.state); //Logging the entire array
