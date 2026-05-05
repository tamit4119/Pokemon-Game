async function getPokemon(pokemon_1, pokemon_2) {
  try {
    const response1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_1}`,
    );
    if (!response1.ok) {
      throw new Error("Pokemon 1 not present");
    }
    const response2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_2}`,
    );
    if (!response2.ok) {
      throw new Error("Pokemon 2 not present");
    }
    const pokeData1 = await response1.json();
    const pokeData2 = await response2.json();

    displayPokemon(pokeData1, pokeData2);
  } catch (err) {
    console.error(err);
  }
}

let p1_score = 0;
let p2_score = 0;

function displayPokemon(pokemon_1, pokemon_2) {
  const player1Score = document.getElementById("p1_score");
  const image1 = document.getElementById("img1");
  const name1 = document.getElementById("name1");
  const experience1 = document.getElementById("experience1");
  const abilities1 = document.getElementById("abilities1");

  const player2Score = document.getElementById("p2_score");
  const image2 = document.getElementById("img2");
  const name2 = document.getElementById("name2");
  const experience2 = document.getElementById("experience2");
  const abilities2 = document.getElementById("abilities2");

  if (pokemon_1.base_experience > pokemon_2.base_experience) {
    p1_score++;
  } else if (pokemon_2.base_experience > pokemon_1.base_experience) {
    p2_score++;
  }

  player1Score.textContent = `Score: ${p1_score}`;
  image1.src = pokemon_1.sprites.other["official-artwork"].front_default;
  name1.textContent = pokemon_1.name;
  experience1.textContent = `XP: ${pokemon_1.base_experience}`;
  abilities1.innerHTML = "";
  pokemon_1.abilities.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.ability.name;
    abilities1.appendChild(li);
  });

  player2Score.textContent = `Score: ${p2_score}`;
  image2.src = pokemon_2.sprites.other["official-artwork"].front_default;
  name2.textContent = pokemon_2.name;
  experience2.textContent = `XP: ${pokemon_2.base_experience}`;
  abilities2.innerHTML = "";
  pokemon_2.abilities.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.ability.name;
    abilities2.appendChild(li);
  });
}

const fightBtn = document.getElementById("fight");

fightBtn.addEventListener("click", () => {
  let pokemon_1 = Math.floor(Math.random() * 1025 + 1);
  let pokemon_2 = Math.floor(Math.random() * 1025 + 1);

  document.getElementById("player1").style.display = "block";
  document.getElementById("player2").style.display = "block";
  getPokemon(pokemon_1, pokemon_2);
});
