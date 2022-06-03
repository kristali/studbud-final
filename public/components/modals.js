/*//////////////// start MODALS start ////////////////*/

const modal = document.getElementsByName(".modal");
const btns = document.querySelectorAll("[data-target]");
const close_btns = document.querySelectorAll(".close-modals");
const overlay = document.getElementById("overlay");

//Open pop up modal according to target 
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.add("active");
    overlay.classList.add("active");
  });
});

//Close pop up modal according to target 
close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.remove("active");
    overlay.classList.remove("active");
  });
});

/*//////////////// end MODALS end ////////////////*/
