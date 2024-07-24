document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const addClick = document.querySelector("#add-click");
  setTimeout(() => {
    addClick.style.opacity = 1;
  }, 1000);

  const textAdd = document.querySelector("#text-add");
  textAdd.addEventListener("click", () => {
    alert("тест всплывашки");
  });

  const closeAdd = document.querySelector("#close-add");
  closeAdd.addEventListener("click", () => {
    addClick.remove();
  });

  const changer = document.querySelectorAll(".changer");

  changer.forEach((element) => {
    let swiper = 0;
    element.addEventListener("click", function () {
      const cursor = element.querySelector(".cursor");
      const outer = element.parentNode;
      const contents = outer.querySelector(".inner .contents");
      if (swiper == 0) {
        cursor.style.transform = "rotate(180deg)";
        element.style.left = "0";
        contents.style.left = "-100%";
        swiper = 1;
        console.log(swiper);
      } else {
        cursor.style.transform = "rotate(0deg)";
        element.style.left = "100%";
        contents.style.left = "0%";
        swiper = 0;
        console.log(swiper);
      }
    });
  });

  const toogle = document.querySelectorAll(".change-theme-btn");
  const changeTheme = document.querySelector(".change-theme");
  const contents = document.querySelectorAll(".content-tab");

  function hideContent(cont) {
    for (let i = cont; i < contents.length; i++) {
      contents[i].classList.remove("show");
      contents[i].classList.add("hidden");
      toogle[i].classList.add("passive-btn");
      setTimeout(() => {
        contents[i].classList.remove("fadein");
        contents[i].classList.add("fadeout");
      }, 50);
    }
  }

  function showContent(cont) {
    if (contents[cont].classList.contains("hidden")) {
      contents[cont].classList.remove("hidden");
      contents[cont].classList.add("show");
      toogle[cont].classList.remove("passive-btn");
      toogle[cont].classList.add("active-btn");
      setTimeout(() => {
        contents[cont].classList.remove("fadeout");
        contents[cont].classList.add("fadein");
      }, 50);
    }
  }

  hideContent(1);

  changeTheme.addEventListener("click", (event) => {
    let target = event.target;
    console.log(target);
    if (target && target.classList.contains("change-theme-btn")) {
      for (let i = 0; i < toogle.length; i++) {
        if (target == toogle[i]) {
          console.log(toogle[i]);
          hideContent(0);
          showContent(i);
          break;
        }
      }
    }
  });
});
