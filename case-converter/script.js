document.getElementById("upper-case").addEventListener("click", function () {
    let words = document.getElementById("input").value.toUpperCase();
    document.getElementById("input").value = words;
});

document.getElementById("lower-case").addEventListener("click", function () {
    let words = document.getElementById("input").value.toLowerCase();
    document.getElementById("input").value = words;
});

function properCase(element){
    return element.toLowerCase().replace(/^(.)|\s(.)/g,
        function($1) { return $1.toUpperCase(); });
}

document.getElementById("proper-case").addEventListener("click", function() {
    let element = document.querySelector("textarea");
    element.value = properCase(element.value);
});

function sentenceCase(element){
    return element.toLowerCase().replace(/^(.)|\.(\s)*(.)/g,
        function ($1) {return $1.toUpperCase();});
}

document.getElementById("sentence-case").addEventListener("click", function() {
    let element = document.querySelector("textarea");
    element.value = sentenceCase(element.value);
});

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
document.getElementById("save-text-file").addEventListener("click", function() {
    let text = document.querySelector("textarea").value;
    let filename = "text.txt"
    download(filename ,document.querySelector("textarea").value);
}, false);

// Get references to the textarea and button
const textArea = document.getElementById('input'); // Change 'textArea' to 'input'
const saveButton = document.getElementById('save-text-file'); // Change 'saveButton' to 'save-text-file'

// Function to check the textarea content and enable/disable the button accordingly
function checkTextArea() {
    if (textArea.value.trim() !== '') {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
}

