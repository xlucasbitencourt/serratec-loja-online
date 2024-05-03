const produtoDetalhe = document.getElementById("produto-detalhe");
const adicionar = document.getElementById("adicionar");
const quantidadeCarrinho = document.getElementById("quantidade-carrinho");

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

  const valor = document.getElementById("valor");
  valor.innerText = product.price;

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

const adicionarCarrinho = () => {
  let exists = false;
  const id = document.getElementById("codigo").innerText;
  const produto = document.getElementById("titulo").innerText;
  const valor = document.getElementById("valor").innerText;
  const quantidade = 1;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.forEach((item) => {
    if (item.id === id) {
      item.quantidade += quantidade;
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
      exists = true;
      return;
    }
  });
  if (exists) return;
  carrinho.push({ id, produto, valor, quantidade });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  getCarrinho();
  alert("Produto adicionado ao carrinho!");
};

adicionar.onclick = adicionarCarrinho;

const getCarrinho = () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  quantidadeCarrinho.innerText = carrinho.length;
};

window.onload = async () => {
  renderProduct();
  getCarrinho();
};
