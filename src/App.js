import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import * as dataHandling from './dataHandling.js';
import {RegionList} from './embeddedComponents';

// the entire app
export class WorldDataApp extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      countries: [],
      groupedByRegion: []
    }
    this.apiUrl = 'https://restcountries.eu/rest/v1/all'
  }

  // get data from api
  componentWillMount(){
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({countries: res.data} , 
          () => {
            // group the data by region 
            const groupedData = dataHandling.groupByKey({list: this.state.countries, key: 'region'});
            this.setState({groupedByRegion: groupedData});
            }
          );
      });
  }

  render(){
    return (
      <div className="WorldDataApp">
        <h1> Entire World Data App </h1>
        <RegionList regions={this.state.groupedByRegion}/>
      </div>
    );
  }
}
