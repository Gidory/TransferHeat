createthat(600); // by default
starter.addEventListener("click", starstop); //start of the simulation function
function starstop(){
    forst++;
    if (forst%2==1){
        transferHeat();
        setTimeout(function(){
            tlos++;
        }, 5000);
        starter.innerText="Зупинити процес";
        errors.push("The process was restarted/started");
        timestamps.push(Date.now());
        console.log(timestamps);
        console.log(errors);
        
        }
    if(forst%2==0){
        clearInterval(GHF);
        starter.innerText="Запустити процес";
        errors.push("The process was stopped");
        timestamps.push(Date.now());
        console.log(timestamps);
        console.log(errors);
    }
    }
hp.addEventListener('click', startthis); //start checking the values 
function startthis(){
if (limiter == 0) {
setInterval(constiintch, 1);
limiter++;
}
if(forst%2==1){ //stopping the function if value is changed to prevent errors
    forst++;
    clearInterval(GHF);
    starter.innerText="Запустити процес";
    errors.push("The heater power change caused the operation to stop.");
    timestamps.push(Date.now());
    console.log(timestamps);
    console.log(errors);
}
}
bc.addEventListener('click', stopthis); //start checking the values 
function stopthis(){
if(forst%2==1){ //stopping the function if value is changed to prevent errors
    forst++;
    clearInterval(GHF);
    starter.innerText="Запустити процес";
    errors.push("The ball count change caused the operation to stop.");
    timestamps.push(Date.now());
    console.log(timestamps);
    console.log(errors);
}
}
function constiintch(){  //checking hp value for any unpredicted values
    if(hp.value>5000){
        errors.push("You cant set heater power over 5000Вт");
        hp.value=100;
        console.log(errors);
        timestamps.push(Date.now());
        console.log(timestamps);
    }
    if(isNaN(hp.value)||hp.value<0){
        errors.push("Wrong value for heater power");
        timestamps.push(Date.now());
        console.log(timestamps);
        hp.value=100;
        console.log(errors);
    }
}
openthelog.addEventListener("click", logopened); //open the log
function logopened(){
        infop.style.display="none";
        room.style.display="none";
        errorlog.style.display="block";
        if (forst%2==1){
            starstop();
        }
        let amounttodelete=errors.length-6;
        if(errors.length>6){
            for(let i = 0; i < amounttodelete; i++){
            errors.shift();
            timestamps.shift();
            }
        }
        let error;
        for(let i = 0; i < errors.length; i++){
            error = document.createElement("div");
            error.className = "error";
            error.id = "di" + i;
            error.className = "dis";
            error.dataset.index = i;
            logger.appendChild(error);
            const now = new Date();
            const difference = Math.floor((now - timestamps[i]) / 1000); // Різниця в секундах
            if(difference<60){
                error.innerText = "* " + errors[i]+"; "+difference+" secs"+" ago";
            }else if(difference>60){
                error.innerText = "* " + errors[i]+"; "+Math.round(difference/60, 2)+" mins"+" ago";
            } else if((difference/60)>60){
                error.innerText = "* " + errors[i]+"; "+Math.round((difference/60)/60, 2)+" hs"+" ago";
            }
            console.log(difference);
            returntozero.addEventListener("click", GETOUT);
                function GETOUT(){
                    for(let i = 0; i < errors.length; i++){
                        switch(i){
                            case 0:
                                let di0=document.getElementById('di0');
                                if(di0){
                                di0.remove();
                                }
                            break;
                            case 1:
                                let di1=document.getElementById('di1');
                                if (di1){
                                di1.remove();
                                }
                            break
                            case 2:
                                let di2=document.getElementById('di2'); 
                                if (di2){
                                    di2.remove();
                                    }
                            break
                            case 3:
                                let di3=document.getElementById('di3'); 
                                if (di3){
                                    di3.remove();
                                    }
                            break;
                            case 4:
                                let di4=document.getElementById('di4');
                                if (di4){
                                    di4.remove();
                                    }
                            break;
                            case 5:
                                let di5=document.getElementById('di5'); 
                                if (di5){
                                    di5.remove();
                                    }
                            break;
                            case 6:
                                let di6=document.getElementById('di6'); 
                                if (di6){
                                    di6.remove();
                                    }
                            break;
                            case 7:
                                let di7=document.getElementById('di7');
                                if (di7){
                                    di7.remove();
                                    }
                            break;
                            case 8:
                                let di8=document.getElementById('di8'); 
                                if (di8){
                                    di8.remove();
                                    }
                            break;
                            case 9:
                                let di9=document.getElementById('di9');
                                if (di9){
                                    di9.remove();
                                    }
                            break;
                        }
                    }
                    
                }
        }
        
}
returntozero.addEventListener("click", RETURNTOZERO); //close the logs or setting of the simulation
returntozero1.addEventListener("click", RETURNTOZERO); //the same
function RETURNTOZERO(){
        infop.style.display="flex";
        room.style.display="block";
        errorlog.style.display="none";
        toolbox.style.display = "none";
        
}
tb.addEventListener("click", function(){ //open the setting
    toolbox.style.display="flex";
    infop.style.display="none";
    wallsOff.style.display="block";
    heaterOff.style.display="block";
    cont06.style.display="block";
    nextpg.style.display="block";
    cont07.style.display="none";
});