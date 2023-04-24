const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

const newImage = document.createElement("img");
newImage.setAttribute("src", "https://placeimg.com/200/200/animals");
newImage.setAttribute("alt", "Description of image");
document.body.appendChild(newImage);

const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

const newH2 = document.createElement("h2");
newH2.innerText = "CSE 121b";
const newSectionParagraph = document.createElement("p");
newSectionParagraph.innerText = "Welcome to JavaScript Languange";
const newSection = document.createElement("section");
newSection.appendChild(newH2);
newSection.appendChild(newSectionParagraph);
document.body.appendChild(newSection);