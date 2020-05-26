const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results">
                
                </div>
            </div>
        </div>
    `;
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
    
    const onInput = async event => {
        const items = await fetchData(event.target.value);
    
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return; //if there's no items on the list hide dropdown menu and return from this function
        }
    
        resultsWrapper.innerHTML = '';
    
        dropdown.classList.add('is-active');
        for(let item of items) {
            const option = document.createElement('a');
            
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', ()=>{
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });
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
};