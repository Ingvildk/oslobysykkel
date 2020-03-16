import {stasjon} from "../mock/stasjon";
import {tilgjengelighet} from "../mock/tilgjengelighet";
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
                { headers: {'Content-Type': 'application/json' }});
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
            getAvailability().then(spots => {
                return matchStationWithAvailability(stations.data.stations, spots.data.stations);
            })
        });
        return data;
        // stations = getStations().then(res => {return (res.data.stations);});
        // availability = getAvailability().then(res => {return ((res.data.stations))});
        // return matchStationWithAvailability(stations, availability);
    }

export { getData };
