const btnToggle = document.getElementById("btnToggle");
const ul = document.querySelector("#mainList");
const wrapper = document.querySelector(".wrapper");

btnToggle.addEventListener("click", () => {
  const isExpanded = ul.getAttribute("data-expand") === "true";
  ul.setAttribute("data-expand", !isExpanded);
});

wrapper.addEventListener("click", (e) => {
  // evita conflitos se clicar em outros botões dentro
  if (!e.target.closest("button")) {
    btnToggle.click();
  }
});
