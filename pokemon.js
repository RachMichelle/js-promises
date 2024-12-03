let names;

function get_pokemon() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then(res => {
            return Promise.all([
                axios.get(res.data.results[10].url),
                axios.get(res.data.results[796].url),
                axios.get(res.data.results[413].url)
            ])
        })
        .then(pokemon => {
            // pokemon.forEach(p => {
            //     // console.log(p.data)
            // })
            names=pokemon.map(p => p.data.name)
            return Promise.all(pokemon.map(p => axios.get(p.data.species.url)))
        })
        .then(species => {
            // species.forEach(s=>console.log(s.data))
            let descriptions = species.map(s => s.data.flavor_text_entries.find(entry => entry.language.name === 'en'));
            // console.log(descriptions)
            descriptions.forEach((d,i) => console.log(`${names[i]} : ${d.flavor_text}`))
            })
        .catch(err => console.log(err))
        }