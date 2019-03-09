import React from 'react'
import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'

// import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// https://stackoverflow.com/a/52944845
const LeafletMap = dynamic(() => import('react-leaflet/lib/Map'), { ssr: false })
const Marker = dynamic(() => import('react-leaflet/lib/Marker'), { ssr: false })
const Popup = dynamic(() => import('react-leaflet/lib/Popup'), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet/lib/TileLayer'), { ssr: false })


const position = [51.505, -0.09]

export default class INDEX_PAGE extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  render () {
    return process.browser ? (
      <article>
        <Helmet title='Home' />
        <section style={{height: '50vh'}}>
          <LeafletMap center={position} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
          </LeafletMap>
        </section>
      </article>
    ) : null
  }
}
