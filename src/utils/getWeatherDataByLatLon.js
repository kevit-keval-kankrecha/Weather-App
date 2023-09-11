const axios = require('axios');


const getWeatherDataByLatLon = async (latitude, longtitude) => {
    try {
        const urlforweather = `http://api.weatherstack.com/current?access_key=9023e7dbe5abdc72d021f4715f786bb9&query=${latitude},${longtitude}`;
        let Weatherdata = await axios.get(urlforweather);
        Weatherdata = Weatherdata.data;
        if (Weatherdata === undefined) {
            return {
                error: 'Forecast Serice not available.!'
            }
        }
        else {
            return {
                weather_descriptions: Weatherdata.current.weather_descriptions[0],
                temperature: Weatherdata.current.temperature,
                feelslike: Weatherdata.current.feelslike
            }
        }
    }
    catch {
        return {
            error: 'Server Busy'
        }
    }
}
async function MaingetWeatherDataByLatLon(latitude, longtitude) {
    const WeatherData = await getWeatherDataByLatLon(latitude, longtitude);
    return WeatherData;
}
module.exports = MaingetWeatherDataByLatLon;