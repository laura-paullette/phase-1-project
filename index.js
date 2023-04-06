const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
// Selecting our Elements.
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
/* call the showMovies function that requests the movie data from the Api using fetch.
 Then it puts those data in the main HTML tag by creating elments for those data. */
showMovies(apiUrl);
function showMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    data.results.forEach(element => {
      // Creating elemnts for our data inside the main tag. 
        const el = document.createElement('div');
        el.setAttribute('class', 'movies')
        const image = document.createElement('img');
        const text = document.createElement('h2');

        text.innerHTML = `${element.title}`;
        image.src = IMGPATH + element.poster_path;
        el.appendChild(image);
        el.appendChild(text);
        main.appendChild(el);
    });
    let movies = document.querySelectorAll('.movies')
    console.log('MOVIE: ', movies)
    for(let movie of movies){
        movie.addEventListener('click', ()=>{
            let main = document.querySelector('main')
            let picture = movie.firstElementChild.src
                console.log(picture);
            let title = movie.querySelector('h2').textContent.split(' ')
            let newOne = []
            for (let name of title){
                newOne.push(name)
            }
            console.log(newOne.join(''))

            // let apiKey = 'k_zlne8xu8'
            let apiKey = 'k_9gu7A5W0'
            let search = `https://imdb-api.com/en/API/SearchTitle/${apiKey}/${newOne}`
            console.log(search);

            while(main.hasChildNodes()){
                main.removeChild(main.firstChild)
            }

            

            let poster = document.createElement('div')
            let posterPic = document.createElement('img')
            poster.style = 'position: relative; height: 100%; width: 30%; background: white;'
            let detail = document.createElement('div')
            detail.style = 'position: relative; margin-left: 40px; height: 100%; width: 1200px; background:none'
            main.style = 'display: flex; height: 800px; padding-left: 0%; justify-content: normal;'

            posterPic.src = picture
            posterPic.style = 'height: 100%'

            main.appendChild(poster)
            main.appendChild(detail)
            poster.appendChild(posterPic)

            console.log(poster)


            let heading = document.createElement('h1')
            let description = document.createElement('p')

            heading.setAttribute('id', 'movie-head')
            description.setAttribute('id', 'movie-body')

            heading.textContent = title.join(' ')

            detail.appendChild(heading)
            detail.appendChild(description)

            fetch(search)
            .then(res => res.json())
            .then(data=>{
                console.log('Data: ', data);
                let id = data.results[0].id
                let words = `https://imdb-api.com/en/API/Wikipedia/${apiKey}/${id}`

                fetch(words)
                .then(res  => res.json())
                .then(data =>{
                    description.textContent = data['plotShort'].plainText
                })

            })    

        })
    } 
});
}













// Prevent the Form from submitting if the search bar is empty.
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
     
    const searchTerm = search.value;
 /* Adding the value wriiten in the search bar to the search Api,
    in order to get the movies we search for. */
    if (searchTerm) {
        showMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});

