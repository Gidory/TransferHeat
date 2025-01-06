// Значення
let numBalls = 400; // Кількість шариків
let heaterPower = 1000; // Сила обігрівача
let balls = [];                                                                                                                
let ballContainer = document.querySelector("#ballcontainer");                                                     
let heater = document.querySelector("#heater");
let heater2 = document.querySelector("#heater2");
const heatTransferDistance = 30; // Максимальна відстань для передачі тепла
const heaterTransferDistance = 50;
let cooldewn=1000;
let d=0;
let sensor = document.querySelector("#sensor");
let sensor1 = document.querySelector("#sensor1");
let infop = document.querySelector("#infopanel");
let starter = document.querySelector("#starter");
let forst = 0;
let funint = 0;
let alreadyon = 0;
//Змінні, за допомгою яких можна зупинити або розпочати якісь інтервали(2){
let GHF;
let DHF;
//Змінні, за допомгою яких можна зупинити або розпочати якісь інтервали(2)}
let hp= document.querySelector("#hp");
let checktransfer = 0;
let openthelog = document.querySelector("#openthelog");
let NBA = 0;
let errorlog = document.querySelector("#errorlog");
let room = document.querySelector("#room");
let returntozero = document.querySelector("#leavelog");
let logger = document.querySelector("#logger");
let errors = [];
let timestamps = [];
let limiter = 0;
let squares = [];
let tlos = 0;