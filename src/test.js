import React from 'react';
import './App.css';
import axios from 'axios';

export default class Test extends React.Component {

    constructor(props){
        super(props);

    }
    componentDidMount() {


    }

    async getStationData(){
        const response =
            await axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
                { headers: {'Content-Type': 'application/json'}});
        return(response.data);
    }

    // async getAvailableData{
    //     const response =
    //         await axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
    //             { headers: {'Content-Type': 'application/json'}});
    //     return(response.data);
    // }

    render() {
        this.getStationData().then(res => {console.log(res.data.stations)});
        return(<div/>)
    }
}

