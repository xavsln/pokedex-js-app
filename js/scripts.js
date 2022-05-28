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


// Create a conditional that check the height of each Pokemon and indicate "Wow, that's big" in case it is higher than a certain value
// Define a heigh that triggers the message
let thresholdHeight = 0.5;

// Create a loop that compares all Pokemon height against the thresholdHeight
// If the Pokemon height is higher than the defined thresholdHeight then "- Wow, that's big" message will be added to the name and height of the Pokemon
// Otherwise, only the name and height of the Pokemon will be sent to the DOM
pokemonList.forEach(function(pokemon){
  if (pokemon.height > thresholdHeight) {
    document.write('<p>'+ pokemon.name + ' (heigh: '+ pokemon.height + ' m)' + ' - Wow, that\'s big!</p>');
  } else {
    document.write('<p>'+ pokemon.name + ' (heigh: '+ pokemon.height + ' m)' + '</p>');
  }
});
