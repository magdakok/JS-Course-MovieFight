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