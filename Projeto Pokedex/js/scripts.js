// Pegando os elementos que iremos manipular
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('form');
const input = document.querySelector('input');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonAtual = 1;

//Função que irá realizar requisição na API
async function fetchPokemon(pokemon) {
    // Definindo a url de requesição
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    // Realizando a requisição com fetch()
    const response = await fetch(url);
    // Convertendo os dados da requisição para json()
    const data = await response.json();
    // Retornarndo o pokemon pesquisado
    return data;
}

// Função que irá carregar o pokemon no body
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        pokemonAtual = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerText = "Não encontrado :(";
    }
}

// Função submit do formulário
form.addEventListener('submit', (e) => {
    // Impedindo a página de dar o 'refresh
    e.preventDefault();
    // Pegando o valor digitado
    let pokemon = input.value;
    // Passando o valor digitado na função renderPokemon
    renderPokemon(pokemon);
})

// Eventos dos botões btnNext e btnPrev
btnPrev.addEventListener('click', () => {
    // Se o pokemon atual for maior que 1
    if (pokemonAtual > 1) {
        // Decrementa a variavel pokemon atual
        pokemonAtual--;
        // Chama a função renderPokeon com o novo valor de pokemonAtual
        renderPokemon(pokemonAtual);
    }    
})

btnNext.addEventListener('click', () => {
    // Se o pokemon atual for maior que 1
    if (pokemonAtual < 649) {
        // Decrementa a variavel pokemon atual
        pokemonAtual++;
        // Chama a função renderPokeon com o novo valor de pokemonAtual
        renderPokemon(pokemonAtual);
    }    
})


renderPokemon(pokemonAtual);