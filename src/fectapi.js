function buttonClicked(){
    var movie = document.getElementById('movie').value;
    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${movie}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById('poster').src = data.Poster
    })
    window.location.href = `search.html?query=${movie}`;
}

FanFavourite();
TopMovies();
TopTVSeries();

function fetchAndRenderMovie(url, posterId, titleId) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {   
            console.log(data);
            document.getElementById(posterId).src = data.Poster;
            document.getElementById(titleId).innerHTML = data.Title;
        });
}

function FanFavourite() {
    fetchAndRenderMovie('https://www.omdbapi.com/?apikey=c1aecf62&t=Inception', "Poster1", "Title1");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=Kung Fu Panda 4", "Poster2", "Title2");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&i=tt0903747", "Poster3", "Title3");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&i=tt6226232", "Poster4", "Title4");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=Oppenheimer", "Poster5", "Title5");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&i=tt7366338", "Poster6", "Title6");
}

function TopMovies(){
    fetchAndRenderMovie('https://www.omdbapi.com/?apikey=c1aecf62&i=tt15239678', "Poster11", "Title11");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=Dune", "Poster12", "Title12");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=Poor Things", "Poster13", "Title13");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=Madame Web", "Poster14", "Title14");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&i=tt26047818", "Poster15", "Title15");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&i=tt4978420", "Poster16", "Title16");
}

function TopTVSeries(){
    fetchAndRenderMovie('https://www.omdbapi.com/?apikey=c1aecf62&i=tt2788316', "Poster111", "Title111");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&i=tt9018736", "Poster112", "Title112");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=True Detective", "Poster113", "Title113");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=One Day", "Poster114", "Title114");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=Halo", "Poster115", "Title115");
    fetchAndRenderMovie("https://www.omdbapi.com/?apikey=c1aecf62&t=Constellation", "Poster116", "Title116");
}

function redirectToMovieDetail(titles){
    window.location.href = `result.html?titles=${titles}`
}

var urlParams = new URLSearchParams(window.location.search);
var movieTitle = urlParams.get('titles');
var movieId = urlParams.get('movieId');

if (movieTitle) {
    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${movieTitle}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateUI(data);
        });
} else if (movieId) {
    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${movieId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateUI(data);
        });
} else {
    console.error('No movie title or ID provided in the URL.');
}

function updateUI(data){
    document.getElementById('title').innerHTML = `Title: ${data.Title}`;
    document.getElementById('year').innerHTML = `Date Release: ${data.Released}`;
    document.getElementById('posters').src = data.Poster;
    document.getElementById('genre').innerHTML = `Genre: ${data.Genre}`;
    document.getElementById('about').innerHTML = `About: ${data.Plot}`;
    document.getElementById('language').innerHTML = `Language: ${data.Language}`;
    document.getElementById('director').innerHTML = `Director: ${data.Director}`;
    document.getElementById('actor').innerHTML = `Actors: ${data.Actors}`
    document.getElementById('writer').innerHTML = `Writer: ${data.Writer}`
    document.getElementById('award').innerHTML = `Awards: ${data.Awards}`
    document.getElementById('ratings').innerHTML = `Rating: ${data.imdbRating}/10`
}

function create(){
    var name = document.getElementById('name').value;
    var rating = document.getElementById('rating').value;
    var suggestion = document.getElementById('suggestion').value;
    localStorage.setItem(name, JSON.stringify({name, rating, suggestion}))
    alert('Suggestion Posted')
}

function read(){
    var name = document.getElementById('name').value
    var data = localStorage.getItem(name)
    if (data){
        var {name, rating, suggestion} = JSON.parse(data)
        document.getElementById('details').textContent = `Name: ${name} \n Your Rating: ${rating}/10 \n Your Suggestion: ${suggestion}`
    }
}

function remove(){
    var name = document.getElementById('name').value
    localStorage.removeItem(name)
    alert('Suggestion Removed')
}

function load(){
    var details = document.getElementById('list').value
    var data = localStorage.getItem(details)
    if (data){
        var {name, rating, suggestion} = JSON.parse(data)
        document.getElementById('newR').value = rating
        document.getElementById('newS').value = suggestion
    }
}

function update(){
    var name = document.getElementById('newn').value
    var rating = document.getElementById('newR').value
    var suggestion = document.getElementById('newS').values
    localStorage.Storage.setItem(name, JSON.stringify({name: name, rating: rating, suggestion: suggestion}))
    alert('Your suggestion has been updated.')
}

function display() {
    var suggestionContainer = document.getElementById('suggestions');
    suggestionContainer.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var data = JSON.parse(localStorage.getItem(key));

        var suggestion = document.createElement('div');
        suggestion.classList.add('suggestion-item');
        suggestion.innerHTML = `
            <p>Name: ${data.name}</p>
            <p>Rating: ${data.rating}</p>
            <p>Suggestion: ${data.suggestion}</p>
        `;
        suggestionContainer.appendChild(suggestion);
    }
}

