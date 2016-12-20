import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const sampleData = ['chris', 'steve', 'joe', 'bob'];

export class WorldDataApp extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      countries: sampleData
    }
    this.apiUrl = 'https://restcountries.eu/rest/v1/all'
  }

  // get data from api
  componentDidMount(){
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        console.log(res);
      });
  }

  render(){
    return (
      <div className="WorldDataApp">
        <h1> Entire World Data App </h1>
        <h1> hey this is some data: {this.state.countries[0]}</h1>
        <CountryList countries={this.state.countries}/>
      </div>
    );
  }
}

const sayHello = (country) => {
    console.log(country);
}

const SingleCountry = ({country, action}) => {

  // apparently, this is one of the only canonical ways to do this in React...
  const actionWithParameters = () => {
    sayHello(country);
  };

  return (<li onClick={ actionWithParameters } > {country} </li>);
}

export class CountryList extends Component {
  sayHello(){
    console.log('yooooooooo');
  }

  render(){
    return (
      <div className="CountryList">
        <h1> List of Countries </h1>
          <ul>
            {              
              this.props.countries.map(function(country) {                
                return (
                  <SingleCountry key={country} country={country} action={sayHello}/>
                )
              })
            }
          </ul>
      </div>
    );
  }
}
