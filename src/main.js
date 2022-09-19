import "destyle.css";
import "@material-design-icons/font/filled.css";
import "./style.scss";

const onClickLink = (e) => {
  if (!e.target.matches("a")) return;

  const menu = document.querySelector(".menu__btn--open");
  menu.classList.remove("menu__btn--open");
  menu.dataset.menu = "close";
  document.body.classList.remove("overflow-hidden");
};

const toggleMenu = (e) => {
  const target = e.currentTarget;
  const state = e.currentTarget.dataset.menu;

  if (state === "close") {
    target.dataset.menu = "open";
    target.classList.add("menu__btn--open");
    document.body.classList.add("overflow-hidden");
  } else {
    target.dataset.menu = "close";
    target.classList.remove("menu__btn--open");
    document.body.classList.remove("overflow-hidden");
  }
};

(() => {
  const menuElm = document.querySelector(".menu__btn");
  menuElm.addEventListener("click", toggleMenu);

  const drawerElm = document.querySelector(".menu__drawer");
  drawerElm.addEventListener("click", onClickLink);
})();
