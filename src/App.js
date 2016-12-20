import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// munge the data

const groupByKey = ({list, key}) => {
  const groupedHash = {};
  // const groupedArray = [];

  list.map((item)=>{
    const targetKey = item[key] === "" ? 'Not Available': item[key];
    if (!(item[key] in groupedHash)) {
      groupedHash[targetKey] = [];      
    }
    groupedHash[targetKey].push(item);
  });

  // for (var keyCategory in groupedHash) {
  //   groupedArray.push(groupedHash[keyCategory]);
  // }

  // return groupedArray;
  return groupedHash;
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
            this.groupedByRegion = groupByKey({list: this.state.countries, key: 'region'});
            console.log(this.groupedByRegion);
            }
          );
      });
  }

  render(){
    return (
      <div className="WorldDataApp">
        <h1> Entire World Data App </h1>
        <CountryList countries={this.state.countries}/>
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

// export class RegionList extends Component {
//   render()
// }

export class CountryList extends Component {

  render(){
    return (
      <div className="CountryList">
        <h1> List of Countries </h1>
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
