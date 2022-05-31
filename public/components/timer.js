const minusBreak = document.getElementById("minus-break");
const plusBreak = document.getElementById("plus-break");
const minusSession = document.getElementById("minus-focus");
const plusSession = document.getElementById("plus-focus");

const startTimer = document.getElementById("startTimer");
const breakTimer = document.getElementById("breakTime");
const sessionTimer = document.getElementById("sessionTime");
const timeDisplay = document.getElementById("time-display");
const timeStatus = document.getElementById("time-status");

const alarm = document.getElementById("alarm");
const breakAlarm = document.getElementById("breakAlarm");

let countdownTimer;
let breakTime = 5;
let sessionTime =25;
let play = true;
let session = true;
let counter;


// function to make sure the times are valid times
const checkTime = (time, breakSession) => {
    if(time < 1 && breakSession === true){
        breakTime = 99;
    } else if (time > 99 && breakSession === true){
        breakTime = 1;
    } else if(time < 1 && breakSession === false){
        sessionTime = 99;
    } else if (time > 99 && breakSession === false){
        sessionTime = 1;
    }
    // console.log(`Session: ${sessionTime}`);
    // console.log(`Break: ${breakTime}`);
};

const convertSeconds = (s) => {
    // gets minutes, make sure the num returned isnt a decimal
    let min = Math.floor(s / 60);
    // gets the seconds by getting the remainder
    let sec = s % 60;
    min = min < 10 ? "0" + min:min;
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
}

const stopTimer = (timer) => {
    window.clearInterval(timer);
    timeDisplay.innerHTML = convertSeconds(counter);
}

const timer = () => {
    counter--;
    timeDisplay.innerHTML = convertSeconds(counter);

    if (counter == 0 &&  session === true){
        stopTimer(countdownTimer);

        const breakTimer = () => {
            timeStatus.innerHTML = "Break";
            session = false;
            counter = breakTime * 60;
            countdownTimer = setInterval(timer, 1000)
        }
        //wait 5 seconds before starting break timer
        setTimeout(breakTimer, 5000)
    }else if (counter == 0 &&  session === false){
        stopTimer(countdownTimer);
        timeDisplay.innerHTML = "00:00";
        startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
        session = true;
        counter = sessionTime * 60;
        timeStatus.innerHTML = "Focus";
    }
}



const sessionReset = () => {
    stopTimer(countdownTimer);
    counter = sessionTime * 60;
    checkTime(sessionTime, false);
    sessionTimer.innerHTML = sessionTime;
    timeDisplay.innerHTML = sessionTime + ":00";
    startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
    timeStatus.innerHTML = "Focus";
    play = true;
}

const breakReset = () => {
    stopTimer(countdownTimer);
    checkTime(breakTime, true);
    breakTimer.innerHTML = breakTime;
    timeDisplay.innerHTML = sessionTime + ":00";
    startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
    play = true;
}


minusBreak.addEventListener("click", ()=>{
    breakTime--;
    breakReset();
});

plusBreak.addEventListener("click", ()=>{
    breakTime++;
    breakReset();
});

minusSession.addEventListener("click", ()=>{
    sessionTime--;
    sessionReset();
});

plusSession.addEventListener("click", ()=>{
    sessionTime++;
    sessionReset();
});

startTimer.addEventListener("click", ()=>{
    if(play === true){
        startTimer.innerHTML = "<i class='fa fa-pause' aria-hidden='true'></i>";
        counter = sessionTime * 60;
        countdownTimer = setInterval(timer, 1000);
        play = false;
    }else if(play ===false){
        startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
        play = true;
        stopTimer(countdownTimer);
    }
});
