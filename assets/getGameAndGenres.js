//BEGIN - GET ALL GAME
const getAllGames = async () => {
    try {
        const url = `https://cs-steam-game-api.herokuapp.com/games`
        const res = await fetch(url)
        return await res.json()
    } catch (error) {
        console.log('error', error)
    }
}

const renderGames = async () => {
    document.querySelector('#nav-search').value = ''
    try {
        errorMessage.style.display = 'flex'
        const data = await getAllGames()
        const gamesList = document.getElementById("game-list")
        gamesList.innerHTML = ""
        data.data.forEach((game) => {
            const x = document.createElement("div")
            x.innerHTML = `
            <div id=${game.appid} onClick="getGamesByClick(this)" class="game-wrraper">
                <div class="cover">
                    <img src="${game.header_image}"
                        alt="">
                    <div class="game-info">
                        <p>${game.name}</p>
                        <p>${game.price}$</p>
                    </div>
                </div>
            </div>    
            `;
            gamesList.appendChild(x)
        })
        errorMessage.style.display = 'none';
    } catch (err) {
        console.log("err", err)
    }
}
//END- GET ALL GAME

//BEGIN - GET SOME GENRES
const getGenres = async () => {
    try {
        const url = `https://cs-steam-game-api.herokuapp.com/genres?page=2`
        //here is how we add a dynamic value (API KEY) to the url
        const res = await fetch(url)
        return await res.json()
    } catch (error) {
        console.log('error', error)
    }

}
const renderGenres = async () => {
    try {
        const genres = await getGenres()
        const genresList = document.getElementById("game-type")
        let temp = 0;
        genres.data.forEach((gen) => {
            temp++
            const x = document.createElement("ul")
            x.innerHTML = `
            <li><button value=${gen.name} onClick="getGamesByGenres(this);" class="btn-game-type">${gen.name}</button></li>
            `;
            //lay value de tra ve gia tri khi click
            if (temp < 7)
                genresList.appendChild(x)
        })

    } catch (err) {
        console.log("err", err)
    }
}
//END - GET 6 GNERES
renderGames()
renderGenres()