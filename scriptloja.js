const body = document.querySelector("body");
const nav = document.querySelector("nav");
const modeToggle = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const sidebarOpen = document.querySelector(".sidebarOpen");
const sidebarClose = document.querySelector(".sidebarClose");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

// toggle dark and light mode
modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  // keep user selected mode even on page refresh or file reopen
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

// toggle search box
searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
});

// toggle sidebar
sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});

body.addEventListener("click", (e) => {
  let clickedElm = e.target;

  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

const ITEMS = [
  {
    id: 1,
    name: 'Produto reciclado: Escovas de dentes',
    price: 3.99,
    image: 'img/Produtos da Loja/produto1.jpg',
    qty: 1 
  },
  {
    id: 2,
    name: 'Produto ecoloógico: Garrafa de água normal',
    price: 2.99,
    image: 'img/Produtos da Loja/produto2.jpg',
    qty: 1 
  },
  {
    id: 3,
    name: 'Produto reciclado: Boligrafos',
    price: 1.99,
    image: 'img/Produtos da Loja/produto4.jpg',
    qty: 1 
  },
  {
    id: 4,
    name: 'Produto reciclado: Escova de cabelo',
    price: 7.99,
    image: 'img/Produtos da Loja/produto7.jpg',
    qty: 1 
    
  },
  {
    id: 5,
    name: 'Produto reciclado: Talheres',
    price: 11.99,
    image: 'img/Produtos da Loja/produto5.jpg',
    qty: 1
  },

  {
    id: 6,
    name: 'Produto ecoloógico: Pincéis',
    price: 9.99,
    image: 'img/Produtos da Loja/produto6.jpg',
    qty: 1 
  },
  {
    id: 7,
    name: 'Produto ecoloógico: Spray para plantas',
    price: 19.99,
    image: 'img/Produtos da Loja/produto3.jpg',
    qty: 1 
  },
  {
    id: 8,
    name: 'Produto ecoloógico: Garrada de água verde',
    price: 4.29,
    image: 'img/Produtos da Loja/produto8.jpg',
    qty: 1 
  },
]

// Open and close cart
const openBtn = document.querySelector(".cart-toggle");
const cart = document.getElementById("sidecart");
const closeBtn = document.getElementById("close_btn");
const backdrop = document.querySelector(".backdrop");
const itemsEl = document.querySelector('.items')
const cartItems = document.querySelector('.cart_items')
const itemsNum = document.getElementById('items_num')
const subtotalPrice = document.getElementById('subtotal_price')
const sidecart = document.getElementById("sidecart");
const verProdutosBtn = document.querySelector("#ver_produtos_btn");


let cart_data = []

openBtn.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

renderItems()
renderCartItems()

function openCart() {
  cart.classList.add("open");
  backdrop.style.display = "block";

  setTimeout(() => {
    backdrop.classList.add("show");
  }, 0);
}
function increaseQty(itemId) {
  cart_data = cart_data.map(item => item.id.toString() === itemId.toString() ? {...item, qty: item.qty + 1} : item
  );

  updateCart();
}


function closeCart() {
  cart.classList.remove("open");
  backdrop.classList.remove("show");

  setTimeout(() => {
    backdrop.style.display = "none";
  }, 500);
}

//Add Items to Cart 
function addItem(idx, itemId) {
  // find same items
  const foundedItem = cart_data.find(item => item.id.toString() === itemId.toString())

  if(foundedItem){
    increaseQty(itemId)
  }else{
    cart_data.push(ITEMS[idx])
  }
  updateCart()
  openCart()
}

// Remove Cart Items
function removeCartItem(itemId){
  cart_data = cart_data.filter((item) => item.id != itemId)

  updateCart()
}


// Adiciona evento de clique no botão "Ver Produtos" para fechar o carrinho
verProdutosBtn.addEventListener("click", function() {
  sidecart.classList.remove("open");
  backdrop.classList.remove("show");
  setTimeout(() => {
    backdrop.style.display = "none";
  }, 500);
});
// Adiciona evento de clique no botão de fechar
closeBtn.addEventListener("click", function() {
  sidecart.classList.remove("open");
  backdrop.classList.remove("show");
});
// Adiciona evento de clique no backdrop para fechar o carrinho
backdrop.addEventListener("click", function() {
  sidecart.classList.remove("open");
  backdrop.classList.remove("show");
});

// Increase Qty 
function increaseQty(itemId) {
  cart_data = cart_data.map(item => item.id.toString() === itemId.toString() ? {...item, qty: item.qty + 1} : item
  )

  updateCart()
}

// Descrease Qty 
function decreaseQty(itemId) {
  cart_data = cart_data.map(item => item.id.toString() === itemId.toString() ? {...item, qty: item.qty > 1 ? item.qty - 1 : item.qty } : item
  )

  updateCart()
}

// Calculate Items Number 
function calcItemsNum() {
  let itemsCount = 0

  cart_data.forEach((item) => (itemsCount += item.qty))

  itemsNum.innerText = itemsCount
} 

// Calculate Subtotal Price
function calcSubtotalPrice() {
  let subtotal = 0;

  cart_data.forEach((item) => (subtotal += item.price * item.qty));

  subtotalPrice.innerText = subtotal.toFixed(2) + " €";

}

// render items
function renderItems() {
  ITEMS.forEach((item, idx) => {
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')
    itemEl.onclick = () => addItem(idx, item.id)
    itemEl.innerHTML = `
      <img src="${item.image}" alt="" />
      <button>Ver Artigo</button>
    `
    itemsEl.appendChild(itemEl)
  })
}
// Display / Render Cart Items
function renderCartItems() {
  // remove everything from cart
  cartItems.innerHTML = ''
  //add new data
  cart_data.forEach(item => {
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart_item')
    cartItem.innerHTML = `
      <div class="remove_item" onclick="removeCartItem(${item.id})">
        <span>&times;</span>
      </div>
      <div class="item_img">
        <img src="${item.image}" alt="" />
      </div>
      <div class="item_details">
        <p>${item.name}</p>
        <strong>${item.price} €</strong>
        <div class="qty">
          <span onclick="decreaseQty(${item.id})">-</span>
          <strong>${item.qty}</strong>
          <span onclick="increaseQty(${item.id})">+</span>
        </div>
      </div>
    `
    cartItems.appendChild(cartItem)
  })
}

function updateCart() {
  // rerender cart items with updated data
  renderCartItems()
  // Update Items Number in Cart
  calcItemsNum()
  // Update Subtotal Price
  calcSubtotalPrice()
}




const searchWrapper = document.querySelector(".search-field");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".bx-search");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// Se o usuário pressionar qualquer tecla e soltar
inputBox.onkeyup = (e) => {
  let userData = e.target.value; // dados digitados pelo usuário
  let emptyArray = [];
  if (userData) {
    icon.onclick = () => {
      webLink = `https://www.google.com/search?q=${userData}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    };
    emptyArray = suggestions.filter((data) => {
      // filtrar os valores do array e os caracteres do usuário em letras minúsculas, retornando apenas as palavras que começam com os caracteres digitados pelo usuário
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passando os dados retornados para dentro da tag <li>
      return (data = `<li>${data}</li>`);
    });
    searchWrapper.classList.add("active"); // mostrar a caixa de sugestões
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      // adicionar o atributo onclick em todas as tags <li>
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); // ocultar a caixa de sugestões
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    webLink = `https://www.google.com/search?q=${selectData}`;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
  };
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}

let suggestions = [
  "Benefícios dos produtos reciclados",
  "Impacto ambiental dos produtos ecológicos",
  "Soluções sustentáveis para o PER",
  "Inovações em produtos reciclados",
  "Reduzindo o consumo com produtos ecológicos",
  "A importância da reciclagem no PER",
  "Alternativas eco-friendly para o consumo",
  "Desafios das alterações climáticas",
  "Adaptação às mudanças climáticas",
  "Combate às emissões de carbono",
  "Promovendo a sustentabilidade com o PER",
  "Economia circular e produtos reciclados",
  "Preservando o meio ambiente com escolhas conscientes",
  "Consciência ambiental e produtos ecológicos",
  "Ação coletiva para enfrentar as alterações climáticas",
  "Escolhas sustentáveis para um futuro melhor",
"Construindo um mundo mais verde com produtos reciclados",
"Consciencialização sobre o impacto do consumo no clima",
"A importância da redução de resíduos no PER",
"Promovendo a economia verde com produtos ecológicos",
"Alternativas sustentáveis para o estilo de vida moderno",
"Incentivando a reciclagem e a reutilização de materiais",
"Aquecimento global: desafios e soluções",
"Desenvolvimento de energias renováveis para combater as alterações climáticas",
"Preservando a biodiversidade através do consumo responsável",
"Envolver a comunidade na adoção de práticas sustentáveis",
"Adoção de embalagens ecológicas e biodegradáveis no PER",
"A educação ambiental como ferramenta para enfrentar as alterações climáticas",
"Transformando resíduos em recursos com a economia circular",
"Construindo um planeta mais resiliente perante as mudanças climáticas",
"Zero desperdício: estratégias para reduzir o lixo no quotidiano",
"Formas de reutilizar materiais para criar produtos eco-friendly",
"Guias de compra para produtos certificados como produtos ecológicos",
"Hábitos diários para reduzir a pegada de carbono",
"Jardinagem sustentável e uso de produtos orgânicos",
"Kits de produtos ecológicos para facilitar a transição sustentável",
"Lixo zero: como adotar um estilo de vida sem desperdício",
"Materiais reciclados e aplicação em produtos sustentáveis",
"Negócios e empreendimentos que promovem a sustentabilidade",
"Oportunidades de voluntariado em projetos ambientais",
"Questões ambientais globais e a importância dos produtos ecológicos",
"Sustentabilidade na moda: opções de roupas e acessórios eco-friendly",
"Tecnologias verdes e sua contribuição para a preservação do planeta",
"Uso consciente da água e produtos que promovem a economia hídrica",
"Vantagens de utilizar produtos ecológicos no lar",
"Benefícios ambientais dos produtos ecológicos",
"Dicas para reduzir o desperdício com produtos reciclados",
"Energias renováveis e sua importância para um futuro sustentável.",
"Como fazer compostagem em casa com resíduos orgânicos",
"Watts e Sustentabilidade: Descubra como tecnologias sustentáveis reduzem o consumo de watts e promovem um estilo de vida ecológico",
];