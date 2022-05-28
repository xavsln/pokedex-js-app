// Wrap our pokemonList variable in an IIFE
let pokemonRepository = (function () {
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

  // When called getAll will return the all list of Pokemon
  function getAll(pokemon){
    return pokemonList;
  }

  // When called, will add a Pokemon Object to the Pokemon list
  function add(pokemon){
    pokemonList.push(pokemon);
    alert('New pokemon successfully added');
  }

  // When called, this function will check that the entered value is an Object
  function addv(pokemon){
    // Check entered pokemon is an Object
    if (typeof(pokemon)==='object') {
      return add(pokemon);
    } else {
      alert('Pokemon not added, entered data shall be an Object');
    }
  };

  // When called this function will filter the pokemonList to search for a match
  function filterPokemon(searchedPokemonName){
    // let searchedPokemonName = 'Squirtle';
    let filtered = pokemonList.filter(pokemon => pokemon.name.toLowerCase() === searchedPokemonName);

    if (filtered.length > 0) {
      alert("There is a match!");
      console.log(filtered);
    } else {
      alert('No match found!')
    }
  }

  // pokemonRepository function will return either getAll, add etc... and then trigger the appropriate function
  return {
    getAll: getAll, // if pokemonRepository.getAll() is selected then this will trigger the getAll(pokemon) function
    add: add, // if pokemonRepository.add() is selected then this will trigger the add(pokemon) function
    addv: addv, // if pokemonRepository.add() is selected then this will trigger the addv(pokemon) function
    filterPokemon:filterPokemon
  }

})();

// console.log(pokemonRepository.addv('test'));

console.log(pokemonRepository.addv({
  name: 'test',
  types: ['test'],
  height: 1.1
}));

// console.log(pokemonRepository.addv('test'));

console.log(pokemonRepository.getAll());

// Create a conditional that check the height of each Pokemon and indicate "Wow, that's big" in case it is higher than a certain value
// Define a heigh that triggers the message
let thresholdHeight = 0.5;

// Create a loop that compares all Pokemon height against the thresholdHeight
// If the Pokemon height is higher than the defined thresholdHeight then "- Wow, that's big" message will be added to the name and height of the Pokemon
// Otherwise, only the name and height of the Pokemon will be sent to the DOM
pokemonRepository.getAll().forEach(function(pokemon){
  if (pokemon.height > thresholdHeight) {
    document.write('<p>'+ pokemon.name + ' (heigh: '+ pokemon.height + ' m)' + ' - Wow, that\'s big!</p>');
  } else {
    document.write('<p>'+ pokemon.name + ' (heigh: '+ pokemon.height + ' m)' + '</p>');
  }
});

// Request the name of the Pokemon we want to search
let searchedPokemonName = prompt("Enter the name of the Pokemon you are looking for.")
pokemonRepository.filterPokemon(searchedPokemonName.toLowerCase());
