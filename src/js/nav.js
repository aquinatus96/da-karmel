import _ from "lodash";

const nav = document.querySelector(".nav");

function scrollClassChange() {
  const menu = document.querySelector(".nav");
  const menuMobile = document.querySelector(".nav-mobile");
  const menuHeight = menu.getBoundingClientRect().height;
  let scrolledHeight = window.scrollY;

  if (
    scrolledHeight > menuHeight + 250 &&
    document.documentElement.clientWidth >= 600
  ) {
    menu.classList.add("nav--scrolled");
  } else if (scrolledHeight === 0) {
    menu.classList.remove("nav--scrolled");
  }

  console.log(scrolledHeight);
  console.log(menuMobile.getBoundingClientRect());

  if (document.documentElement.clientWidth <= 599) {
    if (
      window.innerHeight + window.scrollY + 150 >=
      document.body.offsetHeight
    ) {
      menu.style.transform = "translateY(100%)";
    } else {
      menu.style.transform = "translateY(0)";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => scrollClassChange());
window.addEventListener("scroll", _.throttle(scrollClassChange, 200));
window.addEventListener("resize", _.throttle(scrollClassChange, 200));

function getClassActiveOnClick(e) {
  const navItems = [...document.querySelectorAll(".nav-mobile__item")];
  const item = e.target.closest(".nav-mobile__item");

  if (item) {
    [...document.querySelectorAll(".nav-mobile__link")].forEach(link =>
      e.preventDefault()
    );

    navItems.forEach(navItem =>
      navItem.classList.remove("nav-mobile__item--active")
    );

    item.classList.toggle("nav-mobile__item--active");

    const newUrl = item.children[0].getAttribute("href");

    window.location.href = newUrl;
  }
}

const navMobile = document.querySelector(".nav-mobile");
navMobile.addEventListener("click", e => getClassActiveOnClick(e));
navMobile.addEventListener("touchend", e => getClassActiveOnClick(e));
