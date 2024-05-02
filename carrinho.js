const listaCarrinho = document.getElementById("lista-carrinho");
const total = document.getElementById("total");

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
    produto.innerText = item.produto;

    const valor = document.createElement("td");
    valor.innerText = Number(item.valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const quantidade = document.createElement("td");
    quantidade.innerText = item.quantidade;

    const valorTotal = document.createElement("td");
    valorTotal.innerText = (item.quantidade * item.valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const remover = document.createElement("button");
    remover.innerText = "Remover";

    const tr = document.createElement("tr");
    tr.appendChild(produto);
    tr.appendChild(quantidade);
    tr.appendChild(valor);
    tr.appendChild(valorTotal);
    tr.appendChild(remover);

    listaCarrinho.appendChild(tr);
  });
};

window.onload = () => {
  getCarrinho();
};
