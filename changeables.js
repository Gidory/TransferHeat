// Значення
let numBalls = 400; // Кількість шариків
let heaterPower = 5; // Сила обігрівача
let balls = [];                                                                                                                
let ballContainer = document.querySelector("#ballcontainer");                                                     
let heater = document.querySelector("#heater");
const heatTransferDistance = 50; // Максимальна відстань для передачі тепла
let cooldewn=1000;
let d=0;
let sensor = document.querySelector("#sensor");
let infop = document.querySelector("#infopanel");
let starter = document.querySelector("#starter");
let forst = 0;
let funint = 0;
let alreadyon = 0;
let GHF;
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