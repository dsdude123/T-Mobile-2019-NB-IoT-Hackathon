import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
// import worldGeoJSON from 'geojson-world-map';

import { ReactMD } from './containers'



// const position = [51.505, -0.09]
const position = ['47.6062', '-122.332'] // LatxLong, 

class App extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    fetch(`http://40.85.145.54:4000/api/v1/device?populate={"path":"checkins","sort":"-timestamp"}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.warn('DEVICES:', result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { items } = this.state
    return (
      <div className="App">
        <ReactMD>
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
                {items.map((item) => {
                  const recent = item.checkins[0] || {}
                  return (
                    <Marker key={item._id} position={[recent.latitude, recent.longitude]}>
                      <Popup>
                        Popup for any custom information.
                        <pre><code>{JSON.stringify(item)}</code></pre>
                      </Popup>
                    </Marker>
                  )
                })}
                <Marker position={[50, 10]}>
                  <Popup>
                    Popup for any custom information.
                  </Popup>
                </Marker>
              </LeafletMap>
            </section>
          </article>
        </ReactMD>
      </div>
    );
  }
}

export default App;
