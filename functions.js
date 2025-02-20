// Функція для створення кульок
function createthat(ballCount) {
    let roomW = 450; // Ширина блока
    let roomH = 300; // Висота блока 
    let vidst = 5; // Відстань між шариками в пкс
    sotwh = 330/15; // незмінне значення для створення стін
    sotwl = 465/15; // незмінне значення для створення стін
    console.log(sotwh);
    // Розрахунок кількості рядків і стовпців
    let rows = Math.sqrt((roomH / roomW) * ballCount);
    let columns = ballCount / rows;

    // Розмір шарика з урахуванням відстані
    let ballSize = Math.min(
        (roomW - vidst * (Math.floor(columns) - 1)) / Math.floor(columns),
        (roomH - vidst * (Math.floor(rows) - 1)) / Math.floor(rows)
    );

    // Очищення попередніх шариків
    balls.forEach(ball => ball.remove());
    balls = [];

    // Створення шариків
    for (let row = 0; row < Math.floor(rows); row++) {
        for (let col = 0; col < Math.floor(columns); col++) {
            let ball = document.createElement("div");
            ball.className = "ball";
            ball.id = `${row}`+"0"+`${col}`;

            // Розташування шарика
            ball.style.width = `${ballSize}px`;
            ball.style.height = `${ballSize}px`;
            ball.style.left = `${col * (ballSize + vidst)}px`;
            ball.style.top = `${row * (ballSize + vidst)}px`;

            // Початкова температура
            ball.temperature = 10;

            // Обробник наведення миші
            ball.addEventListener("mouseover", () => {
                sensor.innerText = `○ ${Math.round(ball.temperature)}°C`;
            });

            // Додавання до кімнати
            balls.push(ball);
            room.appendChild(ball);
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
        square.thermalConductivity = 1;
        square.addEventListener("mouseover", hoveri12);
            function hoveri12(){
                sensor1.innerText = Math.round(square.totaltook, 2)+"°C";
            }
        console.log("Я НАРодИвся", square.id);
    }
}
function transferHeat() {
    let k_ball = 0.6; // Коефіцієнт теплопровідності для кульок
    let maxTemperature = 30; // Максимальна температура для кульок

    for (let ball of balls) {
        ball.newTemperature = ball.temperature; // Початкова температура
        ball.blockedBalls = {}; // Блокування передачі тепла
        ball.blockedSquares = {};
    }
    heaterPower = hp.value;

    GHF = setInterval(() => {
        let currentTime = Date.now();

        for (let ball of balls) {
            let ballRect = ball.getBoundingClientRect();

            // Тепло від обігрівачів
            // Тепло від обігрівачів
            if(heateroff==false){
            let heaterPowercheck = hp.value;
            if (isNaN(heaterPowercheck)) {
                hp.value = 100;
            }
            if (heaterPowercheck < 0) {
                hp.value = 100;
            }
            if(hp.value == ""){
                hp.value=100;
                errors.push("Value for heater power wasn`t set. Heater power was set to 100 Вт");
                timestamps.push(Date.now());
                console.log(timestamps);
                console.log(errors);
            }
                let heaterPower = parseFloat(hp.value) || 0;
                let heat = heatFromHeater(heater1, ball, heaterPower);
                ball.newTemperature = Math.min(ball.newTemperature + heat, maxTemperature);
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

            // Тепло до стін
            if(blocked==false){
            for (let square of squares) {
                if (!square.id) continue;

                let squareRect = square.getBoundingClientRect();
                let distanceToWall = Math.sqrt(
                    Math.pow(ballRect.x - squareRect.x, 2) +
                    Math.pow(ballRect.y - squareRect.y, 2)
                );

                if (distanceToWall < heatTransferDistance) {
                    if (!ball.blockedSquares[square.id] || currentTime > ball.blockedSquares[square.id]) {
                        let heatTransferAmount = square.thermalConductivity * 1.5 / Math.max(1, distanceToWall/150);
                        let actualtnsferr = Math.min(ball.newTemperature - 10, heatTransferAmount); 
                        if (heatTransferAmount > 0&&ball.newTemperature>10) {
                            ball.newTemperature -= actualtnsferr;
                            square.temperature += actualtnsferr;
                            square.totaltook += actualtnsferr;

                            ball.blockedSquares[square.id] = currentTime + 1800;
                        }
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
    }, ss.value); // Інтервал оновлення
}

function color(obj,temperature){
    //console.log('color obj', obj)
    //console.log('color temperature', temperature)
    
     const redIntensity = Math.floor((temperature-10) / 20 * 255);
     const blueIntensity = 255 - redIntensity;
     //console.log('blueIntensity ', blueIntensity)
     obj.style.backgroundColor = `rgb(${redIntensity}, 0, ${blueIntensity})`;
}
function heatFromHeater(heater, ball, heaterPower) {
    let multiplier = 0.005; 
    let Powah = multiplier * heaterPower;
    let minTemperatureFactor = 0.1;
    let maxDistanceFactor = 10; 
    let maxDistance = maxDistanceFactor * Math.sqrt(heaterPower/5);
    let ballRect = ball.getBoundingClientRect();
    let heaterRect = heater.getBoundingClientRect();
    let distance = Math.sqrt(
        Math.pow(ballRect.x - heaterRect.x, 2) +
        Math.pow(ballRect.y - heaterRect.y, 2)
    );
    if (distance > maxDistance) return 0;
    let heatFactor = 1 - (distance / maxDistance); 
    let temperature = Powah * heatFactor;
    return Math.max(temperature, minTemperatureFactor * Powah);
}
heaterOff.addEventListener("click", turnedoff1);
function turnedoff1(){
    helper1++;
    if (helper1%2==1){
        heaterOff.innerText="Увімкнути обігрівача";
        errors.push("Turned off the heater");
        timestamps.push(Date.now());
        heateroff = true;
        }
    if(helper1%2==0){
        heateroff = false;
        heaterOff.innerText="Вимкнути обігрівача";
        errors.push("Turned on the heater");
        timestamps.push(Date.now());
    }
}
wallsOff.addEventListener("click", turnedoff2);
function turnedoff2(){
    helper2++;
    if (helper2%2==1){
        wallsOff.innerText="Увімкнути тепловтрату стін";
        errors.push("Turned off the heat loss");
        timestamps.push(Date.now());
        blocked = true;
        }
    if(helper2%2==0){
        blocked = false;
        wallsOff.innerText="Вимкнути тепловтрату стін";
        errors.push("Turned on the heat loss");
        timestamps.push(Date.now());
    }
}
bc.addEventListener('input', function(){
    if(forst%2==1){ //stopping the function if value is changed to prevent errors
        forst++;
        clearInterval(GHF);
        starter.innerText="Запустити процес";
        errors.push("The ball count change caused the operation to stop.");
        timestamps.push(Date.now());
        console.log(timestamps);
        console.log(errors);
    }
    createthat(bc.value);
    ballcount.innerText = bc.value + " шариків"
});
hp.addEventListener('input', function(){
    if(forst%2==1){ //stopping the function if value is changed to prevent errors
        forst++;
        clearInterval(GHF);
        starter.innerText="Запустити процес";
        errors.push("The heat power change caused the operation to stop.");
        timestamps.push(Date.now());
        console.log(timestamps);
        console.log(errors);
    }
    heatnumber.innerText = hp.value + " Вт"
});
ss.addEventListener('input', function(){
    if(forst%2==1){ //stopping the function if value is changed to prevent errors
        forst++;
        clearInterval(GHF);
        starter.innerText="Запустити процес";
        errors.push("The simulation speed change caused the operation to stop.");
        timestamps.push(Date.now());
        console.log(timestamps);
        console.log(errors);
    }
    sc.innerText = "Кожні "+ ss.value + " мс"
});