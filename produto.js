
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
    <h1 class="titulo">${product.title}</h1>
    <img class="imagem" src="${product.pictures[0].url}" alt="${product.title}">
    <p class="preco">Preço: <span>${product.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</span></p>
    <p>Quantidade disponível: ${product.initial_quantity} unidades!</p>
    <p>Data de criação: ${new Date(product.date_created).toLocaleDateString()}</p>
    <p class="frete">${product.shipping.free_shipping ? "Frete grátis!" : ""}</p>
    <button class="comprar">Comprar</button>
  `;
  produtoDetalhe.appendChild(productElement);
}

window.onload = async () => {
  renderProduct();
}