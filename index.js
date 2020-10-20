import { numberWithCommas } from "./utils.js";

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // here we need to figure out if the city or state matches what was searched

    //"gi" searches the word or term entered through out the array
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

async function displayMatches() {
  const endpoint = await fetch(
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
  );
  const data = await endpoint.json();

  const cities = data;

  const matchArray = findMatches(searchInput.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(searchInput.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${searchInput.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${searchInput.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
