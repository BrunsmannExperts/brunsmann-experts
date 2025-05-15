
let chapterList = document.getElementById('chapterList');
let chapterTitle = document.getElementById('chapterTitle');
let fieldsArea = document.getElementById('fieldsArea');
let chapters = {};

function addChapter() {
    let chapterName = prompt("Naam van hoofdstuk?");
    if (chapterName) {
        let li = document.createElement('li');
        li.textContent = chapterName;
        li.onclick = function() {
            selectChapter(chapterName);
        };
        chapterList.appendChild(li);
        chapters[chapterName] = [];
    }
}

function selectChapter(name) {
    chapterTitle.textContent = name;
    showFields(name);
    showAddFieldButton(name);
}

function showFields(name) {
    fieldsArea.innerHTML = "";
    chapters[name].forEach(field => {
        let fieldDiv = document.createElement('div');
        fieldDiv.className = "field";
        fieldDiv.innerHTML = field.label + ": [" + field.type + "] (" + field.tags + ")";
        fieldsArea.appendChild(fieldDiv);
    });
}

function showAddFieldButton(name) {
    let btn = document.createElement('button');
    btn.textContent = "+ Veld toevoegen";
    btn.onclick = function() {
        addField(name);
    };
    fieldsArea.appendChild(btn);
}

function addField(chapter) {
    let fieldName = prompt("Naam veld?");
    let fieldType = prompt("Type veld? (GRVVMS / Ja/Nee / Getal / Tekst)");
    let fieldTags = prompt("Tags? (bijv. Zeilboot, Staal, etc.)");
    if (fieldName) {
        chapters[chapter].push({
            label: fieldName,
            type: fieldType,
            tags: fieldTags
        });
        showFields(chapter);
        showAddFieldButton(chapter);
    }
}
