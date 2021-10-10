import { recipes } from "./recipes.js";
console.log(recipes);
// DOM
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
const ingredientsListe = document.querySelector(".liste-ingredients");
const cartes = document.querySelector(".cartes");
const flecheIngredients = document.querySelector(".fleche-ingredients");
const flecheAppareil = document.querySelector(".fleche-appareil");
const flecheUstensiles = document.querySelector(".fleche-ustensiles");

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
let arrayListeIngredients = [];
let arrayListeAppareil = [];
let arrayListeUstensiles = [];
let newArrayListeIngredients = [];

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
      if (j == 0) {
        arrayTrieIngredients[i] = `${recipes[i].ingredients[j].ingredient} `;
        arrayTrieUstensiles[i] = `${recipes[i].ustensils[j]}`;
      } else {
        arrayTrieIngredients[i] += `${recipes[i].ingredients[j].ingredient} `;
        arrayTrieUstensiles[i] += `${recipes[i].ustensils[j]}`;
      }
    }
  }
}

trie();

// Recherche principal
function recherche(value) {
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
  if (inputIngredients.value.length >= 1 && inputIngredients.value.length < 3) {
    e.preventDefault();
    ingredientsListe.innerHTML = "";
    newArrayListeIngredients = [];
    ouvertureListeIngredients();
    creationListeIngredients(contenuInput);
    affichageListeIngredients(newArrayListeIngredients);
  } else if (inputIngredients.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayIngredients = [];
    rechercheIngredients(contenuInput);
    console.log(arrayIngredients);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayIngredients = [];
    newArrayListeIngredients = [];
    fermetureListeIngredients();
  }
});

rechercheParIngredients.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputIngredients.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    inputIngredients.value = "";
    fermetureListeIngredients();
    affichagePlats(arrayIngredients);
  }
});

// Appareil
function rechercheAppareil(value) {
  console.log(value);
  for (let i = 0; i < arrayTrieAppareil.length; i++) {
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
    cartes.innerHTML = "";
    arrayAppareil = [];
    rechercheAppareil(contenuInput);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayAppareil = [];
  }
});

rechercheParAppareil.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    cartes.innerHTML = "";
    inputAppareil.value = "";
    affichagePlats(arrayAppareil);
  }
});

//Ustensiles
function rechercheUstensiles(value) {
  for (let i = 0; i < arrayTrieUstensiles.length; i++) {
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
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayUstensiles = [];
  }
});

rechercheParUstensiles.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    cartes.innerHTML = "";
    inputUstensiles.value = "";
    affichagePlats(arrayUstensiles);
  }
});

// affichagelisteIngredients;
const creationListeIngredients = (value) => {
  recipes.filter((recipe) =>
    recipe.ingredients.forEach((el) => {
      arrayListeIngredients.push(el.ingredient.toLowerCase());
    })
  );
  arrayListeIngredients = [...new Set(arrayListeIngredients)];
  for (let i = 0; i < arrayListeIngredients.length; i++) {
    if (arrayListeIngredients[i].includes(value.toLowerCase())) {
      newArrayListeIngredients.push(arrayListeIngredients[i]);
    }
  }
};

const affichageListeIngredients = (array) => {
  for (let i = 0; i < newArrayListeIngredients.length; i++) {
    newArrayListeIngredients.length = 33;
    if (newArrayListeIngredients[i] != undefined) {
      ingredientsListe.innerHTML += `
        <li class="liste__element">${array[i]}</li>
      `;
    }
  }
};

// animations des filtres
flecheIngredients.addEventListener("click", () => {
  if (flecheIngredients.classList.contains("rotation-fleche")) {
    fermetureListeIngredients();
  } else {
    ouvertureListeIngredients();
    creationListeIngredients(contenuInput);
    affichageListeIngredients(arrayListeIngredients);
  }
});

const ouvertureListeIngredients = () => {
  flecheIngredients.classList.add("rotation-fleche");
  ingredientsListe.style.display = "block";
  rechercheParIngredients.style.width = "50%";
  ingredientsListe.innerHTML = "";
};
const fermetureListeIngredients = () => {
  flecheIngredients.classList.remove("rotation-fleche");
  ingredientsListe.style.display = "none";
  rechercheParIngredients.style.width = "170px";
};
