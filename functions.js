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
                sensor.innerText ="○ "+ Math.round(ball.temperature, 2)+"°C";
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
    for(let f = 0; f < ((sotwh+sotwl)*2)-2; f++){
        let square = document.createElement("div");
        square.className = "square";
        square.id = 's' + f + "0";
        square.style.top = -15+(15 * f) +"px";
        square.style.left = -15+"px";
        if(f>=22&&f<53){
            square.style.top = -15 +"px";
            square.style.left = 15*(f-22)+"px";
        }else if(f>=53&&f<74){
            square.style.top = 15*(f-53) +"px";
            square.style.left = 450+"px";
        }else if(f>=74){
            square.style.top = 300 +"px";
            square.style.left = 15*(f-74)+"px";
        }
        room.appendChild(square);
        squares.push(square);
        square.temperature=0;
        square.totaltook = 0;
        square.addEventListener("mouseover", hoveri12);
            function hoveri12(){
                sensor1.innerText = Math.round(square.totaltook, 2)+"°C";
            }
        console.log("Я НАРодИвся", square.id);
    }
}
function transferHeat() {
    let k_ball = 1; // Коефіцієнт теплопровідності для кульок
    let maxTemperature = 30; // Максимальна температура для кульок

    for (let ball of balls) {
        ball.newTemperature = ball.temperature; // Початкова температура
        ball.blockedBalls = {}; // Блокування передачі тепла
        ball.blockedSquares = {};
    }

    heater1 = heater.getBoundingClientRect();
    heater20 = heater2.getBoundingClientRect();

    GHF = setInterval(() => {
        let currentTime = Date.now();

        for (let ball of balls) {
            let ballRect = ball.getBoundingClientRect();

            // Тепло від обігрівачів
            for (let heater of [heater1, heater20]) {
                let distanceToHeater = Math.sqrt(
                    Math.pow(ballRect.x - heater.x, 2) +
                    Math.pow(ballRect.y - heater.y, 2)
                );

                if (distanceToHeater < heaterTransferDistance) {
                    let heatTransferAmount = heaterPower / Math.max(1, distanceToHeater); // Враховуємо відстань
                    ball.newTemperature = Math.min(ball.temperature + heatTransferAmount, maxTemperature);
                }
            }

            // Тепло між кульками
            for (let otherBall of balls) {
                if (otherBall === ball) continue;

                let otherBallRect = otherBall.getBoundingClientRect();
                let distanceToOtherBall = Math.sqrt(
                    Math.pow(ballRect.x - otherBallRect.x, 2) +
                    Math.pow(ballRect.y - otherBallRect.y, 2)
                );

                if (distanceToOtherBall < heatTransferDistance) {
                    if (!ball.blockedBalls[otherBall.id] || currentTime > ball.blockedBalls[otherBall.id]) {
                        let deltaT = ball.temperature - otherBall.temperature;
                        let heatTransferAmount = k_ball * deltaT / Math.max(1, distanceToOtherBall);

                        if (heatTransferAmount > 0) {
                            heatTransferAmount = Math.min(heatTransferAmount, maxTemperature - otherBall.newTemperature);
                            ball.newTemperature -= heatTransferAmount;
                            otherBall.newTemperature += heatTransferAmount;

                            ball.blockedBalls[otherBall.id] = currentTime + 300;
                            otherBall.blockedBalls[ball.id] = currentTime + 300;
                        }
                    }
                }
            }

            // Тепло до стін
            for (let square of squares) {
                if (!square.id) continue;

                let squareRect = square.getBoundingClientRect();
                let distanceToWall = Math.sqrt(
                    Math.pow(ballRect.x - squareRect.x, 2) +
                    Math.pow(ballRect.y - squareRect.y, 2)
                );

                if (distanceToWall < heatTransferDistance) {
                    if (!ball.blockedSquares[square.id] || currentTime > ball.blockedSquares[square.id]) {
                        let deltaT = ball.temperature - square.temperature;
                        let heatTransferAmount = square.thermalConductivity * deltaT / Math.max(1, distanceToWall);

                        if (heatTransferAmount > 0) {
                            ball.newTemperature -= heatTransferAmount;
                            square.temperature += heatTransferAmount;
                            square.totaltook += heatTransferAmount;

                            ball.blockedSquares[square.id] = currentTime + 900;
                        }
                    }
                }
            }
        }

        // Оновлення температур кульок
        for (let ball of balls) {
            ball.temperature = ball.newTemperature;
            color(ball, ball.temperature);
        }

        // Оновлення кольорів стін
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