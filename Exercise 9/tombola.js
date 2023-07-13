const tabellone = document.getElementById("tabellone");
const button = document.querySelector("button");

for (let i = 0; i < 76; i++) {
  const tabDiv = document.createElement("div");
  tabDiv.classList.add("tab-Div");
  const divH3 = document.createElement("h3");
  divH3.innerText = i + 1;
  tabellone.appendChild(tabDiv);
  tabDiv.appendChild(divH3);
}

const randomNumber = () => {
  let numeroEstratto = Math.ceil(Math.random() * 76);
  console.log(numeroEstratto);

  let numbers = document.querySelectorAll(".tab-Div h3");
  let divs = document.querySelectorAll(".tab-Div");
  let numeriEstratti = [];
  for (let j = 0; j < numbers.length; j++) {
    if (numbers[j].innerText === numeroEstratto.toString()) {
      divs[j].classList.add("selected");
    }
  }
};
button.onclick = randomNumber;

const tabelloneUser = document.getElementById("tabellone-user");

for (let i = 0; i < 24; i++) {
  const tabDivUser = document.createElement("div");
  tabDivUser.classList.add("tab-Div");
  const tabH3 = document.createElement("h3");
  tabH3.innerText = Math.ceil(Math.random() * 76);
  tabelloneUser.appendChild(tabDivUser);
  tabDivUser.appendChild(tabH3);
}
