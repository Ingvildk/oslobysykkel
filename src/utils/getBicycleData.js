import axios from "axios";

    async function getStations() {
        const response =
            await axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
                { headers: {'Content-Type': 'application/json'}});
        return(response.data);
    }

    async function getAvailability() {
        const response =
            await axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
                { headers: {'Content-Type': 'application/json'}});
        return(response.data);
    }

     function matchStationWithAvailability(stations, availability) {
        let bicycleData = [];

         if ((stations.length  || availability.length) > 0) {
            stations.forEach(station => {
                const matchAvail = availability.find(el => {
                    return (station.station_id === el.station_id);
                });
                let tempObj = {
                    "address": station.address,
                    "docks": matchAvail.num_docks_available,
                    "available": matchAvail.num_bikes_available
                };
                bicycleData.push(tempObj);
            });
        }

        return bicycleData;
}

    function getData() {
        let data;
        data = getStations().then(stations => {
            return getAvailability().then(spots => {
                return matchStationWithAvailability(stations.data.stations, spots.data.stations);
            });
        });
        return data;
    }

export { getData };
