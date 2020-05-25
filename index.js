const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'd71db054',
            s: searchTerm,
        }
    });
    console.log(response.data);
}

const input = document.querySelector('input');

const debounce = (fn,delay=1000) => {
    let timeoutId;
    return (...args) => { //in case we want more arguments
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()=>{
            fn.apply(null, args); //in case we want more arguments
        }, delay);
    }
};


//DEBOUNCING AN INPUT - wait for some time to pass after the last event to actually run a function
const onInput = event => {
        fetchData(event.target.value);
}
input.addEventListener('input', debounce(onInput,1000));