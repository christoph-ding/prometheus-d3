import React, { Component } from 'react';
import './App.css';

const sampleData = ['chris', 'steve', 'joe', 'bob'];

export class WorldDataApp extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      countries: sampleData
    }
  }

  // get data from api
  // componentDidMount(){

  // }

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

export class CountryList extends Component {
  render(){
    return (
      <div className="CountryList">
        <h1> List of Countries </h1>
          <ul>
            {
              this.props.countries.map(function(country) {
                return (
                  <h1> {country} </h1>
                )
              })
            }          
          </ul>
      </div>
    );
  }
}
