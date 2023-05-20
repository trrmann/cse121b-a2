// fetch.js
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;

function getPokemon(url, isList=0) {
  if(isList!=0) {
    isList=1;
  }
  if(isList==1) {
    fetch(url).then(response => doStuffList(response));
  } else {
    fetch(url).then(response => doStuff(response));
  }
}

async function doStuff(response) {
    if(response.ok) {
        element = document.querySelector("#output")
        const data = await response.json();
        results = data;
        elementHTML = `${JSON.stringify(results)}`;
        const html = `<h2>${results.name}</h2>
                    <img src="${results.sprites.front_default}" alt="Image of ${results.name}">`;
        element.innerHTML = html;
        console.log("first: ", results);    
    }
}

async function doStuffList(response) {
    if(response.ok) {
        elementList = document.querySelector("#outputList")
        const data = await response.json();
        pokeList = data.results;
        const pokeArray = pokeList.map((poke) => {const liElement = document.createElement("li"); liElement.innerText = poke.name;return liElement});
        pokeArray.map((element) => {elementList.appendChild(element)});
    }
}

getPokemon(url);
getPokemon(urlList, 1);
console.log("second: ", results);