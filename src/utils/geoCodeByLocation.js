const axios = require('axios');

const geoCodeByLocation = async (location) => {
    try {
        let urlforgeocode;
        urlforgeocode = `https://geocode.maps.co/search?q=${encodeURIComponent(location)}&limit=1`;
        let Locationdata = await axios.get(urlforgeocode);
        
        Locationdata = Locationdata.data[0];
        if (Locationdata === undefined) {
            return {
                error: 'Please Provide an appropriate Location'
            }
        }
        else {
            return {
                latitude: Locationdata.lat,
                longtitude: Locationdata.lon,
                place: Locationdata.display_name
            }
        }
    }
    catch(e) {
        return {
            error:'Server Busy'
        }
    }
}
async function MaingeoCodeByLocation(location) {
    const LocationData = await geoCodeByLocation(location);
    return LocationData;
}
module.exports = MaingeoCodeByLocation;