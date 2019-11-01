const API_BASE_URL = 'http://localhost:3000/grads';
const searchBtn = document.querySelector('.searchBtn');
const explosionAudio = document.querySelector('.boomAudio');
const inputFields = Array.from(document.querySelectorAll('.textFieldWrap > input'));
const gradsResults = document.querySelector('.data');
const gradDataBox = document.querySelector('.gradDataBox');


searchBtn.addEventListener('click', async (e) => {
    // Prevent page from refreshing
    e.preventDefault();
    const gradsData = await fetchGradsData();
    clearData();
    showGradsData(gradsData);
    explosionAudio.play();
    addExplosion();
});







// Fetching grads data from API
const fetchGradsData = () => {
    const inputValues = inputFields.map(field => [field.name, field.value]);
    console.log(inputValues);
    const queryParams = inputValues.reduce((acc,val) => {
        const [param, value] = val;
        console.log({ param, value });

        if(!value) return acc;

        const paramValuePair = `${param}=${value}`;
        return acc += acc ? `&${paramValuePair}` : `?${paramValuePair}`
    }, '');
    
    console.log(`${API_BASE_URL}${queryParams}`);
    return fetch(`${API_BASE_URL}${queryParams}`).then(res => res.json());
}



const addExplosion = () => {
    gradDataBox.innerHTML += `
                                <div class="explosion">
                                    <img src="/assets/shockwave.svg" class='explosion--image' alt="BOOM!">
                                </div>
                            `;


    setTimeout(() => { 
        gradDataBox.lastChild.remove();
    }, 4000);
}


const showGradsData = (grads) => {
    const filteredGrads = grads.map(grad => grad.firstName).join(', '); 
    gradsResults.textContent += filteredGrads;
    gradsResults.classList.add('generated');
}


const clearData = () => {
    inputFields.forEach(field => field.value = '');
    gradsResults.textContent = '';
    gradsResults.classList.remove('generated');    

    setTimeout(() => {
        gradDataBox.querySelector('.explosion').remove();    
    }, 5000);
}


