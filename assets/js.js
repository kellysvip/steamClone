const errorMessage = document.querySelector('.error-message');
const searchBtn = document.querySelector('.search-btn')


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
//END - GET GAMES BY NAME

//BEGIN - GET GAMES BY GENRES
const getGamesByGenres = async (obj) => {
    // save value to nav-search
    document.querySelector('#nav-search').value = obj.value //get value in html element
    await renderGamesSearch()
}
//END - GET GAMES BY GENRES
const getGamesByPage = async (obj) => {
    //create input element id='nav-search-page' and hide it (display: none)
    document.querySelector('#nav-search-page').value = obj.value //get value in html element
    await renderGamesSearch()
}

searchBtn.addEventListener('click', () => {
    renderGamesSearch()
})

//Click to see more info
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






