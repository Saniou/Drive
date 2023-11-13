import React from 'react'
import { Layer, Source } from 'react-map-gl'

function MapBoxRoute(props: any) {
    return (
        <Source type='geojson' data={{
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: props.coordinates
            }
        }}>
            <Layer
                type='line'
                layout={{ 'line-join': 'round', 'line-cap': 'square' }}
                paint={{ 'line-color': '#f3c4dc', 'line-width': 4 }}
            />
        </Source>
    )
}

export default MapBoxRoute