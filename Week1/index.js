const { fetch } = require('native-fetch');

fetch('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json')
    .then(res => res.json())
    .then(data => map(data.data))

function map(data){
    //per item in the API gets to be in loop using .map
    console.log(data)
    Object.entries(data).map(({id, key}) => {
        // console.log(`id: ${id}`)
        // console.log(`key: ${key}`)
    })
}
