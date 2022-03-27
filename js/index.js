const fetchPokemon = () => {
    const pokemon_name = document.getElementById("pokemon-name").value.toLowerCase();
    console.log(pokemon_name)
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            alert('There is not (yet) a pokemon with that name.');
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if(data.count){
            return alert('Introduce a Name')
        }

        console.log(data);

        const imageDisplay = document.getElementById('pokemon-image');
        const numberDisplay = document.getElementById('pokemon-number');
        const typeDisplay = document.getElementById('type-display-container');
        const weightDisplay = document.getElementById('weight');
        const heightDisplay = document.getElementById('height');
        // const weaknessDisplay = document.getElementById('weakness-display-container');
        const PSDisplay = document.getElementById('PS');
        const ATKDisplay = document.getElementById('ATK');
        const DEFDisplay = document.getElementById('DEF');
        const SPATKDisplay = document.getElementById('SPATK');
        const SPDEFDisplay = document.getElementById('SPDEF');
        const SPEEDDisplay = document.getElementById('SPEED');

        const stats = [PSDisplay, ATKDisplay, DEFDisplay, SPATKDisplay, SPDEFDisplay, SPEEDDisplay];

        // Image
        imageDisplay.src = data["sprites"]["other"]["official-artwork"]["front_default"];
        
        // Number
        numberDisplay.innerText = `#${data.id} - ${data.name.toUpperCase()}`

        // Height
        heightDisplay.innerText = `HEIGHT : ${data.height}`;

        // Weight
        weightDisplay.innerText = `WEIGHT : ${data.weight}`;

        // Type
        while (typeDisplay.firstChild) {
            typeDisplay.removeChild(typeDisplay.firstChild);
        }
        for(val of data.types){
            var type = val.type.name
            // <span class="type-display-container water">WATER</span>
            var newSpan = document.createElement("span");
            var newContent = document.createTextNode(type.toUpperCase());

            newSpan.appendChild(newContent); 
            newSpan.classList.add('type-display-container');
            newSpan.classList.add(type);

            typeDisplay.appendChild(newSpan);
        }
        

        // Stats
        for(const [i, stat] of stats.entries()){
            stat.style.height = getHeight(data.stats[i].base_stat);
        }
    });
}

const getHeight = (value) => {
    return Math.round((77*value/100))+'px'
}