import { recipes } from "./recipes.js";
console.log(recipes);
// DOM
const formPrincipal = document.querySelector(".recherche-principale");
const inputPrincipal = document.querySelector(".recherche-principale__input");
const form = document.querySelector("recherche-principal");
const cartes = document.querySelector(".cartes");

// Variables globales
let contenuInput = "";
let arrayRecipes = [];
let arrayTrie = [];

// Affichage
const affichagePlats = () => {
  arrayRecipes.forEach((recipe) => {
    let listeIngredients = "";
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredient.hasOwnProperty("quantity")) {
        return (listeIngredients += `<li>${ingredient.ingredient}</li>`);
      } else if (!ingredient.hasOwnProperty("unit")) {
        return (listeIngredients += `<li>${ingredient.ingredient}: ${ingredient.quantity}</li>`);
      } else {
        return (listeIngredients += `<li>${ingredient.ingredient}: <span>${ingredient.quantity}${ingredient.unit}</span></li>`);
      }
    });

    cartes.innerHTML += `
          <article class="carte">
          <div class="carte__image">
            <img
                src="./assets/illustration-plat.svg"
                class="card-img-top"
                alt="Illustration plat"
              />
          </div>
          <div class="carte__titre">
            <h2>${recipe.name}</h2>
          </div>
          <div class="carte__duree">
            <p><img
                  src="./assets/cadran.svg"
                  alt="logo indiquant la durée"
                />
                ${recipe.time} min
            </p>
          </div>
          <div class="carte__ingredients">
            <ul class="contenu__ingredient__liste">
                ${listeIngredients}
            </ul>
          </div>
          <div class="carte__recette">
            <p class="carte__recette--police">
              ${recipe.description}
            </p>
          </div>
        </article>
       `;
  });
};

// Trie
function trie() {
  for (let i = 0; i < recipes.length; i++) {
    arrayTrie[
      i
    ] = `${recipes[i].name} - ${recipes[i].description} - ${recipes[i].appliance}`;

    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (
        recipes[i].ingredients[j].ingredient &&
        recipes[i].ustensils[j] != undefined
      ) {
        arrayTrie[i] += ` - ${recipes[i].ingredients[j].ingredient}`;
        arrayTrie[i] += ` - ${recipes[i].ustensils[j]}`;
      }
    }
  }
}

trie();

function recherche(value) {
  for (let i = 0; i < arrayTrie.length; i++) {
    if (arrayTrie[i].toLowerCase().includes(value.toLowerCase())) {
      arrayRecipes.push(recipes[i]);
    }
  }
}

// Barre de recherche
inputPrincipal.addEventListener("input", (e) => {
  contenuInput = e.target.value.toLowerCase();
});

formPrincipal.addEventListener("input", (e) => {
  if (inputPrincipal.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayRecipes = [];
    recherche(contenuInput);
    affichagePlats();
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayRecipes = [];
  }
});
