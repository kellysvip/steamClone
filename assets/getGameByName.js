//BEGIN - GET GAMES BY NAME
//get list games by search, genres and page
const getGamesByName = async () => {
    try {
        const url = `https://cs-steam-game-api.herokuapp.com/games?q=${document.querySelector('#nav-search').value}&page=${document.querySelector('#nav-search-page').value}
        `
        const res = await fetch(url)
        return await res.json()
    } catch (error) {
        console.log('error', error)
    }

}
const renderGamesSearch = async () => {
    try {
        errorMessage.style.display = 'flex'
        const gameByName = await getGamesByName()
        const listByName = document.getElementById("game-list")
        listByName.innerHTML = ""
        gameByName.data.forEach((game) => {
            const x = document.createElement("div")
            x.innerHTML = `
            <div id=${game.appid} onClick="getGamesByClick(this)" class="game-wrraper">
                <div class="cover">
                    <img  src="${game.header_image}"
                        alt="">
                    <div class="game-info">
                        <p>${game.name}</p>
                        <p>${game.price}$</p>
                    </div>
                </div>
            </div>    
            `;

            listByName.appendChild(x)
        })
        errorMessage.style.display = 'none';
    } catch (err) {
        console.log("err", err)
    }
}

searchBtn.addEventListener('click', () => {
    renderGamesSearch()
})
//END - GET GAMES BY NAME