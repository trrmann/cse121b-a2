// fetch.js
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;

async function getPokemon(url, doThis) {
    const response = await fetch(url);
    if(response.ok) {
        const data = await response.json();
        doThis(data);
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

getPokemon(url, doStuff);
getPokemon(urlList, doStuffList);
console.log("second: ", results);