/*//////////////// start TIMER start ////////////////*/

const minusBreak = document.getElementById("minus-break");
const plusBreak = document.getElementById("plus-break");
const minusfocus = document.getElementById("minus-focus");
const plusfocus = document.getElementById("plus-focus");

const startTimer = document.getElementById("startTimer");
const breakTimer = document.getElementById("breakTime");
const focusTimer = document.getElementById("focusTime");
const timeDisplay = document.getElementById("time-display");
const timeStatus = document.getElementById("time-status");

const alarm = document.getElementById("alarm");
const breakAlarm = document.getElementById("breakAlarm");

//set default timer settings according to typical pomodoro method
let countdownTimer;
let breakTime = 5;
let focusTime =25;
let play = true;
let focus = true;
let counter;


//Function: check if times are valid
const checkTime = (time, breakfocus) => {
    if(time < 1 && breakfocus === true){
        breakTime = 99;
    } else if (time > 99 && breakfocus === true){
        breakTime = 1;
    } else if(time < 1 && breakfocus === false){
        focusTime = 99;
    } else if (time > 99 && breakfocus === false){
        focusTime = 1;
    }
};

const convertSeconds = (s) => {
    // Minutes: return not decimal
    let min = Math.floor(s / 60);
    // Seconds: remained minutes divided by 60
    let sec = s % 60;
    min = min < 10 ? "0" + min:min;
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
}

//Stop timer: cancels timer intervals
const stopTimer = (timer) => {
    window.clearInterval(timer);
    timeDisplay.innerHTML = convertSeconds(counter);
}


const timer = () => {
    counter--;
    timeDisplay.innerHTML = convertSeconds(counter);

    if (counter == 0 &&  focus === true){
        stopTimer(countdownTimer);

        //Break timer
        const breakTimer = () => {
            timeStatus.innerHTML = "Break";
            focus = false;
            counter = breakTime * 60;
            countdownTimer = setInterval(timer, 1000)
        }
        //5 sec delay before starting next timer type
        setTimeout(breakTimer, 5000)
    }else if (counter == 0 &&  focus === false){
        stopTimer(countdownTimer);
        timeDisplay.innerHTML = "00:00";
        startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
        focus = true;
        counter = focusTime * 60;
        timeStatus.innerHTML = "Focus";
    }
}

//resets focus length according to user changes made
const focusReset = () => {
    stopTimer(countdownTimer);
    counter = focusTime * 60;
    checkTime(focusTime, false);
    focusTimer.innerHTML = focusTime;
    timeDisplay.innerHTML = focusTime + ":00";
    startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
    timeStatus.innerHTML = "Focus";
    play = true;
}

//resets break length according to user changes made
const breakReset = () => {
    stopTimer(countdownTimer);
    checkTime(breakTime, true);
    breakTimer.innerHTML = breakTime;
    timeDisplay.innerHTML = focusTime + ":00";
    startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
    play = true;
}

//Event listeners: changing focus and break time lengths
minusBreak.addEventListener("click", ()=>{
    breakTime--;
    breakReset();
});

plusBreak.addEventListener("click", ()=>{
    breakTime++;
    breakReset();
});

minusfocus.addEventListener("click", ()=>{
    focusTime--;
    focusReset();
});

plusfocus.addEventListener("click", ()=>{
    focusTime++;
    focusReset();
});

//Event listener: play and pause timer
startTimer.addEventListener("click", ()=>{
    if(play === true){
        startTimer.innerHTML = "<i class='fa fa-pause' aria-hidden='true'></i>";
        counter = focusTime * 60;
        countdownTimer = setInterval(timer, 1000);
        play = false;
    }else if(play ===false){
        startTimer.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
        play = true;
        stopTimer(countdownTimer);
    }
});

/*//////////////// end TIMER end ////////////////*/
