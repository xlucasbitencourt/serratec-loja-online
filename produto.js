const produtoDetalhe = document.getElementById("produto-detalhe");

const getProduct = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const renderProduct = async () => {
  const id = document.URL.split("?")[1];
  const product = await getProduct(id);
  produtoDetalhe.innerHTML = `
    <h2 class="titulo">${product.title}</h2>
    <img class="imagem" src="${product.pictures[0].url}" alt="${product.title}">
    <div>
      <p class="preco">Preço: <span>${product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}</span></p>
      <p>Quantidade disponível: ${product.initial_quantity} unidades!</p>
    </div>
    <div>
      <p>Data de criação: ${new Date(product.date_created).toLocaleDateString()}</p>
      <p class="frete">${product.shipping.free_shipping ? "Frete grátis!" : ""}</p>
    </div>
    <button class="comprar">Comprar</button>
  `;
  document.body.appendChild(produtoDetalhe);
};

window.onload = async () => {
  renderProduct();
};
