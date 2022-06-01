let fromText = document.querySelector("#fromText");
let toText = document.querySelector("#toText");
let sourceLanguage = "ja";
let targetLanguage = "en";
var saveBtn = document.getElementById('save');
var savedList = document.getElementById('translationList');

let base_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";
let audio_url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=";

// reset contents
document.getElementById('reset').addEventListener('click', () => {
    console.log("Reset button is clicked");
    fromText.value = "";
    toText.value = "";
});

//make apiRequest
const makeApiRequest = (data, method) => {
    let url = base_url + sourceLanguage + "&tl=" + targetLanguage + "&dt=t&q=" + encodeURI(data);
 fetch(url)
.then(response => response.json())
.then(data => {
  let translatedText = "";
  data[0].forEach(data => {
    translatedText += data[0];
  });
  
  toText.value = translatedText;
  console.log(translatedText)
})
.catch(error => console.error(error))
}

let typingTimer;               
//let doneTypingInterval = 1000; 
let myInput = document.getElementById('fromText');

myInput.addEventListener('keyup', () => {
    if(fromText.value != "") {
    toText.placeholder = "Translating....";
    } else {
        toText.placeholder = "Translate";
    }
    clearTimeout(typingTimer);

    if (myInput.value) {
        typingTimer = setTimeout(doneTyping);
    }
});


function doneTyping () {
    makeApiRequest(fromText.value, "GET");
}

document.getElementById('save').addEventListener('click', () => {
    console.log("save button is clicked");
    let japanese = fromText.value;
    let english = toText.value;

    addTranslation(japanese, english);
});

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

//Load the saved tasks
let translationListArray = JSON.parse(localStorage.getItem("translations")) || [];
//Render saved tasks
translationListArray.forEach(renderTranslation);


function renderTranslation(translation){
    let item = document.createElement('li');
    item.classList.add('translation');
    item.setAttribute('data-id', translation.id);

    item.innerHTML = `
      <p class="savedFromText">${translation.japanese}</p>
      <p class="savedToText">${translation.english}</p>
      `
      savedList.appendChild(item);

    let delButtonIcon = document.createElement("i");
    delButtonIcon.className = "fa-solid fa-trash-can";
    item.append(delButtonIcon);

    delButtonIcon.addEventListener("click", function (event) {
        let id = event.target.parentElement.getAttribute('data-id');
        let index = translationListArray.findIndex(translation => translation.id === Number(id));
        removeItemFromArray(translationListArray, index)
        item.remove();
        translationListArray =  translationListArray.filter((e) => e !== item); //Remove saved translation  
        localStorage.setItem("translations", JSON.stringify(translationListArray)) //Update local storage
    });
}

function removeItemFromArray(arr, index) {
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr;
  }

 