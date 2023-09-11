console.log("Client Side Java Script");

//not Working
//const axios=require('axios');

const weatherForm = document.querySelector('Form');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = document.getElementById('input').value;
    document.getElementById('finalForecastData').innerHTML = 'Loading';
    document.getElementById('error').innerHTML = '';

    fetch(`/Weather?address=${inputValue}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.getElementById('error').innerHTML = data.error;
                document.getElementById('finalForecastData').innerHTML = "";
            }
            else {
                document.getElementById('finalForecastData').innerHTML = data.forecast + '<br>' + data.location;
                document.getElementById('error').innerHTML = '';
            }
        });
    }).catch(() => {
        document.getElementById('error').innerHTML = 'Please Establish your Internet Connection.'
        document.getElementById('finalForecastData').innerHTML = "";
    });
})



