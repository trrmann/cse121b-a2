// fetch.js
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;

async function getPokemon(url, isList=0) {
  if(isList!=0) {
    isList=1;
  }
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    if(isList==1) {
        doStuffList(data);
    } else {
        doStuff(data);
    }
  }
}

function doStuff(data) {
    element = document.querySelector("#output")
    results = data;
  elementHTML = `${JSON.stringify(results)}`;
  const html = `<h2>${results.name}</h2>
                <img src="${results.sprites.front_default}" alt="Image of ${results.name}">`;
  element.innerHTML = html;
  console.log("first: ", results);
}

function doStuffList(data) {
    elementList = document.querySelector("#outputList")
    pokeList = data.results;
    const pokeArray = pokeList.map((poke) => {const liElement = document.createElement("li"); liElement.innerText = poke.name;return liElement});
    pokeArray.map((element) => {elementList.appendChild(element)});
}

getPokemon(url);
getPokemon(urlList, 1);
console.log("second: ", results);