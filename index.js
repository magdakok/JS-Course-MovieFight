const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'd71db054',
            s: searchTerm,
        }
    });
    console.log(response.data);
