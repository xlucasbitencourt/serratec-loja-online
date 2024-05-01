
const produtoDetalhe = document.getElementById("produto-detalhe");

const getProduct = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const renderProduct = async () => {
  const id = document.URL.split("?")[1];
  const product = await getProduct(id);
  const productElement = document.createElement("div");
  productElement.className = "produto";
  productElement.innerHTML = `
    <h3 class="titulo">${product.title}</h3>
    <img class="imagem" src="${product.thumbnail}" alt="${product.title}">
    <p class="preco">Preço: <span>${product.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</span></p>
    <p class="frete">${product.shipping.free_shipping ? "Frete grátis!" : ""}</p>
    <button class="comprar">Comprar</button>
  `;
  produtoDetalhe.appendChild(productElement);
}

window.onload = async () => {
  renderProduct();
}