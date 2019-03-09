import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
// import worldGeoJSON from 'geojson-world-map';

import { ReactMD, StateManagement } from './containers'



// const position = [51.505, -0.09]
const position = ['47.6062', '-122.332'] // LatxLong, 

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactMD>
          <StateManagement>
            <article>
              <section>
                <LeafletMap
                  center={position}
                  zoom={13}
                  maxZoom={10}
                  attributionControl={true}
                  zoomControl={true}
                  doubleClickZoom={true}
                  scrollWheelZoom={true}
                  dragging={true}
                  animate={true}
                  easeLinearity={0.35}
                >
                  <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                  <Marker position={[50, 10]}>
                    <Popup>
                      Popup for any custom information.
                    </Popup>
                  </Marker>
                </LeafletMap>
              </section>
            </article>
          </StateManagement>
        </ReactMD>
      </div>
    );
  }
}

export default App;
