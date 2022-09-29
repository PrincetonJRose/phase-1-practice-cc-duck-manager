// write your code here!
const baseUrl = `http://localhost:3000/`
const ducksUrl = baseUrl + 'ducks/'
// const ducksUrl = `http://localhost:3000/ducks`

const newDuckForm = document.getElementById( "new-duck-form" )
newDuckForm.onsubmit = ( e ) => {
    e.preventDefault()
    let newDuck = {
        name: e.target["duck-name-input"].value,
        img_url: e.target["duck-image-input"].value,
        likes: 0,
    }
    createNewDuck( newDuck )
}

getMyMightyDucks()

const createNewDuck = ( newDuck ) => {

    let postRequest = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accepts': 'application/json',
        },
        body: JSON.stringify( newDuck )
    }

    fetch( ducksUrl, postRequest )
    .then( res => res.json() )
    .then( duckData => renderDuckNav( duckData ) )

    newDuckForm.reset()

}


function getMyMightyDucks() {
    fetch( ducksUrl )
    .then( res => res.json() )
    .then( ducksData => renderAllDucks( ducksData ) )
}

function renderAllDucks( ducksData ) {
    ducksData.forEach( duck => renderDuckNav( duck ) )
}

function renderDuckNav( duck ) {
    const duckNav = document.getElementById( 'duck-nav' )
    
    const duckImg = document.createElement( 'img' )
    duckImg.src = duck.img_url
    duckNav.appendChild( duckImg )

    duckImg.onclick = () => renderDuckDetails( duck )
}

function renderDuckDetails( duck ) {
    const duckName = document.getElementById( 'duck-display-name' )
    duckName.textContent = duck.name

    const duckImg = document.getElementById( "duck-display-image" )
    duckImg.src = duck.img_url

    const duckLikesButton = document.getElementById( "duck-display-likes" )
    duckLikesButton.textContent = duck.likes
    
    duckLikesButton.onclick = ( ) => {
        duck.likes += 1
        renderDuckDetails( duck )
    }

    // duckLikesButton.addEventListener( 'click', () => {
    //     duck.likes += 1
    //     console.log( duck )
    //     renderDuckDetails( duck )
    // })

}

