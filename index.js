const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'd71db054',
            s: searchTerm,
        }
    });
    console.log(response.data);
}

let timeoutId;
const input = document.querySelector('input');

// //we have to divide it into two:
// input.addEventListener('input', (event)=> {
//     fetchData(event.target.value);
// });

const onInput = event => {
    //data is fetched after one second, but timer turns off if input value changes between than one second -> effect: less unnecessary requests
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(()=>{
        fetchData(event.target.value);
    },1000);
}
input.addEventListener('input', onInput);