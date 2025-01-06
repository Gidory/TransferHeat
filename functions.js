// Функція для створення кульок
function createthat() {
    let rows=300/15;
    let columns=450/15;
    sotwh = 330/15; 
    sotwl = 465/15;
    console.log(sotwh);
    console.log(rows);
    console.log(columns);
    for (j = 0; j < rows; j++) {
        for (let i = 0; i < columns; i++) {
            let ball = document.createElement("div");
            ball.className = "ball";
            ball.id = 'h' + j + "0"+ i;

            // Встановлення початкової позиції для всіх кульок
            // Встановлення температури
            ball.style.left = 10 * i + 5 * i + "px";
            ball.style.top = j * 15 + "px";
            console.log('j ', j ,'i ', i)
            //let yeah = 10 * i + 5 * i;
            // if (yeah > 300) {
            //     ball.style.left = (10 * i + 5 * i) - 300 + "px";
            //     ball.style.top = j + "px";
            // }
            ball.addEventListener("mouseover", hoveri);
            function hoveri(){
                sensor.innerText = Math.round(ball.temperature, 2)+"°C";
            }
            ball.temperature = 10; // Початкова температура
            balls.push(ball);
            room.appendChild(ball);
            // function updateBallColors() {
            //     const redIntensity = Math.floor((ball.temperature - 10) / 20 * 255);
            //     const blueIntensity = 255 - redIntensity;
            //     ball.style.backgroundColor = `rgb(${redIntensity}, 0, ${blueIntensity}`;
            // }
        }
    }
    for(let f = 0; f < sotwh+sotwl; f++){
        let square = document.createElement("div");
        square.className = "square";
        square.id = 's' + f + "0";
        square.style.top = -15+(15 * f) +"px";
        square.style.left = -15+"px";
        if(f>=22){
            square.style.top = -15 +"px";
            square.style.left = 15*(f-22)+"px";
        }
        room.appendChild(square);
        squares.push(square);
        square.temperature=0;
        console.log("Я НАРодИвся");
    }
}

// Функція передачі тепла
function transferHeat() {
    for (let ball of balls) {
        ball.newTemperature = ball.temperature;
        ball.blockedBalls = {}; // Додавання властивості для блокування
    }
    heater1 = heater.getBoundingClientRect();

    GHF = setInterval(() => {
        let currentTime = Date.now(); // Поточний час, зь 1 січня 1970 року

        for (let ball of balls) {
            let ballRect = ball.getBoundingClientRect();
            let distanceToHeater = Math.sqrt(
                Math.pow(ballRect.x - heater1.x, 2) +
                Math.pow(ballRect.y - heater1.y, 2)
            );
            heaterPower = hp.value;
            if (isNaN(heaterPower)) {
                heaterPower = 0;
            }
            if (heaterPower < 0) {
                heaterPower = 0;
            }
            if(hp.value == ""){
                hp.value=0;
                heaterPower=0;
                errors.push("Value for heater power wasn`t set. Heater power was set to 0");
                timestamps.push(Date.now());
                console.log(timestamps);
                console.log(errors);
            }
            hp.value = heaterPower;

            // Тепло від обігрівача
            if (heaterPower > 0) {
                if (distanceToHeater < heatTransferDistance&&ball.newTemperature<=30) {
                    let heatTransferAmount = heaterPower / 2;
                    ball.newTemperature = Math.min(ball.temperature + heatTransferAmount, 30);
                    checktransfer+=heatTransferAmount;
                    console.log("checktransfer", checktransfer);
                }
            }

            // Тепло між кульками
            for (let otherBall of balls) {
                if (otherBall !== ball) {
                    let otherBallRect = otherBall.getBoundingClientRect();
                    let distanceToOtherBall = Math.sqrt(
                        Math.pow(ballRect.x - otherBallRect.x, 2) +
                        Math.pow(ballRect.y - otherBallRect.y, 2)
                    );

                    if (distanceToOtherBall < heatTransferDistance) {
                        //Перевірка на блокування
                        if (!ball.blockedBalls[otherBall.id] || currentTime > ball.blockedBalls[otherBall.id]) {
                            let heatTransferAmount = 1.5;
                            let transferableHeat = Math.min(ball.newTemperature - 15, heatTransferAmount); // Доступне тепло до передачі
                            if (transferableHeat > 0) {
                                let actualTransfer = Math.min(transferableHeat, 30 - otherBall.newTemperature); // Максимальна кількість тепла яку може отримати otherBall;
                                ball.newTemperature -= actualTransfer;
                                otherBall.newTemperature += actualTransfer;
                    
                                //Блокування 
                                ball.blockedBalls[otherBall.id] = currentTime + 900; 
                                otherBall.blockedBalls[ball.id] = currentTime + 900;
                            }
                        }
                    }
                }
            }
        }

        // Оновлення температур і кольорів
        for (let ball of balls) {
            ball.temperature = ball.newTemperature;
            color(ball, ball.temperature);
        }
    }, 100); // Інтервал оновлення
}
function color(obj,temperature){
    //console.log('color obj', obj)
    //console.log('color temperature', temperature)
    
     const redIntensity = Math.floor((temperature-10) / 20 * 255);
     const blueIntensity = 255 - redIntensity;
     //console.log('blueIntensity ', blueIntensity)
     obj.style.backgroundColor = `rgb(${redIntensity}, 0, ${blueIntensity})`;
}

// Функція для оновлення кольорів кульок

// Запуск симуляції // Створюємо кульки

// let hmimtrbthta = heatTransferAmount - maxtempreduced;
// let maxtempreduced = ball.newTemperature - 10;
// if (heatTransferAmount<maxtempreduced){
// ball.newTemperature -= heatTransferAmount;
// otherBall.newTemperature = Math.min(otherBall.newTemperature + heatTransferAmount, 30);
// }else if(heatTransferAmount>maxtempreduced){