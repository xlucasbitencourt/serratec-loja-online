const produtos = document.getElementById("produtos");
const carregando = document.getElementById("carregando");
const busca = document.getElementById("busca");
const buscar = document.getElementById("buscar");

const fetchProducts = async (search) => {
  // const search = "computador";
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

const renderProducts = async (search) => {
  if (!search) search = "computador";
  console.log(search);
  produtos.innerHTML = "";
  const products = await fetchProducts(search);
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

buscar.addEventListener("click", () => renderProducts(busca.value))

window.onload = async() => {
  console.log(await fetchProducts());
  renderProducts();
};
