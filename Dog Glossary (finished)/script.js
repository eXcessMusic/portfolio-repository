const buttonRandom = document.getElementById('button-random-dog');
const buttonBreed = document.getElementById('button-show-breed');
const buttonSubBreed = document.getElementById('button-show-sub-breed');
const breedContext = document.getElementById("input-breed")
const content = document.getElementById('content');

buttonRandom.addEventListener('click', () => {
    content.innerHTML = '';
    const img = document.createElement('img');
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            img.src = data.message;
            content.appendChild(img);
        });
});

buttonBreed.addEventListener("click", () => {
    content.innerHTML = '';
    const img = document.createElement('img');
    const breed = breedContext.value.toLowerCase();
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then((dog) => {
            if (dog["status"] === "error") {
                content.innerHTML = "<p>Breed not found!</p>";
            } else {
                img.src = dog["message"]
                content.appendChild(img);
            }
        });
});

buttonSubBreed.addEventListener('click', () => {
    content.innerHTML = '';
    const breed = breedContext.value.toLowerCase().trim();
    fetch(`https://dog.ceo/api/breed/${breed}/list`)
        .then(response => {
            if (response.status === 404) {
                throw new Error('Breed not found!');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'error') {
                const p = document.createElement('p');
                p.textContent = data.message;
                content.appendChild(p);
            } else {
                if (data.message.length === 0) {
                    const p = document.createElement('p');
                    p.textContent = 'No sub-breeds found!';
                    content.appendChild(p);
                } else {
                    const ol = document.createElement('ol');
                    data.message.forEach(subBreed => {
                        const li = document.createElement('li');
                        li.textContent = subBreed;
                        ol.appendChild(li);
                    });
                    content.appendChild(ol);
                }
            }
        })
        .catch(error => {
            content.innerHTML = '';
            const p = document.createElement('p');
            p.textContent = error.message;
            content.appendChild(p);
        });
});

const buttonShowAll = document.getElementById('button-show-all');

buttonShowAll.addEventListener("click", async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = "";

    const breedsList = document.createElement("ol");

    for (const breed in data.message) {
        const breedItem = document.createElement("li");
        breedItem.textContent = breed;

        const subBreeds = data.message[breed];
        if (subBreeds.length > 0) {
            const subBreedsList = document.createElement("ul");
            subBreeds.forEach((subBreed) => {
                const subBreedItem = document.createElement("li");
                subBreedItem.textContent = subBreed;
                subBreedsList.appendChild(subBreedItem);
            });
            breedItem.appendChild(subBreedsList);
        }

        breedsList.appendChild(breedItem);
    }

    contentDiv.appendChild(breedsList);
});
