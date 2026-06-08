const button = document.getElementById("confirm");
const amount = document.getElementById("amount");
const inputContainer = document.getElementById("notesInput");
const maxMessageEl = document.getElementById("maxMessage");
const btnPersonalize = document.getElementById("personalize");
const notesGroup = document.getElementById("notesGroup");

let maxValue = 0;
let message = "";

const noteData = [];

fetch("info.json")
  .then((res) => res.json())
  .then((data) => {
    maxValue = data.maxValue;
    message = data.response;

    data.notas.forEach((nota) => {
      const li = document.createElement("li");
      li.classList.add("notesItem");

      const noteState = {
        value: nota.value,
        stock: nota.total,
        count: 0,
      };

      noteData.push(noteState);

      li.innerHTML = `
        <button class="moreLess remove">
          <img src="icons/LucideMinus.svg" style="width:40px">
        </button>

        <span class="notesValue">${nota.value}</span>

        <div class="notesQuant">0</div>

        <button class="moreLess add">
          <img src="icons/LucidePlus.svg" style="width:40px">
        </button>
      `;

      const addBtn = li.querySelector(".add");
      const removeBtn = li.querySelector(".remove");
      const counterEl = li.querySelector(".notesQuant");

      if (!nota.available || nota.total === 0) {
        li.classList.add("unavailable");
        counterEl.style.opacity = "0";
      }

      removeBtn.classList.add("belowZero");

      addBtn.addEventListener("click", () => {
        const limit = Number(amount.value);

        if (!limit) return;

        let currentTotal = 0;

        noteData.forEach((n) => {
          currentTotal += n.value * n.count;
        });

        if (currentTotal + nota.value > limit) {
          return;
        }

        if (noteState.count >= noteState.stock) {
          return;
        }

        noteState.count++;

        counterEl.textContent = noteState.count;
        removeBtn.classList.remove("belowZero");
      });

      removeBtn.addEventListener("click", () => {
        if (noteState.count <= 0) return;

        noteState.count--;

        counterEl.textContent = noteState.count;

        if (noteState.count === 0) {
          removeBtn.classList.add("belowZero");
        }
      });

      notesGroup.appendChild(li);
    });
  });

amount.addEventListener("input", () => {
  const value = Number(amount.value);

  if (amount.value.trim() === "") {
    button.classList.remove("available");
    button.classList.add("unavailable");
    return;
  }

  if (value > maxValue) {
    maxMessageEl.textContent = `${message}${maxValue}€`;

    inputContainer.style.border = "3px solid red";

    inputContainer.classList.remove("input-shake");
    void inputContainer.offsetWidth;
    inputContainer.classList.add("input-shake");

    button.classList.remove("available");
    button.classList.add("unavailable");

    return;
  }

  maxMessageEl.textContent = "";
  inputContainer.style.border = "3px solid #dadce0";

  button.classList.add("available");
  button.classList.remove("unavailable");
});

btnPersonalize.addEventListener("click", () => {
  notesGroup.style.opacity = "1";
  btnPersonalize.style.display = "none";
});

button.addEventListener("click", () => {
  const target = Number(amount.value);

  let totalSelected = 0;

  noteData.forEach((n) => {
    totalSelected += n.value * n.count;
  });

  if (totalSelected !== target) {
    alert(
      `Selecionaste ${totalSelected}€, mas o valor pedido é ${target}€.`
    );
    return;
  }

  alert("Levantamento confirmado!");

  amount.value = "";

  noteData.forEach((n) => {
    n.count = 0;
  });

  document.querySelectorAll(".notesQuant").forEach((el) => {
    el.textContent = "0";
  });

  document.querySelectorAll(".remove").forEach((btn) => {
    btn.classList.add("belowZero");
  });

  notesGroup.style.opacity = "0";
  btnPersonalize.style.display = "block";

  button.classList.remove("available");
  button.classList.add("unavailable");
});