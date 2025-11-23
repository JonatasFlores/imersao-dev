
// Seleciona os elementos do HTML com os quais vamos interagir
let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("#input-busca");
let dados = [];

// Função que busca os dados no arquivo data.json e os armazena na variável 'dados'
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        showCards(dados); // Exibe todos os cards na primeira carga
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

// Função que filtra os dados com base no termo pesquisado e os exibe
function iniciarBusca() {
    // Função auxiliar para remover acentos de uma string
    const removerAcentos = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Pega o valor do input, remove acentos e converte para minúsculas
    const termoBusca = removerAcentos(inputBusca.value.toLowerCase());

    // Filtra o array 'dados'
    const resultados = dados.filter(dado => {
        // Normaliza o título e a descrição para a busca
        const tituloNormalizado = removerAcentos(dado.title.toLowerCase());
        const descricaoNormalizada = removerAcentos(dado.description.toLowerCase());
        // Verifica se o título ou a descrição normalizados incluem o termo de busca
        return tituloNormalizado.includes(termoBusca) || descricaoNormalizada.includes(termoBusca);
    });

    showCards(resultados); // Exibe os cards filtrados
}

// Função que renderiza os cards na tela
function showCards(dadosParaExibir) {
    cardContainer.innerHTML = ""; // Limpa o container de cards antes de adicionar novos
    for (let dado of dadosParaExibir){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
         <h2>${dado.title}</h2>
         <p>${dado.description}</p>
        `
        cardContainer.appendChild(article);
    }
}

// Chama a função para carregar os dados assim que o script é executado
carregarDados();