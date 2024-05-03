const listaCarrinho = document.getElementById("lista-carrinho");
const total = document.getElementById("total");
const limpar = document.getElementById("limpar");
const finalizar = document.getElementById("finalizar");

/**
 * Função que busca os produtos na API do Mercado Livre
 * @param {string} search - O termo de busca
 * @returns {Promise<Array>} - A lista de produtos
 */
const getCarrinho = () => {
  listaCarrinho.innerHTML = "";
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `
    <tr>
      <td colspan="5" id="vazio">Seu carrinho está vazio!</td>
    </tr>
    `;
    total.innerText = "R$ 0,00";
    finalizar.disabled = true;
    return;
  }
  total.innerText = carrinho
    .reduce((acc, item) => {
      acc += item.valor * item.quantidade;
      return acc;
    }, 0)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  carrinho.map((item) => {
    const produto = document.createElement("td");
    produto.classList.add("item-produto");
    produto.innerText = item.produto;

    const valor = document.createElement("td");
    valor.classList.add("right");
    valor.innerText = Number(item.valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const quantidade = document.createElement("td");
    quantidade.classList.add("center");
    quantidade.innerText = item.quantidade;

    const valorTotal = document.createElement("td");
    valorTotal.classList.add("right");
    valorTotal.innerText = (item.quantidade * item.valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const remover = document.createElement("td");
    remover.classList.add("center");
    remover.classList.add("remover");
    remover.addEventListener("click", (e) => {
      const id = e.target.previousElementSibling.innerText;
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const newCarrinho = carrinho.filter((item) => item.id !== id);
      localStorage.setItem("carrinho", JSON.stringify(newCarrinho));
      getCarrinho();
    });
    remover.innerHTML = `<span class="id-produto">${item.id}</span><i class="fa-solid fa-trash"></i>`;

    const tr = document.createElement("tr");
    tr.appendChild(produto);
    tr.appendChild(quantidade);
    tr.appendChild(valor);
    tr.appendChild(valorTotal);
    tr.appendChild(remover);

    listaCarrinho.appendChild(tr);
  });
};

/**
 * Função que limpa o carrinho
 */
limpar.onclick = () => {
  localStorage.removeItem("carrinho");
  listaCarrinho.innerHTML = `
  <tr>
    <td colspan="5" id="vazio">Seu carrinho está vazio!</td>
  </tr>
  `;
  total.innerText = "R$ 0,00";
  finalizar.disabled = true;
};

finalizar.onclick = () => {
  window.location.href = "./checkout.html";
}

window.onload = () => {
  getCarrinho();
};
