const produtos = document.getElementById("produtos");
const carregando = document.getElementById("carregando");

const fetchProducts = async () => {
  const search = "computador";
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

const renderProducts = async () => {
  const products = await fetchProducts();
  products.forEach((product) => {
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
      <button class="comprar"><a href="/produto.html?${product.id}">Ver mais</a> </button>
    `;
    produtos.appendChild(productElement);
  });
  carregando.remove();
};

window.onload = async() => {
  console.log(await fetchProducts());
  renderProducts();
  console.log(document.URL)
};
