const musicIcon = document.querySelector(".music-header > span");
var musicPlayer = document.querySelector(".music-tab-container");
var iframe = document.querySelector("iframe");

musicPlayer.addEventListener("click", () => {
    musicPlayer.classList.toggle("active");
});

