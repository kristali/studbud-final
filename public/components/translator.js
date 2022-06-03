/*//////////////// start TRANSLATOR start ////////////////*/

let fromText = document.querySelector("#fromText");
let toText = document.querySelector("#toText");
//Google translate: japanese
let sourceLanguage = "ja";
//Google translate: english
let targetLanguage = "en";
var saveBtn = document.getElementById('save');
var savedList = document.getElementById('translationList');

//Google translate API
let base_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";

// Event Listener: Reset input fields 
document.getElementById('reset').addEventListener('click', () => {
    fromText.value = "";
    toText.value = "";
});

//Sending request to API server
const makeApiRequest = (data, method) => {
    //getting target languages in API
    let url = base_url + sourceLanguage + "&tl=" + targetLanguage + "&dt=t&q=" + encodeURI(data);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //get appropritae data fro translations 
        let translatedText = "";
        data[0].forEach(data => {
        translatedText += data[0];
        });
    //Set translated text according to daata 
    toText.value = translatedText;
    console.log(translatedText)
    })
}

//variable to track user typing 
let typingTimer;    
//variable to get user input           
let myInput = document.getElementById('fromText');

//Event Listner: Starts when user starts typing in input field
myInput.addEventListener('keyup', () => {
    //If there is something inside the input field, change output field placeholder
    if(fromText.value != "") {
    toText.placeholder = "Translating....";
     //If there is not something inside the input field;
    } else {
        toText.placeholder = "Translate";
    }

    //setTimeout function variable of doneTyping is stored and passed in clearTimeout() to clear the timer tracking user typing
    clearTimeout(typingTimer);

    //If there is value in input field, setTimeOut executes doneTyping function;  
    if (myInput.value) {
        typingTimer = setTimeout(doneTyping);
    }
});

//Function: Gets user input and gets API request
function doneTyping () {
    makeApiRequest(fromText.value, "GET");
}

//Event Listener: Get jap and eng values when save button is pressed
document.getElementById('save').addEventListener('click', () => {
    console.log("save button is clicked");
    let japanese = fromText.value;
    let english = toText.value;

    addTranslation(japanese, english);
});

//Function: push & store translations and render on screen
function addTranslation(japanese, english){
    let translation = {
        id: Date.now(),
        japanese,
        english,
    }
    console.log(translation);
    translationListArray.push(translation);

    renderTranslation(translation);

    //Store new tasks in local storage
    localStorage.setItem("translations", JSON.stringify(translationListArray));

}

//Load the saved translations
let translationListArray = JSON.parse(localStorage.getItem("translations")) || [];
//Render the saved translations
translationListArray.forEach(renderTranslation);

//Function: render translation to page when saved 
function renderTranslation(translation){
    //Create list element with translation class to be styled and stored 
    let item = document.createElement('li');
    item.classList.add('translation');
    item.setAttribute('data-id', translation.id);

    //Create inner html
    item.innerHTML = `
      <p class="savedFromText">${translation.japanese}</p>
      <p class="savedToText">${translation.english}</p>
      `
    //Append to saved list container 
    savedList.appendChild(item);

    //Create and append delete icon to translation
    let delButtonIcon = document.createElement("i");
    delButtonIcon.className = "fa-solid fa-trash-can";
    item.append(delButtonIcon);

    //Event Listener: delete translation from array and screen
    delButtonIcon.addEventListener("click", function (event) {
        let id = event.target.parentElement.getAttribute('data-id');
        let index = translationListArray.findIndex(translation => translation.id === Number(id));
        removeItemFromArray(translationListArray, index)
        item.remove();
        translationListArray =  translationListArray.filter((e) => e !== item); //Remove saved translation  
        localStorage.setItem("translations", JSON.stringify(translationListArray)) //Update local storage
    });
}

//Function: removing translation item from storage array
function removeItemFromArray(arr, index) {
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr;
  }

 /*//////////////// end TRANSLATOR end ////////////////*/
