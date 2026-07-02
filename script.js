let pokedexAbierta = false;

const video = document.getElementById('video');
video.onclick = function() {
  video.play();
  video.onclick = null;
  pokedexAbierta = true; // ahora la Pokédex está abierta
};

async function getPokemon(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = await response.json();

    const image = data.sprites.other['official-artwork'].front_default;
    const types = data.types.map(t => t.type.name.toUpperCase()).join(', ');
    const stats = data.stats.map(s => `${s.stat.name.toUpperCase()}: ${s.base_stat}`).join('<br>');

    document.getElementById('pokedex').innerHTML = `
      <img src="${image}" alt="${data.name}" class="img-fluid"><br>
      <strong>NAME:</strong> ${data.name.toUpperCase()}<br>
      <strong>TYPE:</strong> ${types}<br>
      <strong>STATS:</strong><br>${stats}
    `;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    document.getElementById('pokedex').innerHTML = "No se encontró el Pokémon.";
  }
}

const input = document.getElementById('selectPokemon');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

searchBtn.addEventListener('click', () => {
  if (!pokedexAbierta) return; // si está cerrada, no hace nada
  const pokemonName = input.value;
  if (pokemonName) {
    getPokemon(pokemonName);
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (!pokedexAbierta) return; // bloquea Enter si está cerrada
    const pokemonName = input.value;
    if (pokemonName) {
      getPokemon(pokemonName);
    }
  }
});

clearBtn.addEventListener('click', () => {
  document.getElementById('pokedex').innerHTML = "";
  input.value = "";
});
