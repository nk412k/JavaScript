const addMovieBtn=document.getElementById('add-movie-btn');
const searchMovieBtn=document.getElementById('search-btn');
const Movies=[];
const movieList=document.getElementById('movie-list');

addMovieBtn.addEventListener('click',addmovie);
searchMovieBtn.addEventListener('click',filterMovies);

function renderMovie(filterterm=''){
    if (Movies.length==0){
        movieList.classList.remove('visible');
        return;
    }
    else{
        movieList.classList.add('visible');
    }
    movieList.innerHTML='';
    const filteredMovies=!filterterm ? Movies:Movies.filter((movie) => movie.info.title.includes(filterterm)) ;
    
    
    filteredMovies.forEach(function(movie){
        const newMovie=document.createElement('li');
        const {info} = movie;
        const {title:movieTitle}=info;
        let text=`${movieTitle} -`;
        for(const key in info)
        {
            if(key!='title')
            text=text + `${key} : ${info[key]}`;
        }
        newMovie.textContent=text;
        movieList.append(newMovie);
    });

}

function addmovie(){
    const title=document.getElementById('title').value;
    const extraName=document.getElementById('extra-name').value;
    const extraValue=document.getElementById('extra-value').value;

    if(title.trim()==='' || extraName.trim()==='' || extraValue.trim()==='')
    {
        alert("Enter valid Inputs");
        return;
    }
    const movie={
        info:{
            title,
            [extraName]:extraValue
        },
        id:Math.random()
    }
    Movies.push(movie);
    renderMovie();
    console.log(Movies);
}

function filterMovies(){
    const filterterm=document.getElementById('filter-title').value;
    renderMovie(filterterm);
}