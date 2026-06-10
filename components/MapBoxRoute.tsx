import React from 'react';
import { Layer, Source } from 'react-map-gl';

function MapBoxRoute(props: any) {
    return (
        <Source type='geojson' data={{
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString', coordinates: props.coordinates
            }
        }}>
            <Layer
                type='line'
                layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                paint={{ 'line-color': '#ec4899', 'line-width': 5, 'line-blur': 0.5 }}
            />
        </Source>
    );
}

export default MapBoxRoute;
