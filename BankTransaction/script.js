fetch("info.json")
  .then((res) => res.json())
  .then((data) => {
    const tabela = document.querySelector(".mainTable");

    data.transactions.forEach((transaction) => {
      const tr = document.createElement("tr");
      tr.classList.add("tableItem");

      const isNegative = transaction.value < 0;
      var description = "";

      if (isNegative) {
        description = "LEV.Numerário";
      } else {
        description = "ENT.Numerário";
      }

      tr.innerHTML = `
        <td>${transaction.date}</td>
        <td style="opacity: 0.7">${description}</td>
        <td class="${isNegative ? "negative" : "positive"}">
        ${transaction.value}&nbsp;€
        </td>
      `;
      tabela.appendChild(tr);
    });

    const tfoot = document.querySelector(".footer-fixed");

    tfoot.innerHTML = `
    <tr>
      <td colspan="2"></td>
      <td class="saldo">
        <span class="label">SALDO CONTABILÍSTICO&nbsp&nbsp&nbsp</span>
        <span class="value">${data.saldoContabilistico}&nbsp;€</span>
      </td>
    </tr>
    <tr>
      <td colspan="2"></td>
      <td class="saldo">
        <span class="label">SALDO AUTORIZADO&nbsp&nbsp&nbsp</span>
        <span class="value">${data.saldoAutorizado}&nbsp;€</span>
      </td>
    </tr>
    <tr>
      <td colspan="2"></td>
      <td class="saldo">
        <span class="label">SALDO DISPONÍVEL&nbsp&nbsp&nbsp</span>
        <span class="value">${data.saldoDisponivel}&nbsp;€</span>
      </td>
    </tr>
`;
  });

// fetch("info.json")
//   .then((res) => res.json())
//   .then((data) => {
//     let total = 0;
//     data.transactions.forEach((transaction) => {
//       total += transaction.value;
//     });
//     console.log(total)
//   });
