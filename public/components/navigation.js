/*//////////////// start NAVIGATION start ////////////////*/

const menuIcon = document.querySelector(".menu-icon");
const mobileNav = document.querySelector(".nav-items");

//Event Listener: menu bars icon, when clicked toggles mobile nav
menuIcon.addEventListener("click", function () {
    //Toggles drop down mobile nav when pressed
    mobileNav.classList.toggle("active");
});

/*//////////////// end NAVIGATION end ////////////////*/
