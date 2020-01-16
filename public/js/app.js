

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecast = document.querySelector('.forecast');
const formlocation = document.querySelector('.location');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;

    forecast.innerHTML = 'Loading';
    formlocation.innerHTML = '';

    fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
        if(data.error) {
            forecast.innerHTML = data.error
        } else {
            forecast.innerHTML = data.forecast,
            formlocation.innerHTML = data.location,
            console.log(data.forecast)
            console.log(data.location)
        }
       
    })
})
})