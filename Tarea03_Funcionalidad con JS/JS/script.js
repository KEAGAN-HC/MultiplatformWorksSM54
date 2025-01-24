document.addEventListener('DOMContentLoaded', () => {
    const pokemonListContainer = document.getElementById('pokemon-list');
    const selectedCardContainer = document.getElementById('selected-card');
  
    async function fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        renderPokemonList(data.results);
      } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
      }
    }
  
    function renderPokemonList(pokemonArray) {
      pokemonListContainer.innerHTML = '';
      pokemonArray.forEach((pokemon, index) => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png" alt="${pokemon.name}">
          <h3>${pokemon.name}</h3>
        `;
        pokemonCard.addEventListener('click', () => selectPokemon(pokemon, index + 1));
        pokemonListContainer.appendChild(pokemonCard);
      });
    }
  
    function selectPokemon(pokemon, id) {
      const pokemonCard = {
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        description: 'Este es un Pokémon de ejemplo. Descripción no disponible.',
      };
      selectedCardContainer.innerHTML = `
        <img src="${pokemonCard.image}" alt="${pokemonCard.name}">
        <h3>${pokemonCard.name}</h3>
        <p>${pokemonCard.description}</p>
      `;
      localStorage.setItem('selectedPokemon', JSON.stringify(pokemonCard));
    }
  
    function loadSelectedCard() {
      const savedCard = JSON.parse(localStorage.getItem('selectedPokemon'));
      if (savedCard) {
        selectedCardContainer.innerHTML = `
          <img src="${savedCard.image}" alt="${savedCard.name}">
          <h3>${savedCard.name}</h3>
          <p>${savedCard.description}</p>
        `;
      }
    }
  
    fetchPokemon();
    loadSelectedCard();
  });
  