import React, { Component } from 'react';
// import logo from './logo.svg';

import L from 'leaflet'; // eslint-disable-line
// postCSS import of Leaflet's CSS
import 'leaflet/dist/leaflet.css';
// using webpack json loader we can import our geojson file like this
// import geojson from 'json!./bk_subway_entrances.geojson';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const position = [51.505, -0.09]

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <article>
          <section>
            <Map center={position} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={position}>
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
              </Marker>
            </Map>
          </section>
        </article>
      </div>
    );
  }
}

export default App;
