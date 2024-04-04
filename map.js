mapboxgl.accessToken = 'pk.eyJ1IjoidmVuYW5jaW83NzciLCJhIjoiY2x0Znd2c3doMHZpYjJxbzUza3k0cnJ4ZCJ9.OH6-0UT-DPVS1KpeRksJsQ';

//marker
const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                'imageId': 1011,
                'iconSize': [60, 60]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-66.324462, -16.024695]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Bar',
                'imageId': 870,
                'iconSize': [50, 50]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-61.21582, -15.971891]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Baz',
                'imageId': 837,
                'iconSize': [40, 40]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-34.94634141, -8.03939031]
            }
        }
    ]
};

///


const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-34.94637218, -8.03911611], // starting position [lng, lat]
    zoom: 15.1, // starting zoom
    pitch: 62, // starting pitch
    bearing: -20 // starting bearing
});


//flyto
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
    console.error('A API de Geolocalização não é suportada');
    // Exibir uma mensagem de erro ou fornecer uma alternativa
}
//


//add marker on map
 // Add markers to the map.
 for (const marker of geojson.features) {
    // Create a DOM element for each marker.
    const el = document.createElement('div');
    const width = marker.properties.iconSize[0];
    const height = marker.properties.iconSize[1];
    el.className = 'marker';
    el.style.backgroundImage = `url(https://picsum.photos/id/${marker.properties.imageId}/${width}/${height})`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';

    el.addEventListener('click', () => {
        window.alert(marker.properties.message);
    });

    // Add markers to the map.
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
}
//

map.on('style.load', () => {
    map.addSource('line', {
        type: 'geojson',
        lineMetrics: true,
        data: {
            type: 'LineString',
            coordinates: [
                [2.293389857555951, 48.85896319631851],
                [2.2890810326441624, 48.86174223718291]
            ]
        }
    });

    map.addLayer({
        id: 'line',
        source: 'line',
        type: 'line',
        paint: {
            'line-width': 12,
            // The `*-emissive-strength` properties control the intensity of light emitted on the source features.
            // To enhance the visibility of a line in darker light presets, increase the value of `line-emissive-strength`.
            'line-emissive-strength': 0.8,
            'line-gradient': [
                'interpolate',
                ['linear'],
                ['line-progress'],
                0,
                'red',
                1,
                'blue'
            ]
        }
    });
});

document
    .getElementById('lightPreset')
    .addEventListener('change', function () {
        map.setConfigProperty('basemap', 'lightPreset', this.value);
    });

document
    .querySelectorAll('.map-overlay-inner input[type="checkbox"]')
    .forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            map.setConfigProperty('basemap', this.id, this.checked);
        });
    });


function successCallback(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Atualizar o texto com a latitude e longitude
    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;

    // Atualizar o mapa com a localização do usuário
    map.flyTo({
        center: [longitude, latitude],
        zoom: 15.1,
        essential: true

    });

    // Adicionar um marcador na localização do usuário (opcional)
    new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
}

function errorCallback(error) {
    console.error('Erro ao obter a localização:', error);
    // Exibir uma mensagem de erro ou fornecer uma alternativa
}



