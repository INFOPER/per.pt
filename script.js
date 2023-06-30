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



var slideIndex = 0;
showSlides(slideIndex);

var slideInterval = setInterval(function() {
  plusSlides(1);
}, 5000); // Muda de slide a cada 5 segundos

function plusSlides(n) {
  clearInterval(slideInterval);
  showSlides(slideIndex += n);
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000); // Muda de slide a cada 5 segundos
}

function currentSlide(n) {
  clearInterval(slideInterval);
  showSlides(slideIndex = n);
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000); // Muda de slide a cada 5 segundos
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length - 1) {slideIndex = 0}
  if (n < 0) {slideIndex = slides.length - 1}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";
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





