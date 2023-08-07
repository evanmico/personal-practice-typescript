"use strict";
//OG JS Code
// const year = document.getElementById('year');
// const thisYear = new Date().getFullYear();
// year.setAttribute("datetime", thisYear);
// year.textContent = thisYear;
//My TS Solution
// const year = document.getElementById('year')!;
// const thisYear: number = new Date().getFullYear();
// year.setAttribute("datetime", '' + thisYear);
// year.textContent ="" + thisYear;
// 1st Variation
// let year: HTMLElement | null
// year = document.getElementById('year');
// let thisYear: string
// thisYear = new Date().getFullYear().toString();
// if(year){ //typeguard
//     year.setAttribute("datetime", thisYear);
//     year.textContent = thisYear;
// }
// 2nd Variation
const year = document.getElementById('year');
const thisYear = new Date().getFullYear().toString();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
