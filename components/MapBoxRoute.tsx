import React from 'react';
import { Layer, Source } from 'react-map-gl';

function MapBoxRoute(props: { coordinates: [number, number][] }) {
    return (
        <Source type='geojson' data={{
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString', coordinates: props.coordinates
            }
        }}>
            {/* Dark casing so the white path stands out over pink roads */}
            <Layer
                id='route-casing'
                type='line'
                layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                paint={{ 'line-color': '#0a0710', 'line-width': 9, 'line-opacity': 0.9 }}
            />
            <Layer
                id='route-line'
                type='line'
                layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                paint={{ 'line-color': '#ffffff', 'line-width': 4.5 }}
            />
        </Source>
    );
}

export default MapBoxRoute;
