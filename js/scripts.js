// Create a new Array of Pokemon
let pokemonList = [
  {
    name: 'Bulbasaur',
    types: ['grass', 'poison'],
    height: 0.7
  },

  {
    name: 'Charmander',
    types: ['fire'],
    height: 0.6
  },

  {
    name: 'Squirtle',
    types: ['water'],
    height: 0.5
  },

  {
    name: 'Caterpie',
    types: ['bug'],
    height: 0.3
  }
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write('<p>'+ pokemonList[i].name + ' (heigh: '+ pokemonList[i].height + ' m)' + '</p>');
}
