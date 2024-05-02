// carregando os elementos do HTML
const produtos = document.getElementById("produtos");
const carregando = document.getElementById("carregando");
const busca = document.getElementById("busca");
const buscar = document.getElementById("buscar");
const quantidadeCarrinho = document.getElementById("quantidade-carrinho");

/**
 * Função que busca os produtos na API do Mercado Livre
 * @param {string} search - O termo de busca
 * @returns {Promise<Array>} - A lista de produtos
 */
const fetchProducts = async (search) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

/**
 * Função que renderiza os produtos na tela
 * @param {string} search - O termo de busca
 * @returns {void}
 */
const renderProducts = async (search) => {
  carregando.style.display = "block";
  if (!search) search = "computador";
  produtos.innerHTML = "";
  const products = await fetchProducts(search);
  if (products.length === 0) {
    produtos.innerHTML = `<p id="nao-encontrado">Nenhum produto encontrado!</p>`;
    carregando.style.display = "none";
    return;
  }
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
      <button class="comprar"><a href="./produto.html?${
        product.id
      }">Ver mais</a> </button>
    `;
    produtos.appendChild(productElement);
  });
  carregando.style.display = "none";
};

const getCarrinho = () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  quantidadeCarrinho.innerText = carrinho.length;
};

// Evento de clique no botão de busca
buscar.addEventListener("click", () => renderProducts(busca.value));

// Evento de busca ao iniciar a página
window.onload = async () => {
  renderProducts();
  getCarrinho();
};
