let maxValue = 0;
let message = "";
let maxMessageEl;

fetch("info.json")
  .then((res) => res.json())
  .then((data) => {
    const lista = document.querySelector(".notesGroup");
    maxValue = data.maxValue;
    message = data.response;
    data.notas.forEach((notas) => {
      const li = document.createElement("li");
      li.classList.add("notesItem");

      let count = 0;
      let available = notas.available;

      li.innerHTML = `
        
        <button class="moreLess remove">
          <img src="icons/LucideMinus.svg" style="width:40px; weight:700"/>
        </button>

        <span class="notesValue">${notas.value}</span>

        <div class="notesQuant">${count}</div>

        <button class="moreLess add">
          <img src="icons/LucidePlus.svg" style="width:40px"/>
        </button>
        
      `;

      const counterEl = li.querySelector(".notesQuant");
      const addBtn = li.querySelector(".add");
      const removeBtn = li.querySelector(".remove");

      if (available === false) {
        li.classList.add("unavailable");
        counterEl.style.opacity = "0";
      }
      if (count === 0 && available === true) {
        removeBtn.classList.add("belowZero");
      }

      addBtn.addEventListener("click", () => {
        const limit = Number(amount.value);
        const value = Number(notas.value);

        let currentTotal = 0;

        document.querySelectorAll(".notesItem").forEach((item) => {
          const val = Number(item.querySelector("span").textContent);
          const countEl = Number(item.querySelector(".notesQuant").textContent);

          currentTotal += val * countEl;
        });

        if (currentTotal + value > limit) {
          return;
        }

        count++;
        counterEl.textContent = count;
        removeBtn.classList.remove("belowZero");
      });

      removeBtn.addEventListener("click", () => {
        if (count > 0) {
          count--;
          counterEl.textContent = count;
        }
        if (count === 0) {
          removeBtn.classList.add("belowZero");
        }
      });

      lista.appendChild(li);
    });
  });

var button = document.getElementById("confirm");
var amount = document.getElementById("amount");
var input = document.getElementById("notesInput");
maxMessageEl = document.getElementById("maxMessage");

input.addEventListener("input", function () {
  if (amount.value.trim() === "") {
    button.classList.add("unavailable");
    button.classList.remove("available");
  } else if (Number(amount.value) > maxValue) {
    maxMessageEl.textContent = message + maxValue + "€";
    input.style.border = "3px solid red";

    input.classList.remove("input-shake");
    void input.offsetWidth;
    input.classList.add("input-shake");

    button.classList.add("unavailable");
    button.classList.remove("available");
  } else {
    maxMessageEl.textContent = "";
    input.style.border = "3px solid #dadce0";
    input.style.backgroundColor = "transparent";
    button.classList.add("available");
    button.classList.remove("unavailable");
  }
});

button.addEventListener("click", function () {
  amount.value = "";
  document.querySelectorAll(".notesQuant").forEach((el) => {
    el.textContent = "0";
  });
  button.classList.add("unavailable");
  button.classList.remove("available");
});

const btnPersonalize = document.getElementById("personalize");

btnPersonalize.addEventListener("click", function () {
  var notesGroup = document.getElementById("notesGroup");

  if (notesGroup.style.opacity == 0) {
    notesGroup.style.opacity = 100;
    btnPersonalize.style.display = "none";
  } else {
    notesGroup.style.opacity = 0;
  }
});
