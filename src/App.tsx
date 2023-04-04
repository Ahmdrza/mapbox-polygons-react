
import './App.css';
import { GeoJSONSourceOptions } from 'mapbox-gl';
import { Layer, Map, Source } from 'react-map-gl';
import { useState } from 'react';

function App() {
  const [hoverInfo, setHoverInfo] = useState<{
    x: number;
    y: number;
    name: string;
  } | null>(null);
  const [cursor, setCursor] = useState<string>('grab');

  const polygons: GeoJSONSourceOptions['data'] = {
    type: 'FeatureCollection',
    features: [
      {
        id: 1,
        type: 'Feature',
        properties: {
          name: 'Area 51',
        },
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-7.950966710379959, 53.43146017152239],
                [-7.950966710379959, 53.42962140120139],
                [-7.947024882898944, 53.42962140120139],
                [-7.947024882898944, 53.43146017152239],
                [-7.950966710379959, 53.43146017152239],
              ],
            ],
          ],
        },
      },
    ],
  };

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
        cursor={cursor}
        onMouseMove={(event) => {
          if (event.features && event.features.length > 0) {
            setCursor('pointer');
            setHoverInfo({
              x: event.point.x,
              y: event.point.y,
              name: event.features[0].properties?.name,
            });
          }
        }}
        onMouseLeave={() => {
          setCursor('grab');
          setHoverInfo(null);
        }}
        interactiveLayerIds={['data']}
       >
        <Source id='source' type='geojson' data={polygons}>
          <Layer
            {...{
              id: 'data',
              type: 'fill',
              paint: {
                'fill-color': 'rgb(5, 191, 5)',
                'fill-opacity': 0.4
              },
            }}
          />
          <Layer
            {...{
              id: 'outline',
              type: 'line',
              paint: {
                'line-color': 'red',
                'line-width': 2,
              },
            }}
          />
          </Source>
        </Map>
        {hoverInfo && (
          <div
            className='tooltip'
            style={{
              left: hoverInfo.x,
              top: hoverInfo.y,
            }}>
              {hoverInfo.name}
          </div>
        )}
    </div>
  );
}

export default App;
