document.querySelector("button").addEventListener("click", function (event) {
  event.preventDefault();
  // clear pokemon-viewport
  document.querySelector("#pokemon-viewport").innerHTML = "";
  const pokemon = document.querySelector("input").value.toLowerCase();
  getPokemonImage(pokemon);
  document.querySelector("input").value = "";
});

function getPokemonImage(pokemon) {
  const apiData = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    name: pokemon,
  };

  const { url, type, name } = apiData;
  const apiUrl = url + type + "/" + name;

  // instantiate a request object
  var request = new XMLHttpRequest();
  // open the XMLHttpRequest Object
  request.open("GET", apiUrl, true);
  // specifying what to do when the data is loaded

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response);
      // target the viewport
      pokeviewport = document.getElementById("pokemon-viewport");
      // make an image element and assign the data source
      pokeImg = document.createElement("img");
      pokeImg.src = data.sprites.front_default;
      pokeImg.width = 150;
      pokeImg.height = 150;

      let name = document.createElement("h2");
      name.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      name.style.display = "block";
      name.style.width = "100%";
      name.style.height = "35px";
      name.style.backgroundColor = "darkseagreen";
      name.style.borderStyle = "solid";
      name.style.borderWidth = "4px 4px 0px";
      name.style.textAlign = "center";
      name.style.padding = "10px";

      let pokeInfo = document.createElement("div");
      pokeInfo.setAttribute("id", "pokeinfo");
      // get the name and some information
      // bio
      let pokeBio = document.createElement("div");
      pokeBio.innerHTML += `<h4>Bio:</h4>`;
      pokeBio.innerHTML += `<div> Height: ${data.height}</div>`;
      pokeBio.innerHTML += `<div> Weight: ${data.weight}</div>`;

      // ability info
      let pokeAbilities = document.createElement("div");
      pokeAbilities.innerHTML += `<h4>Abilities:</h4>`;
      // append each ability into pokeInfo
      let abilities = data.abilities;
      abilities.forEach((e) => {
        pokeAbilities.innerHTML += `<div>${e.ability.name}</div>`;
      });
      // put ability and bio together in pokeinfo
      pokeInfo.appendChild(pokeBio);
      pokeInfo.appendChild(pokeAbilities);

      // appending
      pokeviewport.appendChild(pokeImg);
      pokeviewport.appendChild(name);
      pokeviewport.appendChild(pokeInfo);
    } else {
      pokeviewport = document.getElementById("pokemon-viewport");
      pokeviewport.innerHTML = `<h3>Pokemon doesn't exist</h3>`;
    }
  };
  // send the request
  request.send();
}
