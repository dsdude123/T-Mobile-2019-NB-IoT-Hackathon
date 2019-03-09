import React, { Component } from 'react';
// import logo from './logo.svg';

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';



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
            <LeafletMap
              center={[50, 10]}
              zoom={6}
              maxZoom={10}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              animate={true}
              easeLinearity={0.35}
            >
              <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              <Marker position={[50, 10]}>
                <Popup>
                  Popup for any custom information.
                </Popup>
              </Marker>
            </LeafletMap>
          </section>
        </article>
      </div>
    );
  }
}

export default App;
