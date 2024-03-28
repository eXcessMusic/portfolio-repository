// Upper Case Function
document.getElementById("upper-case").addEventListener("click", function () {
    let words = document.getElementById("input").value.toUpperCase();
    document.getElementById("input").value = words;
});

// Lower Case Function
document.getElementById("lower-case").addEventListener("click", function () {
    let words = document.getElementById("input").value.toLowerCase();
    document.getElementById("input").value = words;
});

// Proper Case Function
function properCase(element){
    return element.toLowerCase().replace(/^(.)|\s(.)/g,
        function($1) { return $1.toUpperCase(); });
}

document.getElementById("proper-case").addEventListener("click", function() {
    let element = document.querySelector("textarea");
    element.value = properCase(element.value);
});

// Sentence Case Function
function sentenceCase(element){
    return element.toLowerCase().replace(/^(.)|\.(\s)*(.)/g,
        function ($1) {return $1.toUpperCase();});
}

document.getElementById("sentence-case").addEventListener("click", function() {
    let element = document.querySelector("textarea");
    element.value = sentenceCase(element.value);
});

// Download Function
function downloadFile() {
    // Ask the user for the desired file name
    let filename = window.prompt("Please enter the desired file name (without extension):");

    // If the user cancels or inputs an empty name, exit the function
    if (!filename) return;

    // Add the .txt extension to the file name
    filename += ".txt";

    // Get the text content to be downloaded
    let textContent = document.querySelector("textarea").value;

    // Create a new anchor element
    let element = document.createElement('a');

    // Set the href attribute to the data URI containing the text content
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));

    // Set the download attribute to the specified file name
    element.setAttribute('download', filename);

    // Hide the anchor element
    element.style.display = 'none';

    // Append the anchor element to the document body
    document.body.appendChild(element);

    // Click the anchor element to trigger the download
    element.click();

    // Remove the anchor element from the document body
    document.body.removeChild(element);
}

document.getElementById("save-text-file").addEventListener("click", downloadFile);


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

