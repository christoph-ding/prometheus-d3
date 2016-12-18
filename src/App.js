import React, { Component } from 'react';
import './App.css';

export class WorldDataApp extends Component {
  render() {
    return (
      <div className="WorldDataApp">
        <h1> Entire World Data App </h1>
        <CountryList />
      </div>
    );
  }
}

export class CountryList extends Component {
  render() {
    return (
      <div className="CountryList">
        <h1> List of Countries </h1>
      </div>
    );
  }
}
