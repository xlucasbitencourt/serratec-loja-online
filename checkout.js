const valorTotal = document.getElementById("valor-total");

const getCarrinho = () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  valorTotal.innerText = carrinho
    .reduce((acc, item) => {
      acc += item.valor * item.quantidade;
      return acc;
    }, 0)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
};

window.onload = getCarrinho;