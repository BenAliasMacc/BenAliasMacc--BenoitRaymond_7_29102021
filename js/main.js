import { recipes } from "./recipes.js";
console.log(recipes);
// DOM
const recherchePrincipal = document.querySelector(".recherche-principale");
const inputPrincipal = document.querySelector(".recherche-principale__input");
const loupe = document.querySelector(".recherche-principale__image");
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
const appareilListe = document.querySelector(".liste-appareil");
const ustensilesListe = document.querySelector(".liste-ustensiles");
const cartes = document.querySelector(".cartes");
const flecheIngredients = document.querySelector(".fleche-ingredients");
const flecheAppareil = document.querySelector(".fleche-appareil");
const flecheUstensiles = document.querySelector(".fleche-ustensiles");
const elementSelect = document.querySelector(".element-select");

// Variables globales
let contenuInput = "";
let arrayRecipes = [];
let newArrayRecipes = [];
let arrayIngredients = [];
let arrayAppareil = [];
let arrayUstensiles = [];
let arrayTrie = [];
let arrayTrieIngredients = [];
let arrayTrieAppareil = [];
let arrayTrieUstensiles = [];
let arrayElementSelect = [];
let arrayElementSelectString = [];
let arrayListeIngredients = [];
let arrayListeAppareil = [];
let arrayListeUstensiles = [];
let newArrayListeIngredients = [];
let newArrayListeAppareil = [];
let newArrayListeUstensiles = [];

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

//--------------------- Recherche principal --------------------
//--------------------------------------------------------------
function recherche(value) {
  for (let i = 0; i < arrayTrie.length; i++) {
    if (arrayTrie[i].toLowerCase().includes(value.toLowerCase())) {
      arrayRecipes.push(recipes[i]);
    }
  }
}

// function recherche(value) {
//   arrayTrie.forEach((trie) => {
//     if (trie.toLowerCase().includes(value.toLowerCase())) {
//       arrayRecipes.push(trie);
//     }
//   });
// }

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
    if (arrayRecipes == "") {
      cartes.innerHTML = `<h2>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</h2>`;
    }
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayRecipes = [];
  }
});

//--------------------- Recherche secondaires --------------------
//----------------------------------------------------------------
//------------------------- Ingrédients---------------------------

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
    fermetureListeAppareil();
    fermetureListeUstensiles();
    ingredientsListe.innerHTML = "";
    newArrayListeIngredients = [];
    filtreInputIngredients();
    ouvertureListeIngredients();
  } else if (inputIngredients.value.length >= 3) {
    e.preventDefault();
    ingredientsListe.innerHTML = "";
    newArrayListeIngredients = [];
    cartes.innerHTML = "";
    arrayIngredients = [];
    filtreInputIngredients();
    rechercheIngredients(contenuInput);
  } else {
    e.preventDefault();
    console.log(arrayListeIngredients);
    cartes.innerHTML = "";
    arrayIngredients = [];
    newArrayListeIngredients = [];
    fermetureListeIngredients();
  }
});

// affichagelisteIngredients;
const filtreInputIngredients = () => {
  for (let i = 0; i < arrayListeIngredients.length; i++) {
    if (arrayListeIngredients[i].includes(contenuInput.toLowerCase())) {
      newArrayListeIngredients.push(arrayListeIngredients[i]);
    }
  }
  affichageListeIngredients();
};

rechercheParIngredients.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputIngredients.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    inputIngredients.value = "";
    fermetureListeIngredients();
    affichagePlats(arrayIngredients);
    creationListeElements();
  }
});

const affichageListeIngredients = () => {
  for (let i = 0; i < newArrayListeIngredients.length; i++) {
    if (newArrayListeIngredients[i] != undefined) {
      ingredientsListe.innerHTML += `
        <li class="liste__element__ingredients liste__element" data-tag="ingredients" tabindex="0">${
          newArrayListeIngredients[i][0].toUpperCase() +
          newArrayListeIngredients[i].slice(1)
        }</li>
      `;
    }
  }
  const elementsListe = document.querySelectorAll(
    ".liste__element__ingredients"
  );
  elementsListe.forEach((el) => {
    el.addEventListener("click", (e) => {
      cartes.innerHTML = "";
      ingredientsListe.innerHTML = "";
      appareilListe.innerHTML = "";
      ustensilesListe.innerHTML = "";
      inputIngredients.value = "";
      arrayRecipes = [];
      arrayListeIngredients = [];
      newArrayListeIngredients = [];
      arrayListeAppareil = [];
      newArrayListeAppareil = [];
      arrayListeUstensiles = [];
      newArrayListeUstensiles = [];
      arrayElementSelect.push(el);
      arrayElementSelectString.push(el.textContent);
      filtreElements();
      creationElementIngredients(e);
      creationListeElements();
    });
  });
};
affichageListeIngredients();

const suppressionListeIngredients = () => {
  const elementSelection = document.querySelectorAll(".element-select__choix");
  elementSelection.forEach(element => {
    if (newArrayListeIngredients.includes(element.textContent.toLocaleLowerCase())){
     const indexElement = newArrayListeIngredients.indexOf(element.textContent.toLocaleLowerCase())
     newArrayListeIngredients.splice(indexElement, 1)
    }
  })
};

// animations des filtres
flecheIngredients.addEventListener("click", () => {
  if (flecheIngredients.classList.contains("rotation-fleche")) {
    fermetureListeIngredients();
  } else {
    fermetureListeAppareil();
    fermetureListeUstensiles();
    ouvertureListeIngredients();
  }
});

const ouvertureListeIngredients = () => {
  flecheIngredients.classList.add("rotation-fleche");
  ingredientsListe.style.display = "block";
  rechercheParIngredients.style.width = "50%";
  if(screen.width <= 576) {
    rechercheParIngredients.style.width = "100%";
    rechercheParIngredients.style.marginRight = "0px";
  }
};
const fermetureListeIngredients = () => {
  flecheIngredients.classList.remove("rotation-fleche");
  ingredientsListe.style.display = "none";
  rechercheParIngredients.style.width = "170px";
  rechercheParIngredients.style.marginRight = "20px";
};

// bouton select
const creationElementIngredients = (event) => {
  elementSelect.innerHTML += `
    <bouton class="element-select__ingredients element-select__choix" data-tag="ingredients">${event.target.textContent}<img class="close-element" src="./assets/close.svg" alt="bouton fermeture"></i></bouton>
  `;
  const elementChoisis = document.querySelectorAll(".element-select__choix");
  const closeElement = document.querySelectorAll(".close-element");
  fermetureElement(closeElement, elementChoisis);
};

//------------------------- Appareil -------------------------
function rechercheAppareil(value) {
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
  if (inputAppareil.value.length >= 1 && inputAppareil.value.length < 3) {
    e.preventDefault();
    fermetureListeIngredients();
    fermetureListeUstensiles();
    appareilListe.innerHTML = "";
    newArrayListeAppareil = [];
    ouvertureListeAppareil();
    filtreInputAppareil();
  } else if (inputAppareil.value.length >= 3) {
    e.preventDefault();
    appareilListe.innerHTML = "";
    newArrayListeAppareil = [];
    cartes.innerHTML = "";
    arrayAppareil = [];
    filtreInputAppareil();
    rechercheAppareil(contenuInput);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayAppareil = [];
    newArrayListeAppareil = [];
    fermetureListeAppareil();
  }
});

// affichage liste Appareil;
const filtreInputAppareil = () => {
  for (let i = 0; i < arrayListeAppareil.length; i++) {
    if (arrayListeAppareil[i].includes(contenuInput.toLowerCase())) {
      newArrayListeAppareil.push(arrayListeAppareil[i]);
    }
  }
  affichageListeAppareil();
};

rechercheParAppareil.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputAppareil.value.length >= 3) {
    e.preventDefault();
    cartes.innerHTML = "";
    inputAppareil.value = "";
    fermetureListeAppareil();
    affichagePlats(arrayAppareil);
  }
});

const affichageListeAppareil = () => {
  for (let i = 0; i < newArrayListeAppareil.length; i++) {
    if (newArrayListeAppareil[i] != undefined) {
      appareilListe.innerHTML += `
        <li class="liste__element__appareil liste__element" data-tag="appareil" tabindex="0">${
          newArrayListeAppareil[i][0].toUpperCase() +
          newArrayListeAppareil[i].slice(1)
        }</li>
      `;
    }
  }
  const elementsListe = document.querySelectorAll(".liste__element__appareil");
  elementsListe.forEach((el) => {
    el.addEventListener("click", (e) => {
      cartes.innerHTML = "";
      ingredientsListe.innerHTML = "";
      appareilListe.innerHTML = "";
      ustensilesListe.innerHTML = "";
      inputAppareil.value = "";
      arrayRecipes = [];
      arrayListeIngredients = [];
      newArrayListeIngredients = [];
      arrayListeAppareil = [];
      newArrayListeAppareil = [];
      arrayListeUstensiles = [];
      newArrayListeUstensiles = [];
      arrayElementSelect.push(el);
      arrayElementSelectString.push(el.textContent);
      filtreElements();
      creationElementAppareil(e);
      creationListeElements();
    });
  });
};
affichageListeAppareil();

const suppressionListeAppareil = () => {
  const elementSelection = document.querySelectorAll(".element-select__choix");
  elementSelection.forEach(element => {
    if (newArrayListeAppareil.includes(element.textContent.toLocaleLowerCase())){
     const indexElement = newArrayListeAppareil.indexOf(element.textContent.toLocaleLowerCase())
     newArrayListeAppareil.splice(indexElement, 1)
    }
  })
};

// animations des filtres
flecheAppareil.addEventListener("click", () => {
  if (flecheAppareil.classList.contains("rotation-fleche")) {
    fermetureListeAppareil();
  } else {
    fermetureListeIngredients();
    fermetureListeUstensiles();
    ouvertureListeAppareil();
  }
});

const ouvertureListeAppareil = () => {
  flecheAppareil.classList.add("rotation-fleche");
  appareilListe.style.display = "block";
  rechercheParAppareil.style.width = "50%";
  if(screen.width <= 576) {
    rechercheParAppareil.style.width = "100%";
    rechercheParAppareil.style.marginRight = "0px";
  }
};
const fermetureListeAppareil = () => {
  flecheAppareil.classList.remove("rotation-fleche");
  appareilListe.style.display = "none";
  rechercheParAppareil.style.width = "170px";
  rechercheParAppareil.style.marginRight = "20px";
};
// bouton select
const creationElementAppareil = (event) => {
  elementSelect.innerHTML += `
    <bouton class="element-select__appareil element-select__choix" data-tag="appareil">${event.target.textContent}<img class="close-element" src="./assets/close.svg" alt="bouton fermeture"></i></bouton>
  `;
  const elementChoisis = document.querySelectorAll(".element-select__choix");
  const closeElement = document.querySelectorAll(".close-element");
  fermetureElement(closeElement, elementChoisis);
};

//------------------------- Ustensiles -------------------------
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
  if (inputUstensiles.value.length >= 1 && inputUstensiles.value.length < 3) {
    e.preventDefault();
    fermetureListeIngredients();
    fermetureListeUstensiles();
    ustensilesListe.innerHTML = "";
    newArrayListeUstensiles = [];
    ouvertureListeUstensiles();
    filtreInputUstensiles();
  } else if (inputUstensiles.value.length >= 3) {
    e.preventDefault();
    ustensilesListe.innerHTML = "";
    newArrayListeUstensiles = [];
    cartes.innerHTML = "";
    arrayUstensiles = [];
    filtreInputUstensiles();
    rechercheUstensiles(contenuInput);
  } else {
    e.preventDefault();
    cartes.innerHTML = "";
    arrayUstensiles = [];
    newArrayListeUstensiles = [];
    fermetureListeIngredients();
  }
});

// affichage liste Ustensiles;
const filtreInputUstensiles = () => {
  for (let i = 0; i < arrayListeUstensiles.length; i++) {
    if (arrayListeUstensiles[i].includes(contenuInput.toLowerCase())) {
      newArrayListeUstensiles.push(arrayListeUstensiles[i]);
    }
  }
  affichageListeUstensiles();
};

rechercheParUstensiles.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    cartes.innerHTML = "";
    inputUstensiles.value = "";
    fermetureListeIngredients();
    affichagePlats(arrayUstensiles);
    creationListeElements();
  }
});

// affichage liste Ustensiles;
const affichageListeUstensiles = () => {
  for (let i = 0; i < newArrayListeUstensiles.length; i++) {
    if (newArrayListeUstensiles[i] != undefined) {
      ustensilesListe.innerHTML += `
        <li class="liste__element__ustensiles liste__element" data-tag="ustensiles" tabindex="0">${
          newArrayListeUstensiles[i][0].toUpperCase() +
          newArrayListeUstensiles[i].slice(1)
        }</li>
      `;
    }
  }
  const elementsListe = document.querySelectorAll(
    ".liste__element__ustensiles"
  );
  {
    elementsListe.forEach((el) => {
      el.addEventListener("click", (e) => {
        cartes.innerHTML = "";
        ingredientsListe.innerHTML = "";
        appareilListe.innerHTML = "";
        ustensilesListe.innerHTML = "";
        inputUstensiles.value = "";
        arrayRecipes = [];
        arrayListeIngredients = [];
        newArrayListeIngredients = [];
        arrayListeAppareil = [];
        newArrayListeAppareil = [];
        arrayListeUstensiles = [];
        newArrayListeUstensiles = [];
        arrayElementSelect.push(el);
        arrayElementSelectString.push(el.textContent);
        filtreElements();
        creationElementUstensiles(e);
        creationListeElements(e.target);
      });
    });
  }
};
affichageListeUstensiles();

const suppressionListeUstensiles = () => {
  const elementSelection = document.querySelectorAll(".element-select__choix");
  elementSelection.forEach(element => {
    if (newArrayListeUstensiles.includes(element.textContent.toLocaleLowerCase())){
     const indexElement = newArrayListeUstensiles.indexOf(element.textContent.toLocaleLowerCase())
     newArrayListeUstensiles.splice(indexElement, 1)
    }
  })
};

// animations des filtres
flecheUstensiles.addEventListener("click", () => {
  if (flecheUstensiles.classList.contains("rotation-fleche")) {
    fermetureListeUstensiles();
  } else {
    fermetureListeIngredients();
    fermetureListeAppareil();
    ouvertureListeUstensiles();
  }
});

const ouvertureListeUstensiles = () => {
  flecheUstensiles.classList.add("rotation-fleche");
  ustensilesListe.style.display = "block";
  rechercheParUstensiles.style.width = "50%";
  if(screen.width <= 576) {
    rechercheParUstensiles.style.width = "100%";
    rechercheParUstensiles.style.marginRight = "0px";
  }
};
const fermetureListeUstensiles = () => {
  flecheUstensiles.classList.remove("rotation-fleche");
  ustensilesListe.style.display = "none";
  rechercheParUstensiles.style.width = "170px";
  rechercheParUstensiles.style.marginRight = "20px";
};

// bouton select
const creationElementUstensiles = (event) => {
  elementSelect.innerHTML += `
    <bouton class="element-select__ustensiles element-select__choix" data-tag="ustensiles">${event.target.textContent}<img class="close-element" src="./assets/close.svg" alt="bouton fermeture"></i></bouton>
  `;
  const elementChoisis = document.querySelectorAll(".element-select__choix");
  const closeElement = document.querySelectorAll(".close-element");
  fermetureElement(closeElement, elementChoisis);
};

//------------------------- Element - filtrage et fermeture -------------------------
const fermetureElement = (close, element) => {
  close.forEach((elt, index) => {
    elt.addEventListener("click", () => {
      const indexElement = arrayElementSelectString.indexOf(
        element[index].textContent
      );
      if(element[index].dataset.tag.includes("ingredients")) {
        newArrayListeIngredients.push(element[index].textContent);
      }
      if(element[index].dataset.tag.includes("appareil")) {
        newArrayListeAppareil.push(element[index].textContent);
      }
      if(element[index].dataset.tag.includes("ustensiles")) {
        newArrayListeUstensiles.push(element[index].textContent);
      }
      console.log(element[index]);
      element[index].style.display = "none";
      arrayElementSelectString.splice(indexElement, 1);
      arrayElementSelect.splice(indexElement, 1);
      newArrayRecipes = [];
      cartes.innerHTML = "";
      filtreElements();
      creationListeElements();
    });
  });
};

function filtreElements() {
  for (let i = 0; i < arrayElementSelect.length; i++) {
    if (arrayElementSelect[i].dataset.tag.includes("ingredients")) {
      if (newArrayRecipes == "") {
        newArrayRecipes = recipes.filter((recipe) =>
          recipe.ingredients.some((elt) =>
            elt.ingredient
              .toLowerCase()
              .includes(arrayElementSelect[i].textContent.toLowerCase())
          )
        );
      } else {
        newArrayRecipes = newArrayRecipes.filter((recipe) =>
          recipe.ingredients.some((elt) =>
            elt.ingredient
              .toLowerCase()
              .includes(arrayElementSelect[i].textContent.toLowerCase())
          )
        );
      }
    }
    if (arrayElementSelect[i].dataset.tag.includes("appareil")) {
      if (newArrayRecipes == "") {
        newArrayRecipes = recipes.filter((recipe) =>
          recipe.appliance
            .toLowerCase()
            .includes(arrayElementSelect[i].textContent.toLowerCase())
        );
      } else {
        newArrayRecipes = newArrayRecipes.filter((recipe) =>
          recipe.appliance
            .toLowerCase()
            .includes(arrayElementSelect[i].textContent.toLowerCase())
        );
      }
    }
    if (arrayElementSelect[i].dataset.tag.includes("ustensiles")) {
      if (newArrayRecipes == "") {
        newArrayRecipes = recipes.filter((recipe) =>
          recipe.ustensils.some((elt) =>
            elt
              .toLowerCase()
              .includes(arrayElementSelect[i].textContent.toLowerCase())
          )
        );
      } else {
        newArrayRecipes = newArrayRecipes.filter((recipe) =>
          recipe.ustensils.some((elt) =>
            elt
              .toLowerCase()
              .includes(arrayElementSelect[i].textContent.toLowerCase())
          )
        );
      }
    }
  }
  ingredientsListe.innerHTML = "";
  appareilListe.innerHTML = "";
  ustensilesListe.innerHTML = "";
  arrayRecipes = [...newArrayRecipes];
  affichagePlats(newArrayRecipes);
}

const creationListeElements = () => {
  if (newArrayRecipes == "") {
    recipes.map((recipe) =>
      recipe.ingredients.forEach((el) => {
        arrayListeIngredients.push(el.ingredient.toLowerCase());
      })
    ) &&
      recipes.map((recipe) =>
        arrayListeAppareil.push(recipe.appliance.toLowerCase())
      ) &&
      recipes.map((recipe) =>
        recipe.ustensils.forEach((el) => {
          arrayListeUstensiles.push(el.toLowerCase());
        })
      );
  } else {
    newArrayRecipes.map((recipe) =>
      recipe.ingredients.forEach((el) => {
        arrayListeIngredients.push(el.ingredient.toLowerCase());
      })
    ) &&
      newArrayRecipes.map((recipe) =>
        arrayListeAppareil.push(recipe.appliance.toLowerCase())
      ) &&
      newArrayRecipes.map((recipe) =>
        recipe.ustensils.forEach((el) => {
          arrayListeUstensiles.push(el.toLowerCase());
        })
      );
  }
  if (newArrayRecipes.length === 1) {
    arrayListeIngredients = [];
    arrayListeAppareil = [];
    arrayListeUstensiles = [];
    ingredientsListe.innerHTML = `<p>Aucun résultat</p>`;
    appareilListe.innerHTML = `<p>Aucun résultat</p>`;
    ustensilesListe.innerHTML = `<p>Aucun résultat</p>`;
    fermetureListeIngredients();
    fermetureListeAppareil();
    fermetureListeUstensiles();
  }
  arrayListeIngredients = [...new Set(arrayListeIngredients)];
  arrayListeAppareil = [...new Set(arrayListeAppareil)];
  arrayListeUstensiles = [...new Set(arrayListeUstensiles)];
  newArrayListeIngredients = arrayListeIngredients.sort((a, b) =>
    a.localeCompare(b, "fr", { ignorePunctuation: true })
  );
  newArrayListeAppareil = arrayListeAppareil.sort((a, b) =>
    a.localeCompare(b, "fr", { ignorePunctuation: true })
  );
  newArrayListeUstensiles = arrayListeUstensiles.sort((a, b) =>
    a.localeCompare(b, "fr", { ignorePunctuation: true })
  );
  suppressionListeIngredients();
  suppressionListeAppareil();
  suppressionListeUstensiles();
  affichageListeIngredients();
  affichageListeAppareil();
  affichageListeUstensiles();
};
creationListeElements();
