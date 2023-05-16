document.getElementById("load").onclick = getFile;
var table = [];
var tableHeaders = [];

function getFile() {
    const input = document.getElementById('input-file');
    if ('files' in input && input.files.length > 0) {
        placeFileContent(document.getElementById('visualization-area'), input.files[0]);
    }
}

function placeFileContent(target, file) {
    target.removeAttribute("hidden");
    readFileContent(file)
        .then(content => {
            target.querySelector("#content").innerHTML = mapCSVtoTable(content);
            target.querySelector("#success-msg").innerText = "File read successfully";
            target.querySelector("#row-count").innerText = `Total: ${table.length} rows`;
        })
        .catch(error => {
            console.log(error);
            target.querySelector("#success-msg").innerText = `An error occurred while reading the file:\n${error}`;
        });
}

function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

function mapCSVtoTable(csvcontent) {
    let html = '';
    html += '<thead>';
    let allTextLines = csvcontent.split(/\r\n|\n/);
    for (line in allTextLines) {
        let curLine = allTextLines[line];
        table.push([]);
        let allfields = curLine.split(",");
        for (field in allfields) {
            if (line == 0) {
                html += `<th>${allfields[field]}</th>`;
                tableHeaders.push(allfields[field]);
            } else {
                html += `<td>${allfields[field]}</td>`;
                table[line - 1].push(allfields[field]);
            }
        }
        if (line == 0) {
            html += '</thead><tbody><tr>';
            table = [];
        } else if (line === allTextLines.length - 1) {
            html += '</tr></tbody>';
        } else {
            html += '</tr><tr>';
        }
    }
    return html;
}

function mapJSONtoTable(data) {
    table = [];
    tableHeaders = [];
    let html = '';
    html += '<thead>';
    for (field of Object.keys(data[0])) {
        html += `<th>${field}</th>`;
        tableHeaders.push(field);
    }
    html += '</thead><tbody><tr>';

    for (idx in data) {
        let item = data[idx];
        table.push([]);
        let allfields = Object.keys(item);
        for (field of allfields) {
            html += `<td>${item[field]}</td>`;
            table[idx].push(item[field])
        }
        html += '</tr><tr>';
    }
    html += '</tr></tbody>';
    return html;
}

function getContent() {
    let mockarooApiKey = '<API-KEY>';
    let url = `https://cors-anywhere.herokuapp.com/http://my.api.mockaroo.com/users.json?key=${mockarooApiKey}`;
    let target = document.getElementById('visualization-area');
    $.ajax({
        url: url,
        responseType: 'application/json',
        success: function (data) {
            target.removeAttribute("hidden");
            target.querySelector("#content").innerHTML = mapJSONtoTable(data);
            target.querySelector("#success-msg").innerText = "Information retrieved successfully"
            target.querySelector("#row-count").innerText = `Total: ${table.length} rows`

        },
        error: function (xhr, status, error) {
            target.querySelector("#success-msg").innerText = `An error occurred while reading the file:\n${error}`
        }
    });
}

document.getElementById("fetch-button").onclick = getContent