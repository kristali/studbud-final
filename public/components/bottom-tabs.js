/*//////////////// start BOTTOM TABS start ////////////////*/

const musicTabIcon = document.querySelector("span.openCloseIcon.music");
const timeTabIcon = document.querySelector("span.openCloseIcon.timer");

var showTabIcon = document.querySelector("#showTab")

var musicPlayer = document.querySelector(".music-tab-container");
var pomodoro = document.querySelector(".timer-container")

//Event Listener: music tab close open icon
musicTabIcon.addEventListener("click", () => {
    console.log("button clicked");
    //change icon to close
    musicTabIcon.innerHTML = '<i class="fa-solid fa-angle-down"></i>'
    //toggle active
    musicPlayer.classList.toggle("active");
});

//Event Listener: timer tab close open icon
timeTabIcon.addEventListener("click", () => {
    console.log("button clicked");
    //change icon to close
    timeTabIcon.innerHTML = '<i class="fa-solid fa-angle-down"></i>'
    //toggle active
    pomodoro.classList.toggle("active");
});

/*//////////////// end BOTTOM TABS end ////////////////*/
