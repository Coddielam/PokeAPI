document.querySelector("button").addEventListener("click", function () {
  const pokemon = document.querySelector("input").value;
  getPokemonImage(pokemon);
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
    var data = JSON.parse(this.response);

    let div = document.createElement("div");
    div.setAttribute("class", "pokemon-info");
    console.log(div);
    let pokeImg = document.createElement("img");
    pokeImg.src = String(data.sprites.front_default);

    div.appendChild(pokeImg);

    document.querySelector("#root").append(div);
    // console.log(data.sprites.front_default);
  };
  // send the request
  request.send();
}
