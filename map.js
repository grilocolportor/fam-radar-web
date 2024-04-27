// function getdaddos(){
// const db = firebase.firestore();

// // Adicionar dados ao Firestore
// // db.collection("users").add({
// // firstName: "John",
// // lastName: "Doe"
// // })
// // .then((docRef) => {
// // console.log("Documento escrito com ID: ", docRef.id);
// // })
// // .catch((error) => {
// // console.error("Erro ao adicionar documento: ", error);
// // });

// //<input type="checkbox" id="scrollZoom" checked="checked"></input>

// db.collection("users").get().then((querySnapshot) => {
// const dados = [];
// querySnapshot.forEach((doc) => {
// dados.push({
// id: doc.id,
// nome: doc.data().nome,
// idade: doc.data().idade,
// });
// });
// const jsonDados = JSON.stringify(dados);
// console.log(jsonDados);
// // Utilize o jsonDados aqui

// const itemElement = document.createElement("li");
// itemElement.innerHTML = `
// <h3>${item.nome}</h3>
// <p>Idade: ${item.idade}</p>
// `;
// itemElement.classList.add("item"); // Adicionar uma classe para estilização
// dataContainer.appendChild(itemElement);
// });
// }

// const meuModulo = require("firebase.js");

mapboxgl.accessToken = 'pk.eyJ1IjoidmVuYW5jaW83NzciLCJhIjoiY2x0Znd2c3doMHZpYjJxbzUza3k0cnJ4ZCJ9.OH6-0UT-DPVS1KpeRksJsQ';

   //marker
   /*const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'id' : 1,
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
            'id' : 2,
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
            'id' : 3,
            'properties': {
                'message': 'Baz',
                'imageId': 837,
                'iconSize': [40, 40]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-34.94634141, -8.03939031]
            }
        },
        {
            'type': 'Feature',
            'id' : 4,
            'properties': {
                'message': 'Novo Item',
                'imageId': 1011, // Substitua pelo ID da imagem desejada
                'iconSize': [30, 30] // Substitua pelo tamanho desejado
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-34.926300,  -8.047300] //
            }
        }
    ]
};*/

const markers = [];



function addMarkers(doc) {

    for (const marker of doc) {
        console.log("marker =>", marker.features[0]);
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width =  marker.features[0].properties.iconSize[0];
        const height =  marker.features[0].properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage =     `url(https://picsum.photos/id/${marker.features[0].properties.imageId}/${width}/${height})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        el.addEventListener('click', () => {
            window.alert(marker.features[0].properties.message);
        });

        // Add markers to the map.
        const mapboxMarker = new mapboxgl.Marker(el)
            .setLngLat(marker.features[0].geometry.coordinates)
            .addTo(map);

        markers.push(mapboxMarker);
    }
}

function updateMarkerPosition(markerIndex, newLngLat) {
    const marker = markers[markerIndex];
    
    marker.setLngLat(newLngLat);

    console.log(newLngLat);

    map.flyTo({
        center: [newLngLat[0], newLngLat[1]],
        zoom: 15.1,
        essential: true

    });
  }

function removeFeatureByProperty(geojson, propertyName, propertyValue) {
    // Encontra o índice do item com a propriedade e valor especificados
    const index = geojson.features.findIndex(feature => feature.properties[propertyName] === propertyValue);

    // Remove o item, se encontrado
    if (index !== -1) {
        geojson.features.splice(index, 1);
    } else {
        console.error("Item não encontrado!");
    }
}

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-34.94637218, -8.03911611], // starting position [lng, lat]
    zoom: 15.1, // starting zoom
    pitch: 62, // starting pitch
    bearing: -20 // starting bearing
});

//flyto
function flytocustom() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.error('A API de Geolocalização não é suportada');
        // Exibir uma mensagem de erro ou fornecer uma alternativa
    }
}

//

//add marker on map
// Add markers to the map.

//

function rotateCamera(timestamp) {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.rotateTo((timestamp / 100) % 360, { duration: 0 });
    // Request the next frame of the animation.
    requestAnimationFrame(rotateCamera);
}

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

    flytocustom();

    // getdaddos();

    // rotateCamera(0);

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
    // document.getElementById('latitude').textContent = latitude;
    // document.getElementById('longitude').textContent = longitude;

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