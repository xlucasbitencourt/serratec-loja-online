const produtoDetalhe = document.getElementById("produto-detalhe");
const adicionar = document.getElementById("adicionar");

const getProduct = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const renderProduct = async () => {
  const id = document.URL.split("?")[1];
  const product = await getProduct(id);
  if (product.status === 404) {
    produtoDetalhe.innerHTML = "<h2>Produto não encontrado!</h2>";
    return;
  }

  const codigo = document.getElementById("codigo");
  codigo.innerText = product.id;

  const titulo = document.getElementById("titulo");
  titulo.innerText = product.title;

  const imagem = document.getElementById("imagem");
  imagem.src = product.pictures[0].url;
  imagem.alt = product.title;

  const preco = document.getElementById("preco");
  preco.innerHTML = `Preço: <span>${product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}</span>`;

  const quantidade = document.getElementById("quantidade");
  quantidade.innerText = `Quantidade disponível: ${product.initial_quantity} unidades!`;

  const criacao = document.getElementById("criacao");
  criacao.innerText = `Data de criação: ${new Date(product.date_created).toLocaleDateString()}`;

  const frete = document.getElementById("frete");
  frete.innerText = product.shipping.free_shipping ? "Frete grátis!" : "";
};

window.onload = async () => {
  renderProduct();
};
