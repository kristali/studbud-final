import { append } from "express/lib/response";

/*//////////////// start CONTENT LIST start ////////////////*/
const contentForm = document.getElementById("contentForm");
const saveBtn = document.querySelector("#contentForm > button")
var contentList = document.getElementById("contentList");

var contentInput = document.getElementById("contentInput");
var contentDescriptionInput = document.getElementById('contentDescriptionInput');
var contentLinkInput = document.getElementById('contentLinkInput');
var groupSelectInput = document.getElementById('groupSelectInput');

contentForm.addEventListener("submit", function(event){
    event.preventDefault();
    let content = contentInput.value;
    let contentDescription = contentDescriptionInput.value;
    let contentLink = contentLinkInput.value;
    let groupSelect = groupSelectInput.value;

    addContentModal.classList.remove("active");
    overlay.classList.remove("active");

    
    addContent(content,contentDescription, contentLink, groupSelect);
    
});

function addContent(contentTitle,contentDescription, contentLink, groupSelect){
    let content = {
        id: Date.now(),
        contentTitle,
        contentDescription,
        contentLink,
        groupSelect,
    };
    console.log(contentListArray)
    contentListArray.push(content);
      //Store new tasks in local storage
    localStorage.setItem("contents", JSON.stringify(contentListArray));
    renderContent(content);
}

//Load the saved tasks
let contentListArray = JSON.parse(localStorage.getItem("contents")) || [];
//Render saved tasks
contentListArray.forEach(renderContent);

function renderContent(content){
    let item = document.createElement("li");
    item.classList.add('content')
    item.setAttribute('data-id', content.id);
    item.innerHTML = `
        <div class="content-details">
            <p>${content.contentTitle}</p>
            <span class="description-tag">${content.contentDescription}</span>
        </div>
        <div class="link-details">
            <a class="content-link" href="${content.contentLink}" target="_blank">${content.contentLink}</a>
        </div>
    `

    contentList.appendChild(item);

    contentForm.reset(); 
}


function removeItemFromArray(arr, index) {
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr;
}





/*//////////////// end CONTENT LIST end ////////////////*/

/*//////////////// start ADD COLUMN start ////////////////*/
const container = document.getElementById("content-container");
const addGroupBtn = document.querySelector("#groupForm > button");
var groupInput = document.getElementById("groupInput");

groupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newGroup = document.createElement('div');
    newGroup.classList.add("content-group-row");
    let groupName = groupInput.value;
    //input user input as column value
    newGroup.setAttribute("value", groupName);

    //Adding DOM elements of columns
    //input user input as tile and id
    newGroup.innerHTML = `
        <div class="group-title">
            <h3 contenteditable="true">${groupName}</h3>
            <button class="btn editCol" style="background:none; color: #404040;"><i class='fa fa-edit'></i></button>
        </div>
        <div id="contentList">
        </div>
    </div>
    `;
    container.append(newGroup);

    //update visibility of modal & overlay form when opened/closed
    addColumnModal.classList.remove("active");
    overlay.classList.remove("active");
  });
  /*//////////////// end ADD COLUMN end ////////////////*/
