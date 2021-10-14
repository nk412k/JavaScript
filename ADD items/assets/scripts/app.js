const addBtn=document.querySelector('header button');
const addMoviemodal=document.querySelector('#add-modal');
const backdrop=document.querySelector('#backdrop');
const cancelAddMovieBtn=document.querySelector('.btn--passive');
const confirmAddMovieBtn=document.querySelector('.btn--success');
const userInputs=addMoviemodal.querySelectorAll('input');
const movies=[];
const entryText=document.getElementById('entry-text');
const ul=document.getElementById('movie-list');
const deleteModal=document.getElementById('delete-modal');



addBtn.addEventListener('click',showMovieModal);
cancelAddMovieBtn.addEventListener('click',removeMovieModal);

function showMovieModal(){
	addMoviemodal.classList.add('visible');
	toggleBackdrop();
}

function removeMovieModal(){
	clearInputs();
	addMoviemodal.classList.remove('visible');
	toggleBackdrop();
}

backdrop.addEventListener('click',backdropHandler);

function toggleBackdrop(){
	backdrop.classList.toggle('visible');
}

function backdropHandler(){
	removeMovieModal();
	deleteModal.classList.remove('visible');
}
confirmAddMovieBtn.addEventListener('click',addMovieHandler);

function addMovieHandler(){
	const titleValue=userInputs[0].value;
	const imargeUrl=userInputs[1].value;
	const ratingValue=userInputs[2].value;

	if(titleValue.trim()=='' || imargeUrl.trim()=='' || ratingValue.trim()=='' || +ratingValue <1 || +ratingValue >5)
		alert("Enter valid input (rating must be between 1 to 5)");
	else{
		const newMovie={
		id:Math.random().toString(),
		title:titleValue,
		image:imargeUrl,
		rating:ratingValue
	}
	movies.push(newMovie);
	console.log(movies);
	removeMovieModal();
	clearUi();
	addNewMovieElement(newMovie.id,titleValue,imargeUrl,ratingValue);

	}
	
}

function clearInputs(){
	for(let input of userInputs){
		input.value='';
	}
}

function clearUi(){
	if(movies.length===0)
		entryText.style.display='block';
	else{
		entryText.style.display='none';
	}
}

function addNewMovieElement(id,title,image,rating){
	const newElement=document.createElement('li');
	newElement.className='movie-element';
	newElement.innerHTML=`
	<div class='movie-element__image'>
	<img src='' alt='${title}'>
	</div>
	<div class="movie-element__info">
		<h2>${title}</h2>
		<p>${rating}/5</p>
	</div>`
	newElement.addEventListener('click',deleteMovieHandler.bind(this,id)) 
	ul.append(newElement);
	
}

function deleteMovieHandler(id){
	const cancelBtn=document.querySelector('#delete-modal .btn--passive');
	let deleteBtn=document.querySelector('#delete-modal .btn--danger');
	deleteModal.classList.add('visible');
	toggleBackdrop();
	deleteBtn.replaceWith(deleteBtn.cloneNode(true));
	deleteBtn=document.querySelector('#delete-modal .btn--danger');
	cancelBtn.removeEventListener('click',backdropHandler)

	cancelBtn.addEventListener('click',backdropHandler);
	
	deleteBtn.addEventListener('click',deleteMovie.bind(null,id));
}

function deleteMovie(movieid){
	let index=0;
	for(const movie of movies)
	{
		if(movie.id==movieid)
			break;
		index++;
	}
	movies.splice(index);
	ul.children[index].remove();
	toggleBackdrop();
	deleteModal.classList.remove('visible');
}
