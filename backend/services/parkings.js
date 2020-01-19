const axios = require('axios');

const apiUrl = 'https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=st_park_p&rows=-1';

function mapToFrontendData(apiData) {
    const parkingList = apiData.records;
    return parkingList
        .map(parking => parking.fields)
        .map(parking => ({
          name: parking.nom.lastIndexOf('-') !== -1 ?
            parking.nom.substring(0, parking.nom.lastIndexOf('-')) :
            parking.nom,
            state: mapToFrontendState(parking.etat),
            freePlaces: parking.libres,
            maxVehicleHeight: parking.gabari_max ? parseFloat(parking.gabari_max.replace(',', '.')) : null,
            location: parking.geo_point_2d,
            places: {
                total: parking.total,
                electric: parseInt(parking.np_velec)
            },
            prices: {
                fifteenMinutes: parking.th_quar,
                halfAnHour: parking.th_demi,
                oneHour: parking.th_heur,
                twoHours: parking.th_2,
                threeHours: parking.th_3,
                fourHours: parking.th_4,
                tenHours: parking.th_10,
                twentyFourHours: parking.th_24,
                night: parking.th_nuit
            }
        }));
}

function mapToFrontendState(state) {
    const stateMap = {
        LIBRE: 'free',
        COMPLET: 'full',
        OUVERT: 'open',
        FERME: 'closed'
    };
    return stateMap[state];
}

function getDataFromApi() {
    return axios.get(apiUrl)
        .then(response => response.data);
}

function getParkingsData() {
    return getDataFromApi().then(response => mapToFrontendData(response))
}

module.exports = {
    getParkingsData
};
