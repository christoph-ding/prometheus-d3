import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import * as dataHandling from './dataHandling.js';

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

// Lists inside of the App
export class RegionList extends Component {
  render(){
    return (
      <div className="Region">
        <h1> Regions </h1>
        <ul>
          {
            this.props.regions.map(function(region) {            
              return (
                <CountryList key={region.name} regionName={region.name} countries={region.data}/>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export class CountryList extends Component {
  render(){
    return (
      <div className="Country">
        <h1> {this.props.regionName} </h1>          
          <ul style={{'list-style': 'none'}}>          
            {              
              this.props.countries.map(function(country) {      
                return (
                  <SingleCountry key={country.name} country={country} />                                                
                )
              })
            }
          </ul>
      </div>
    );
  }
}

// Countries
export class SingleCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoRevealed: false
    }
  }

  getDetails(){
    const detailKeys = ['name', 'alpha2Code', 'capital', 'region', 'population', 'area', 'timezones', 'languages'];
    var output = '';

    detailKeys.map((parameter) => {
      var detailedData;
      var value;
      if (parameter === 'timezones' || parameter === 'languages') {
        value = this.props.country[parameter].length;
      } else {
        value = this.props.country[parameter];
      }

      detailedData = parameter + ': ' + value + ' ';
      output = output + detailedData;
    })
    window.alert(output);
  }

  render(){
    return (
      <div>
        <li onClick={this.getDetails.bind(this)}> {this.props.country.name} </li>
      </div>
    )
  }
}
