const dialog = document.getElementById("dialog");
const button = document.getElementById("button-dialog");

var isOpen = false;

button.addEventListener("click", () => {
  if (isOpen) {
    dialog.close();
    isOpen = false;
  } else {
    dialog.showModal();
    isOpen = true;
  }
});

const langButtons = document.querySelectorAll(".lang-buttons button");
let selectedLang = "";
const idioma = document.getElementById("idioma");

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    langButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    selectedLang = btn.querySelector("span").textContent;

    idioma.textContent = selectedLang;

    console.log(selectedLang);
  });
});

const continueButton = document.querySelector(".continue");
const cancelButton = document.querySelector(".cancel");

continueButton.addEventListener("click", () => {
  dialog.close();
  isOpen = false;
});

cancelButton.addEventListener("click", () => {
  dialog.close();
  isOpen = false;
});
