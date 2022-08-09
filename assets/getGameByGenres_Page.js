const getGamesByGenres = async (obj) => {
    // save value to nav-search
    document.querySelector('#nav-search').value = obj.value //get value in html element
    await renderGamesSearch()
}

const getGamesByPage = async (obj) => {
    //create input element id='nav-search-page' and hide it (display: none)
    document.querySelector('#nav-search-page').value = obj.value //get value in html element
    await renderGamesSearch()
}

const getGamesByClick = async (obj) => {
    // save value to nav-search-click
    document.querySelector('#nav-search-click').value = obj.id
    await renderGamesByClick()

}
const renderGamesByClick = async () => {
    try {
        errorMessage.style.display = 'flex'
        const click = await getGamesByName() || getAllGames()
        const gamesListByClick = document.getElementById("game-list")
        gamesListByClick.innerHTML = ""

        click.data.forEach((game) => {
            if (game.appid === document.querySelector('#nav-search-click').value) {
                const x = document.createElement("div")
                x.innerHTML = `
            <div id=${game.appid}  class="game-wrraper-click">
                    <div class="cover-click">
                        <img src="${game.header_image}"
                            alt="">
                        <div class="game-info-click">
                            <p>${game.name}</p>
                            <p>${game.price}$</p>
                        </div>
                        <p>Developer: ${game.developer}</p>
                        <p>Genres: ${game.genres}</p>
                    </div>
                </div>   
            `;
                gamesListByClick.appendChild(x)
            }
        })
        errorMessage.style.display = 'none';
    } catch (err) {
        console.log("err", err)
    }
}