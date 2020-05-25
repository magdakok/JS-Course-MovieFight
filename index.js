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

const input = document.querySelector('input');

//DEBOUNCING AN INPUT - wait for some time to pass after the last event to actually run a function
const onInput = async event => {
        const movies = await fetchData(event.target.value);
        printData(movies);
}
input.addEventListener('input', debounce(onInput,1000));

const printData = (movies) => {
    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${movie.Poster}" class="image"/>
            <h1>${movie.Title}</h1>
            <h2>(${movie.Year})</h2>
        `;
        document.querySelector('#searchResults').appendChild(div);
    };
};