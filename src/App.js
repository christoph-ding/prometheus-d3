import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// munge the data

const groupByKey = ({list, key}) => {
  const groupedHash = {};
  const groupedArray = [];

  list.map((item)=>{
    const targetKey = item[key] === "" ? 'Not Available': item[key];
    if (!(item[key] in groupedHash)) {
      groupedHash[targetKey] = [];      
    }
    groupedHash[targetKey].push(item);
  });

  for (var keyCategory in groupedHash) {
    const category = {
      name: keyCategory,
      data: groupedHash[keyCategory]
    }
    groupedArray.push(category);
  }

  return groupedArray;
}

const sortBy = ({list, key}) => {
}

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
            const groupedData = groupByKey({list: this.state.countries, key: 'region'});
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

// Country List
const sayHello = (country) => {
    console.log(country);
}

const SingleCountry = ({country, action}) => {
  const actionWithParameters = () => {
    sayHello(country);
  };

  return (<li onClick={ actionWithParameters } > {country} </li>);
}

export class RegionList extends Component {  
  render(){
    return (
      <div className="Region">
        <h1> Regions </h1>
        <ul>
          {
            this.props.regions.map(function(region) {            
              console.log(region);
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
          <ul>
            {              
              this.props.countries.map(function(country) {                
                return (
                  <SingleCountry key={country.name} country={country.name} action={sayHello}/>                  
                )
              })
            }
          </ul>
      </div>
    );
  }
}
