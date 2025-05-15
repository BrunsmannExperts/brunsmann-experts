
let chapterList = document.getElementById('chapterList');
let chapterTitle = document.getElementById('chapterTitle');
let fieldsArea = document.getElementById('fieldsArea');
let chapters = {};

function addChapter() {
    fieldsArea.innerHTML = "";

    let form = document.createElement('div');
    form.innerHTML = `
        <h3>Nieuw hoofdstuk toevoegen</h3>
        <label>Naam hoofdstuk:</label><br>
        <input type="text" id="chapterName"><br><br>

        <label>Kies bovenhoofdstuk:</label><br>
        <select id="parentChapter">
            <option>Romp</option>
            <option>Dek</option>
            <option>Interieur</option>
            <option>Tuigage</option>
            <option>Technische installatie</option>
            <option>Elektrische installatie</option>
            <option>Veiligheidsmiddelen</option>
        </select><br><br>

        <label>Tags:</label><br>
        <input type="checkbox" value="Zeilboot"> Zeilboot
        <input type="checkbox" value="Motorboot"> Motorboot
        <input type="checkbox" value="Staal"> Staal
        <input type="checkbox" value="Polyester"> Polyester<br><br>

        <label>Direct standaard vragen invullen (scheiden met komma):</label><br>
        <textarea id="defaultFields" placeholder="Bijv: Vochtmeting, Osmose, Delaminatie"></textarea><br><br>

        <button onclick="saveChapter()">Opslaan hoofdstuk</button>
    `;
    fieldsArea.appendChild(form);
}

function saveChapter() {
    let name = document.getElementById('chapterName').value;
    let parent = document.getElementById('parentChapter').value;
    let tags = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value).join(", ");
    let defaultFields = document.getElementById('defaultFields').value.split(',');

    if (name) {
        let chapterFullName = parent + " - " + name;
        let li = document.createElement('li');
        li.textContent = chapterFullName;
        li.onclick = function() {
            selectChapter(chapterFullName);
        };
        chapterList.appendChild(li);

        chapters[chapterFullName] = [];

        defaultFields.forEach(field => {
            if (field.trim() !== "") {
                chapters[chapterFullName].push({
                    label: field.trim(),
                    type: "GRVVMS",
                    tags: tags
                });
            }
        });

        selectChapter(chapterFullName);
    } else {
        alert("Voer een naam voor het hoofdstuk in.");
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

function showReport() {
    fieldsArea.innerHTML = "<h2>Rapport van bevindingen</h2>";
    for (let chapter in chapters) {
        let chapterBlock = document.createElement('div');
        chapterBlock.innerHTML = `<h3>${chapter}</h3>`;
        
        chapters[chapter].forEach(field => {
            let fieldDiv = document.createElement('div');
            fieldDiv.className = "field";
            fieldDiv.innerHTML = `<strong>${field.label}</strong> (${field.type})<br><i>Tags: ${field.tags}</i><br><hr>`;
            chapterBlock.appendChild(fieldDiv);
        });

        fieldsArea.appendChild(chapterBlock);
    }
}

let reportBtn = document.createElement('button');
reportBtn.textContent = "Bekijk rapport";
reportBtn.onclick = showReport;
document.getElementById('sidebar').appendChild(reportBtn);
