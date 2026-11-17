const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
const logo = document.querySelector(".logo");
const mobile = window.matchMedia("(max-width: 820px)");
const compact = window.matchMedia("(max-width: 520px)");
let opener = null;

function setMenu(open, restoreFocus = false) {
  menu.classList.toggle("active", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menuButton.textContent = open ? "×" : "☰";
  if (compact.matches) logo.setAttribute("aria-expanded", String(open));
  if (restoreFocus && opener) opener.focus();
}
function toggleMenu(trigger) {
  opener = trigger;
  setMenu(!menu.classList.contains("active"));
}
menuButton.addEventListener("click", () => toggleMenu(menuButton));
logo.addEventListener("click", (event) => {
  if (compact.matches) {
    event.preventDefault();
    toggleMenu(logo);
  }
});
logo.addEventListener("keydown", (event) => {
  if (compact.matches && event.key === " ") {
    event.preventDefault();
    toggleMenu(logo);
  }
});
menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", event => {
  if (!event.target.closest(".nav")) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.classList.contains("active")) setMenu(false, true);
});
document.addEventListener("focusin", event => {
  if (!event.target.closest(".nav")) setMenu(false);
});
function syncNavigation() {
  setMenu(false);
  if (compact.matches) {
    logo.setAttribute("role", "button");
    logo.setAttribute("aria-controls", "menu");
    logo.setAttribute("aria-expanded", "false");
    logo.setAttribute("aria-label", "Menu de navegação de João da Silva");
  } else {
    ["role", "aria-controls", "aria-expanded"].forEach(attr => logo.removeAttribute(attr));
    logo.setAttribute("aria-label", "João da Silva Personal Trainer");
  }
}
mobile.addEventListener("change", syncNavigation);
compact.addEventListener("change", syncNavigation);
syncNavigation();

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const currentItemIsActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
    });

    if (!currentItemIsActive) {
      item.classList.add("active");
    }
  });
});

const animatedElements = document.querySelectorAll(
  ".benefit-card, .program-card, .testimonial-card, .about-image-wrapper, .about-content, .contact-box"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

animatedElements.forEach((element) => {
  observer.observe(element);
});