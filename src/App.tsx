
import './App.css';
import { Map } from 'react-map-gl';

function App() {
  return (
    <div style={{height: '100vh', width: '100%'}}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg"
        mapStyle='mapbox://styles/mapbox/satellite-streets-v9'
        style={{
          width: '100%',
          height: '100%',
        }}
        initialViewState={{
          longitude: -7.949333965946522,
          latitude: 53.4313602035036,
          zoom: 15
        }}
       />
    </div>
  );
}

export default App;
