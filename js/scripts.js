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

  // We define/declare loadingMessage variable that will be used in showLoadingMessage() and hideLoadingMessage()
  let loadingMessage = document.querySelector('.loading-message-placeholder');

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
    loadingMessage.innerText = 'LOADING... Please wait...';
    // console.log(loadingMessage);
  }

  function hideLoadingMessage(){
    setTimeout(function () {

      loadingMessage.innerText = '';
      // console.log(loadingMessage);
    }, 1000);
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
    let listPokemon = $('.pokemon-list');

    // let listItem = document.createElement('li');
    let listItem = $('<div class="col-xl-3 col-lg-4 col-md-6"></div>');


    // Create a button and add it to the DOM
    // let button = document.createElement('button');
    // button.innerText = pokemon.name;

    let buttonPokemon = $('<button type="button" class="btn-pokemon" data-toggle="modal" data-target="#ModalCenter">' + pokemon.name + '</button>');

    // We add a class to our button to style it
    // button.classList.add('btn-pokemon');
    listItem.append(buttonPokemon);

    listPokemon.append(listItem);

    // Add an event listener to our button element
    buttonPokemon.on('click', function(){
      showDetails(pokemon);
    })
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }

  // We define modalContainer which is the EXISTING #modal-container of our html
  // let modalContainer = document.querySelector('#modal-container');
  // function showModal(pokemon){

    // We define a modal as a <div> that will be CREATED in this JS file
    // modalContainer.innerHTML = ''; // [Q] - Do we really need to remove the content?

    // We create a close button element that will trigger the hideModal function of the modal
    // let modalCloseButton = document.createElement('button');
    // modalCloseButton.innerHTML = 'close';
    // modalCloseButton.classList.add('modal-close');
    // modalCloseButton.addEventListener('click', hideModal);

    // We create a new div for our Modal
    // let modal = document.createElement('div');
    // # We add a class to this modal to give it some styling
    // modal.classList.add('modal');

    // # We define the content of our modal
    // ## We define and create the h1 of our modal that will contain the name of our Pokemon
    // let modalTitle = document.createElement('h1');
    // modalTitle.innerText = pokemon.name.toUpperCase();

    // ## We define and create the p of our modal that will contain the height of our Pokemon
    // let modalHeight = document.createElement('p');
    // modalHeight.innerText = 'Height: ' + pokemon.height;

    // ## We define and create the <img> of our modal
    // let modalImg = document.createElement('img');
    // modalImg.src = pokemon.imageUrl;
    // modalImg.classList.add('modal-img');

    // ## We define and create an element for the pokemon type(s)
    // let modalTypes = document.createElement('p');
    // console.log(pokemon.types[0].type.name);

    // modalTypes.innerText = showTypes(pokemon.types);

    // function showTypes(types){
    //   let message = 'Types: ';
    //
    //   types.forEach((item, i) => {
    //
    //     message += '['+ item.type.name +']' + ' ';
    //   })
    //   return message;
    // };

    // We append our created elements to the modal
    // modal.appendChild(modalCloseButton);
    // modal.appendChild(modalTitle);
    // modal.appendChild(modalHeight);
    // modal.appendChild(modalImg);
    // modal.appendChild(modalTypes);
    // We append our modal to our modalContainer
    // modalContainer.appendChild(modal);

    // We display the content of our modal
    // modalContainer.classList.add('is-visible');
    //
    // console.log(pokemon);

  // }

// ========================

// Modals implementation using Bootstrap

// ========================




  function showModal(pokemon){

    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalFooter = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElement = $('<img class="modal-img mx-auto d-block" style="width:70%">');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let typesElement = $('<p>' + 'Types: ' + showTypes(pokemon.types) + '</p>');


    function showTypes(types){
      let message = '';

      types.forEach((item, i) => {
        message += '['+ item.type.name +']' + ' ';
      })
      return message;
    };


    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);


  }



  // function hideModal(){
  //   let modalContainer = document.querySelector('#modal-container');
  //   modalContainer.classList.remove('is-visible');
  // }

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });
  //
  // modalContainer.addEventListener('click', (e) => {
  //   // Since this is also triggered when clicking INSIDE the modal
  //   // We only want to close if the user clicks directly on the overlay
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

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
