// Wrap our pokemonList variable in an IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // We define/declare loadingMessage variable that will be used in showLoadingMessage() and hideLoadingMessage()
  let loadingMessage = document.querySelector('.loading-message-placeholder');

  function loadList() {
    // console.log('test from the loadList');
    showLoadingMessage();

    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          // We create a pokemon Object for each item
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          // We add this new pokemon Object to the pokemonList Array
          addv(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  function showLoadingMessage() {
    loadingMessage.innerText = 'LOADING... Please wait...';
    // console.log(loadingMessage);
  }

  function hideLoadingMessage() {
    setTimeout(function() {
      loadingMessage.innerText = '';
      // console.log(loadingMessage);
    }, 1000);
  }

  // When called getAll will return the all list of Pokemon
  function getAll() {
    return pokemonList;
  }

  function getSearchedAndFound(foundItems) {
    return foundItems;
  }

  // When called, will add a Pokemon Object to the Pokemon list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // When called, this function will check that the entered value is an Object
  function addv(pokemon) {
    // Check entered pokemon is an Object
    if (typeof pokemon === 'object') {
      return add(pokemon);
    } else {
      alert('Pokemon not added, entered data shall be an Object');
    }
  }

  // When called this function will filter the pokemonList to search for a match
  function filterPokemon(searchedPokemonName) {
    // let searchedPokemonName = 'Squirtle';
    let filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchedPokemonName)
    );

    if (filtered.length > 0) {
      // alert("There is a match!");
      $('.pokemon-list').empty();
      console.log(filtered);
      getSearchedAndFound(filtered).forEach(function(pokemon) {
        console.log(pokemon);
        addListItem(pokemon);
      });
    } else {
      alert('No match found!');
    }
  }

  function addListItem(pokemon) {
    let listPokemon = $('.pokemon-list');

    // let listItem = document.createElement('li');
    let listItem = $('<div class="col-xl-3 col-lg-4 col-md-6"></div>');

    // Create a button and add it to the DOM
    let buttonPokemon = $(
      '<button type="button" class="btn-pokemon" data-toggle="modal" data-target="#ModalCenter">' +
        pokemon.name +
        '</button>'
    );

    listItem.append(buttonPokemon);

    listPokemon.append(listItem);

    // Add an event listener to our button element
    buttonPokemon.on('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalFooter = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElement = $(
      '<img class="modal-img mx-auto d-block" style="width:70%">'
    );
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let typesElement = $('<p>' + 'Types: ' + showTypes(pokemon.types) + '</p>');

    function showTypes(types) {
      let message = '';

      types.forEach((item, i) => {
        message += '[' + item.type.name + ']' + ' ';
      });
      return message;
    }

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  // pokemonRepository function will return either getAll, add etc... and then trigger the appropriate function
  return {
    getAll: getAll, // if pokemonRepository.getAll() is selected then this will trigger the getAll(pokemon) function
    add: add, // if pokemonRepository.add() is selected then this will trigger the add(pokemon) function
    addv: addv, // if pokemonRepository.add() is selected then this will trigger the addv(pokemon) function
    filterPokemon: filterPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})();

// Load Pokemon from the API
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    return pokemonRepository.addListItem(pokemon);
  });
});

// Search functionality below
$('#search-button').on('click', search);

function search() {
  let userPokemonSearchInput = $('#user-pokemon-search-input').val();
  console.log(userPokemonSearchInput);
  pokemonRepository.filterPokemon(userPokemonSearchInput.toLowerCase());
  $('#user-pokemon-search-input').val('');
  $('#navbarSupportedContent').removeClass('show');
}

$('#user-pokemon-search-input').on('keypress', function(event) {
  if (event.which == '13') {
    event.preventDefault(); // stop the default behavior of the form submit.
    search();
  }
});
