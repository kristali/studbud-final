//------------- MODAL POP-UP FORMS START -------------//
const modal = document.getElementsByName(".modal");
const btns = document.querySelectorAll("[data-target]");
const close_btns = document.querySelectorAll(".close-modals");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.add("active");
    overlay.classList.add("active");
  });
});

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.remove("active");
    overlay.classList.remove("active");
  });
});
//------------- end MODAL POP-UP FORMS end -------------//
