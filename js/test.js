let isOpen = [true, true, true];
const inputResearchKey = document.querySelectorAll(".search-key");
const fleche = document.querySelectorAll(".fleche");
const tags = document.querySelectorAll('.container-tags');
const mainContainer = document.getElementsByClassName('main-container')[0];
let arrayRecipesByTags = [];
const tagUnit = document.getElementsByClassName("tag");
const arrayTagsSelected = [];
const tagSelected = document.getElementsByClassName('tags-selected')[0];
let exitTag = document.getElementsByClassName("exit-tag");
let unitList = {
    ingredients: [],
    ustensiles: [],
    appareil: []
};
let k = 0;
let arrayIndex = [];

function createNewListRecipes() {
    for (let i = 0; i < arrayIndex.length; i++) {
        arrayRecipes.push(recipes[arrayIndex[i]]);
    }
} 

function researchSingleTag(array, value) {

    for (let i = 0; i < array.length; i++) {

        if (array[i].toLowerCase().includes(value.toLowerCase())) {
    
            arrayIndex.push(i);
        }
    }
}

function displayTagsSelected() {

    cleanDisplay();

    arrayRecipesByTags = tagSelected.childNodes;
    arrayRecipes.length = 0;

    if (arrayRecipesByTags[1].id == "app") {
        researchSingleTag(collectionDataRecipes.appareil, arrayRecipesByTags[1].firstChild.data.slice(0, -1));
    }

    else if (arrayRecipesByTags[1].id == "ust") {
        researchSingleTag(collectionDataRecipes.ustensiles, arrayRecipesByTags[1].firstChild.data.slice(0, -1));
    }

    else {
        researchSingleTag(collectionDataRecipes.ingredients, arrayRecipesByTags[1].firstChild.data.slice(0, -1));
    }
    
   

    for (let j = 2; j < arrayRecipesByTags.length; j++) {

        let m = 0;

        for (let i = 0; i < arrayIndex.length; i++) {

            if (arrayRecipesByTags[j].id == "app" && (collectionDataRecipes.appareil[arrayIndex[i]].toLowerCase().includes(arrayRecipesByTags[j].firstChild.data.slice(0, -1).toLowerCase()))) {
                let temp = arrayIndex[i];
                arrayIndex[m] = temp;
                m++;
            }
        
            else if (arrayRecipesByTags[j].id == "ust" && (collectionDataRecipes.ustensiles[arrayIndex[i]].toLowerCase().includes(arrayRecipesByTags[j].firstChild.data.slice(0, -1).toLowerCase()))) {
                let temp = arrayIndex[i];
                arrayIndex[m] = temp;
                m++;
            }
        
            else if (arrayRecipesByTags[j].id == "ing" && (collectionDataRecipes.ingredients[arrayIndex[i]].toLowerCase().includes(arrayRecipesByTags[j].firstChild.data.slice(0, -1).toLowerCase()))) {
                let temp = arrayIndex[i];
                arrayIndex[m] = temp;
                m++;
            }

        }

        arrayIndex.length = m;

    }


    arrayRecipes = [... new Set(arrayRecipes.id)];
    console.log(arrayIndex)
    createNewListRecipes();
    displayRecipes();
    
}

function createTag(j, i, string) {
    const tag = document.createElement('li');
    tag.className = "tag";
    tag.textContent = `${unitList[string][i]} `;
    tags[j].appendChild(tag)
};

function createUnitList() {

    let k = 0;
    let l = 0;
    let m = 0;

     for (let i = 0; i < recipes.length; i++) {

        if (!(unitList.appareil.includes(recipes[i].appliance))) {
            unitList.appareil[m] = recipes[i].appliance;
            m++;
        }

        for (let j = 0; j< recipes[i].ingredients.length; j++) {

            if (!(unitList.ingredients.includes(recipes[i].ingredients[j].ingredient))) {
                unitList.ingredients[k] = recipes[i].ingredients[j].ingredient;
                k++;
            }
        }

        for (let j = 0; j< recipes[i].ustensils.length; j++) {

            if (!(unitList.ustensiles.includes(recipes[i].ustensils[j]))) {
                unitList.ustensiles[l] = recipes[i].ustensils[j];
                l++;
            }
        }
    
    } 
}

function displayTags() {
   
    for (let j = 0; j < tags.length; j++) {

        if (j === 0) {
            for (let i = 0; i < unitList.ingredients.length; i++) {
                createTag(j, i, "ingredients");
            }
        }

        else if (j === 1) {

            for (let i = 0; i < unitList.appareil.length; i++) {
                createTag(j, i, "appareil");
            }
        }

        else if (j === 2) {
            
            for(let i = 0; i < unitList.ustensiles.length; i++) {
                createTag(j, i, "ustensiles");
            }
        }
    }

}

function closeResearchArea(i) {
    inputResearchKey[i].placeholder = "";
    inputResearchKey[i].style.width = "200px";
    fleche[i].style.right = "20%";
    fleche[i].src = "./logo/fleche-bas.svg";
    inputResearchKey[i].style.borderRadius = "5px";
    inputResearchKey[i].value = `${inputResearchKey[i].id}`;
    tags[i].style.display = "none";
}

function researchSingleKeyWord(array, value) {

    arrayRecipes.length = 0;

    for (let i = 0; i < array.length; i++) {

        if (array[i].toLowerCase().includes(value.toLowerCase())) {
    
            arrayRecipes.push(recipes[i]);
        }
    }
}

function handleInputKeywordl(e, i) {
    inputValue = e.target.value;

    if (inputValue.length < 3) {
        cleanDisplay();    
    }

    if (inputValue.length > 2) {
        cleanDisplay();   

        if (i === 0) {
            researchSingleKeyWord(collectionDataRecipes.ingredients, inputValue);
        }
        else if (i === 1) {
            researchSingleKeyWord(collectionDataRecipes.ustensiles, inputValue);
        }
        else {
            researchSingleKeyWord(collectionDataRecipes.appareil, inputValue);
        }
        
        displayRecipes();
    }
}

function focusResearchKey() {

    for (let i = 0; i < inputResearchKey.length; i++) {

        inputResearchKey[i].addEventListener('focus', () => {
            inputResearchKey[i].value = "";
            inputResearchKey[i].placeholder = `Rechercher dans ${inputResearchKey[i].id}`;
            inputResearchKey[i].style.width = "500px";
            fleche[i].style.right = "10%";
        })

        inputResearchKey[i].addEventListener("blur", () => {
            
                inputResearchKey[i].value = inputResearchKey[i].id;
                closeResearchArea(i);
        })
    }
}


function openResearchKey() {

    for (let i = 0; i < fleche.length; i++) {

        fleche[i].addEventListener("click", () => {

            if (isOpen[i]) {
                isOpen[i] = false;
                inputResearchKey[i].value = "";
                inputResearchKey[i].placeholder = `Rechercher dans ${inputResearchKey[i].id}`;
                inputResearchKey[i].style.width = "500px";
                inputResearchKey[i].style.borderRadius = "5px 5px 0 0";
                fleche[i].style.right = "10%";
                fleche[i].src = "./logo/fleche-haut.svg";
                tags[i].style.display = "block";
            }

            else {
                isOpen[i] = true;
                inputResearchKey[i].value = inputResearchKey[i].id;
                closeResearchArea(i);
            };         
        })
    }
}

function displayResearchKey() {

    for (let i = 0; i < inputResearchKey.length; i++) {

        inputResearchKey[i].addEventListener("input", (e) => {
            handleInputKeywordl(e, i)
        });
    }
}

focusResearchKey();
openResearchKey();
displayResearchKey();
createUnitList();
displayTags();

/* Sélection d'un ou plusieurs tags */


for (let i = 0; i < tagUnit.length; i++) {

    tagUnit[i].addEventListener("click", (e) => {

        let index = 0;
        arrayTagsSelected.push(e.target.textContent);

        const tag = document.createElement('li');
        tag.className = "tag-selected";
        tag.textContent = `${e.target.textContent}`;
        const exit = document.createElement("span");
        exit.className = "exit-tag";
        exit.textContent = "x";
        tag.appendChild(exit);

        /**** Suppression d'un tag au click sur la croix */
        exit.addEventListener("click", () => {
                
            arrayTagsSelected.splice();
            exit.parentNode.remove();
            displayTagsSelected();

        })

        if ( i < 130 ) {
            tag.id = "ing";
            tag.style.border = "1px solid #3282F7";
            tag.style.color = "white";
            tag.style.backgroundColor = "#3282F7";
        }

        else if ( i < 141 ) {
            index = 1;
            tag.id = "app";
            tag.style.border = "1px solid #00D0A0";
            tag.style.color = "white";
            tag.style.backgroundColor = "#00D0A0";
        }

        else {
            index = 2;
            tag.id = "ust";
            tag.style.border = "1px solid #ED3333";
            tag.style.color = "white";
            tag.style.backgroundColor = "#ED3333";
        }

        tagSelected.appendChild(tag);

        closeResearchArea(index);
        displayTagsSelected();
   
    })
}