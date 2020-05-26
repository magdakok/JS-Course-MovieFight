const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'd71db054',
            s: searchTerm,
        }
    });

    if(response.data.Error) {
        return [];
    }
    return response.data.Search;
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            
            </div>
        </div>
    </div>

`;
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async event => {
    const movies = await fetchData(event.target.value);

    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return; //if there's no movies on the list hide dropdown menu and return from this function
    }

    resultsWrapper.innerHTML = '';

    dropdown.classList.add('is-active');
    for(let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML =`
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})
        `;
        resultsWrapper.appendChild(option);
    }
    
}

//DEBOUNCING AN INPUT - wait for some time to pass after the last event to actually run a function
input.addEventListener('input', debounce(onInput,1000));

//CLOSING THE DROPDOWN MENU WHEN CLICK OUTSIDE
document.addEventListener('click', event =>{
    if (!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});
