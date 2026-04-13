
// For 4Q 1st Graded Exercise: 

const movieForm = document.getElementById('movieForm');
const movieListContainer = document.getElementById('movieList');
const stars = document.querySelectorAll('.star');
let currentRating = 0;

let movies = [];

// 1. Select the stars
stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.getAttribute('data-value'));
        updateStars(currentRating);
    });
});

function updateStars(rating) {
    stars.forEach(s => {
        s.classList.toggle('active', s.getAttribute('data-value') <= rating);
    });
}

// 2. CRUD: for the Create and Update 
function addMovie() {
    event.preventDefault();

    const titleInput = document.getElementById('title').value.trim();
    const yearInput = document.getElementById('year').value;
    const genreInput = document.getElementById('genre').value;

    if (!titleInput || !yearInput || currentRating === 0) {
        alert("Please fill in all fields and select a rating. Thank you :)"); // Just incase there are missing inputes from the user...
        return;
    }
    const existingIndex = movies.findIndex(m => m.title.toLowerCase() === titleInput.toLowerCase());

    if (existingIndex !== -1) {

        // This is for updating the rating of an existing movie by averaging the old and new ratings
        let oldRating = movies[existingIndex].rating;
        movies[existingIndex].rating = (oldRating + currentRating) / 2;
        alert("Movie title exists. Rating has been averaged!");
    } else {
        // This is to create a new movie entry if the title doesn't exist
        const newMovie = {
            title: titleInput,
            year: yearInput,
            genre: genreInput,
            rating: currentRating
        };
        movies.push(newMovie);
    }

    movieForm.reset();
    currentRating = 0;
    updateStars(0);
    renderMovies();
}

// 3. CRUD: read (Display) Logic
function renderMovies() {
    movieListContainer.innerHTML = '';

    movies.forEach((movie, index) => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie-item';
        
        const starIcons = '★'.repeat(Math.round(movie.rating));

        movieDiv.innerHTML = `
            <span>
                <strong>${movie.title} (${movie.year})</strong> - ${movie.genre}, 
                Rating: <span class="list-stars">${starIcons}</span>
            </span>
            <button class="delete-btn" onclick="deleteMovie(${index})">Delete</button>
        `;
        movieListContainer.appendChild(movieDiv);
    });
}

// 4. CRUD: delete button (This is for my 2nd Graded excercise)
function deleteMovie(index) {

    if (confirm("Are you sure you want to delete??")) {
        movies.splice(index, 1); 
        renderMovies(); 
    }
}
