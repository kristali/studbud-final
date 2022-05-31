const musicTabIcon = document.querySelector("span.openCloseIcon.music");
const timeTabIcon = document.querySelector("span.openCloseIcon.timer");

var showTabIcon = document.querySelector("#showTab")

var musicPlayer = document.querySelector(".music-tab-container");
var pomodoro = document.querySelector(".timer-container")

musicTabIcon.addEventListener("click", () => {
    console.log("button clicked");
    musicTabIcon.innerHTML = '<i class="fa-solid fa-angle-down"></i>'
    musicPlayer.classList.toggle("active");
});

timeTabIcon.addEventListener("click", () => {
    console.log("button clicked");
    timeTabIcon.innerHTML = '<i class="fa-solid fa-angle-down"></i>'
    pomodoro.classList.toggle("active");
});