
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
    fieldsArea.innerHTML = "";

    let form = document.createElement('div');
    form.innerHTML = `
        <h3>Nieuw veld toevoegen aan "${chapter}"</h3>
        <label>Naam veld:</label><br>
        <input type="text" id="fieldName"><br><br>

        <label>Type veld:</label><br>
        <select id="fieldType">
            <option>GRVVMS</option>
            <option>Ja/Nee</option>
            <option>Getal</option>
            <option>Tekst</option>
        </select><br><br>

        <label>Tags:</label><br>
        <input type="checkbox" value="Zeilboot"> Zeilboot
        <input type="checkbox" value="Motorboot"> Motorboot
        <input type="checkbox" value="Staal"> Staal
        <input type="checkbox" value="Polyester"> Polyester<br><br>

        <button onclick="saveField('${chapter}')">Opslaan veld</button>
    `;
    fieldsArea.appendChild(form);
}

function saveField(chapter) {
    let fieldName = document.getElementById('fieldName').value;
    let fieldType = document.getElementById('fieldType').value;
    let tags = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value).join(", ");

    if (fieldName) {
        chapters[chapter].push({
            label: fieldName,
            type: fieldType,
            tags: tags
        });
        selectChapter(chapter);
    } else {
        alert("Voer een veldnaam in.");
    }
}
