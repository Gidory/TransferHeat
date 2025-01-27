// Значення
let numBalls = 400; // Кількість шариків
const ppM = 150; // Пікселі в мктрах
// Потужність обігрівача у Вт
let heaterPower = 0; // Потужність обігрівача
const maxHeaterTemperature = 30; //Максимальна температура яку може видати обігрівач
let balls = [];                                                                                                                
let ballContainer = document.querySelector("#ballcontainer");                                                     
let heater1 = document.querySelector("#heater");
const heatTransferDistance = 30; // Максимальна відстань для передачі тепла
const heaterTransferDistance = 50;
let cooldewn = 1000;
let d=0; //unused (maybe)
let sensor = document.querySelector("#sensor");
let sensor1 = document.querySelector("#sensor1");
let infop = document.querySelector("#infopanel");
let starter = document.querySelector("#starter");
let forst = 0;
let funint = 0;
let alreadyon = 0;
//Змінні, за допомгою яких можна зупинити або розпочати якісь інтервали(1){
let GHF;
//Змінні, за допомгою яких можна зупинити або розпочати якісь інтервали(1)}
let hp= document.querySelector("#hp");
let checktransfer = 0;
let openthelog = document.querySelector("#openthelog");
let NBA = 0;
let errorlog = document.querySelector("#errorlog");
let room = document.querySelector("#room");
let returntozero = document.querySelector("#leavelog");
let returntozero1 = document.querySelector("#leavelog1");
let logger = document.querySelector("#logger");
let errors = [];
let timestamps = [];
let limiter = 0;
let squares = [];
let tlos = 0;
let ind = 1;
let heatnumber = document.querySelector("#heatnumber");
let blocked = false;
let heateroff = false;
let tb = document.querySelector("#toolbag");
let wallsOff = document.querySelector("#wallsOff");
let heaterOff = document.querySelector("#heaterOff");
let helper1 = 0;
let helper2 = 0;
let ballcount = document.querySelector("#ballcount");
 let bc = document.querySelector('#bc');
 let savedballcount = 600; //unused
 let nextpg = document.querySelector("#nextpg");
 let cont06 = document.querySelector("#cont06");
 let cont07 = document.querySelector("#cont07");
 let ss = document.querySelector("#ss");
 let sc = document.querySelector("#speedcount");
