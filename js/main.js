import { recipes } from "./recipes.js";
console.log(recipes);
// DOM
const input = document.querySelectorAll("input");
const recherchePrincipal = document.querySelector(".recherche-principale");
const inputPrincipal = document.querySelector(".recherche-principale__input");
const rechercheParIngredients = document.querySelector(
  ".recherche-par-ingredients"
);
const inputIngredients = document.querySelector(
  ".recherche-par-ingredients__input"
);
const rechercheParAppareil = document.querySelector(".recherche-par-appareil");
const inputAppareil = document.querySelector(".recherche-par-appareil__input");
const rechercheParUstensiles = document.querySelector(
  ".recherche-par-ustensiles"
);
const inputUstensiles = document.querySelector(
  ".recherche-par-ustensiles__input"
);
const listeIngredients = document.querySelector(".liste-ingredients");
const cartes = document.querySelector(".cartes");

// Variables globales
let contenuInput = "";
let arrayRecipes = [];
let arrayIngredients = [];
let arrayAppareil = [];
let arrayUstensiles = [];
let arrayTrie = [];
let arrayTrieIngredients = [];
let arrayTrieAppareil = [];
let arrayTrieUstensiles = [];

// Affichage
const affichagePlats = (array) => {
  for (let i = 0; i < array.length; i++) {
    let recipe = array[i];
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
  }
};

const affichagelisteIngredients = () => {
  for (let i = 0; i < arrayIngredients.length; i++) {
    let recipe = arrayIngredients[i];
    recipe.ingredients.forEach((ingredient) => {
      listeIngredients.innerHTML += `<li>${ingredient.ingredient}</li>`;
    });
  }
};

// Trie
// Recherche principale
function trie() {
  for (let i = 0; i < recipes.length; i++) {
    arrayTrie[
      i
    ] = `${recipes[i].name} - ${recipes[i].description} - ${recipes[i].appliance}`;
    arrayTrieAppareil[i] = `${recipes[i].appliance} `;

    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (
        recipes[i].ingredients[j].ingredient &&
        recipes[i].ustensils[j] != undefined
      ) {
        arrayTrie[
          i
        ] += ` - ${recipes[i].ingredients[j].ingredient} - ${recipes[i].ustensils[j]}`;
      } else {
        arrayTrie[i] += ` - ${recipes[i].ingredients[j].ingredient} `;
      }
      arrayTrieIngredients[i] += `${recipes[i].ingredients[j].ingredient} `;
      arrayTrieUstensiles[i] += `${recipes[i].ustensils[j]}`;
    }
  }
}

trie();

// Recherche principal
function recherche(value) {
  // console.log(arrayTrie);
  for (let i = 0; i < arrayTrie.length; i++) {
    if (arrayTrie[i].toLowerCase().includes(value.toLowerCase())) {
      arrayRecipes.push(recipes[i]);
    }
  }
}

inputPrincipal.addEventListener("input", (e) => {
  contenuInput = e.target.value.toLowerCase();
});

recherchePrincipal.addEventListener("input", (e) => {
  if (inputPrincipal.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayRecipes = [];
    recherche(contenuInput);
    affichagePlats(arrayRecipes);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayRecipes = [];
  }
});

// Recherches secondaire
// Ingrédients
function rechercheIngredients(value) {
  for (let i = 0; i < arrayTrieIngredients.length; i++) {
    if (arrayTrieIngredients[i].toLowerCase().includes(value.toLowerCase())) {
      arrayIngredients.push(recipes[i]);
    }
  }
}

inputIngredients.addEventListener("input", (e) => {
  contenuInput = e.target.value.toLowerCase();
});

rechercheParIngredients.addEventListener("input", (e) => {
  if (inputIngredients.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayIngredients = [];
    rechercheIngredients(contenuInput);
    affichagePlats(arrayIngredients);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayIngredients = [];
  }
});

// Appareil
function rechercheAppareil(value) {
  console.log(value);
  for (let i = 0; i < arrayTrieIngredients.length; i++) {
    if (arrayTrieAppareil[i].toLowerCase().includes(value.toLowerCase())) {
      arrayAppareil.push(recipes[i]);
    }
  }
}

inputAppareil.addEventListener("input", (e) => {
  contenuInput = e.target.value.toLowerCase();
});

rechercheParAppareil.addEventListener("input", (e) => {
  if (inputAppareil.value.length >= 3) {
    e.preventDefault();
    console.log("test");
    cartes.innerHTML = "";
    arrayAppareil = [];
    rechercheAppareil(contenuInput);
    affichagePlats(arrayAppareil);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayAppareil = [];
  }
});

//Ustensiles
function rechercheUstensiles(value) {
  console.log(value);
  for (let i = 0; i < arrayTrieIngredients.length; i++) {
    if (arrayTrieUstensiles[i].toLowerCase().includes(value.toLowerCase())) {
      arrayUstensiles.push(recipes[i]);
    }
  }
}

inputUstensiles.addEventListener("input", (e) => {
  contenuInput = e.target.value.toLowerCase();
});

rechercheParUstensiles.addEventListener("input", (e) => {
  if (inputUstensiles.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayUstensiles = [];
    rechercheUstensiles(contenuInput);
    affichagePlats(arrayUstensiles);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayUstensiles = [];
  }
});
