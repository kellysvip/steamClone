const errorMessage = document.querySelector('.error-message');
const searchBtn = document.querySelector('.search-btn')


//BEGIN - GET ALL GAME
const getAllGames = async () => {
    try {
        const url = `https://cs-steam-game-api.herokuapp.com/games
        `
        //here is how we add a dynamic value (API KEY) to the url
        const res = await fetch(url)
        const data = await res.json()
        // console.log("data", data) //have a look the retrieved data
        return data
    } catch (error) {
        console.log('error', error)
    }

}

const renderGames = async () => {
    document.querySelector('#nav-search').value =''
    try {
        errorMessage.style.display = 'flex'
        const data = await getAllGames()
        const gamesList = document.getElementById("content")
        const ulGamesList = gamesList.children[1]
        ulGamesList.innerHTML = ""

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
            ulGamesList.appendChild(x)
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
        const genres = await res.json()
        // console.log("genres", genres) //have a look the retrieved data
        return genres
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
        //here is how we add a dynamic value (API KEY) to the url
        const res = await fetch(url)
        const gameByName = await res.json()

        // console.log("gameByName", gameByName) //have a look the retrieved data
        return gameByName
    } catch (error) {
        console.log('error', error)
    }

}
const renderGamesSearch = async () => {
    try {
        errorMessage.style.display = 'flex'
        const gameByName = await getGamesByName()
        const gamesListByName = document.getElementById("content")
        const ulGamesListByName = gamesListByName.children[1]
        ulGamesListByName.innerHTML = ""

        gameByName.data.forEach((game) => {

            const x = document.createElement("div")
            x.innerHTML = `
            <div id=${game.appid} onClick="getGamesByClick(this)" class="game-wrraper">
                <divclass="cover">
                    <img  src="${game.header_image}"
                        alt="">
                    <div class="game-info">
                        <p>${game.name}</p>
                        <p>${game.price}$</p>
                    </div>
                </divclass=>
            </div>    
            `;
            
            ulGamesListByName.appendChild(x)
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
    // console.log(obj.value)
    document.querySelector('#nav-search').value = obj.value //get value in html element
    renderGamesSearch()
}
//END - GET GAMES BY GENRES
getGamesByName()
const getGamesByPage = async (obj) => {
    //create input element id='nav-search-page' and hide it (display: none)
    document.querySelector('#nav-search-page').value = obj.value //get value in html element
    renderGamesSearch()
}

searchBtn.addEventListener('click', () => {
    renderGamesSearch()
})

//Click to see more info
const getGamesByClick = async (obj) => {
    // save value to nav-search-click
    console.log(obj.id)
    document.querySelector('#nav-search-click').value = obj.id
    renderGamesByClick()
    //get value in html element
    
}
const renderGamesByClick = async () => {
    try {
        errorMessage.style.display = 'flex'
        const click = await getGamesByName() || getAllGames()
        const gamesListByClick = document.getElementById("content")
        const ulGamesListByClick = gamesListByClick.children[1]
        ulGamesListByClick.innerHTML = ""
        console.log('done')
        click.data.forEach((game) => {
            if (game.appid === document.querySelector('#nav-search-click').value){
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
            ulGamesListByClick.appendChild(x)
            }
        })
        errorMessage.style.display = 'none';
    } catch (err) {
        console.log("err", err)
    }
}






