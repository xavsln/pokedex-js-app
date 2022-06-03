// Wrap our pokemonList variable in an IIFE
let pokemonRepository = (function () {
  // Create a new Array of Pokemon
  // let pokemonList = [
  //   {
  //     name: 'Bulbasaur',
  //     types: ['grass', 'poison'],
  //     height: 0.7
  //   },
  //   {
  //     name: 'Charmander',
  //     types: ['fire'],
  //     height: 0.6
  //   }
  // ];

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadList() {
    // console.log('test from the loadList');
    showLoadingMessage();

    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json){
      json.results.forEach(function (item){
        // We create a pokemon Object for each item
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        }
        // We add this new pokemon Object to the pokemonList Array
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function(e){
      console.log(e);
    })

  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      console.log(e);
    });
  }

  function showLoadingMessage(){
    let loadingMessage = document.querySelector('.loading-message-placeholder');

    loadingMessage.innerText = 'LOADING... Please wait...';
    // console.log(loadingMessage);
  }

  function hideLoadingMessage(){
    let loadingMessage = document.querySelector('.loading-message-placeholder');
    setTimeout(function () {

      loadingMessage.innerText = '';
      // console.log(loadingMessage);
    }, 2000);
  }

  // When called getAll will return the all list of Pokemon
  function getAll(){
    return pokemonList;
  }

  // When called, will add a Pokemon Object to the Pokemon list
  function add(pokemon){
    pokemonList.push(pokemon);
    // alert('New pokemon successfully added');
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
    let filtered = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchedPokemonName));

    if (filtered.length > 0) {
      alert("There is a match!");
      console.log(filtered);
    } else {
      alert('No match found!')
    }
  }

  function addListItem(pokemon){
    let listPokemon = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');

    // Create a button and add it to the DOM
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    // We add a class to our button to style it
    button.classList.add('btn');
    listItem.appendChild(button);

    listPokemon.appendChild(listItem);

    // Add an event listener to our button element
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
  }

  function showDetails(pokemon){
    loadDetails(pokemon);
    console.log(pokemon);
  }

  // pokemonRepository function will return either getAll, add etc... and then trigger the appropriate function
  return {
    getAll: getAll, // if pokemonRepository.getAll() is selected then this will trigger the getAll(pokemon) function
    add: add, // if pokemonRepository.add() is selected then this will trigger the add(pokemon) function
    addv: addv, // if pokemonRepository.add() is selected then this will trigger the addv(pokemon) function
    filterPokemon:filterPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage:showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  }
})();

// Load Pokemon from the API
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    return pokemonRepository.addListItem(pokemon);
  });
});


// Request the name of the Pokemon we want to search
// let searchedPokemonName = prompt("Enter the name of the Pokemon you are looking for.")
// pokemonRepository.filterPokemon(searchedPokemonName.toLowerCase());
