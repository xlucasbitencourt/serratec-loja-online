const listaCarrinho = document.getElementById("lista-carrinho");
const total = document.getElementById("total");
const limpar = document.getElementById("limpar");

/**
 * Função que busca os produtos na API do Mercado Livre
 * @param {string} search - O termo de busca
 * @returns {Promise<Array>} - A lista de produtos
 */
const getCarrinho = () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  console.log(carrinho);
  total.innerText = carrinho.reduce((acc, item) => {
    acc += item.valor * item.quantidade;
    return acc;
  }, 0).toLocaleString("pt-BR", {
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
    remover.innerHTML = `<i class="fa-solid fa-trash"></i><span class="id-produto">${item.id}</span>`;

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
  <div>
    <p id="vazio">Seu carrinho está vazio!</p>
  </div>
  `;
  total.innerText = "R$ 0,00";
};

window.onload = () => {
  getCarrinho();
};
