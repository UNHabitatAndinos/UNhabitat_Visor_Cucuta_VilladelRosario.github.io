var map = L.map('map', {
    center: [7.892, -72.506],
    zoom: 12.4,
    minZoom: 12.4,
    scrollWheelZoom: false,
});

map.once('focus', function() { map.scrollWheelZoom.enable(); });

L.easyButton('<img src="images/fullscreen.png">', function (btn, map) {
    var cucu = [7.892, -72.506];
    map.setView(cucu, 12.4);
}).addTo(map);

var esriAerialUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services' +
    '/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var esriAerialAttrib = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, ' +
    'USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the' +
    ' GIS User Community';
var esriAerial = new L.TileLayer(esriAerialUrl,
    {maxZoom: 18, attribution: esriAerialAttrib}).addTo(map);


var opens = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
});


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
        '<b>Municipio ' + props.MUN + ' ' + props.COM + '</b> <br />' +
        'Viviendas ' + props.VIVI_OCU + '<br />' +
        'Hogares ' + props.HOGARES + '<br />' +
        'Personas ' + props.PERSONAS + '<br />' +  
        'Población de origen Venezuela ' + props.VENEZOLANO  + '<br />' +  '<br />' +  

        '<b>Vivienda </b>' + '<br />' +
        'Vivienda adecuada: ' + props.VIV_ADE.toFixed(0) + ' %' + '<br />' +
        'Espacio vital suficiente: ' + props.HACINAMI.toFixed(0) + ' %' + '<br />' +
        'Agua mejorada: </b> ' + props.AGUA_MEJOR.toFixed(0) + ' %' + '<br />' +
        'Saneamiento: </b> ' + props.SANEAMIENT.toFixed(0) + ' %' + '<br />' +
        'Electricidad: </b> ' + props.ELECTRICI.toFixed(0) + ' %' + '<br />' +
        'Internet: </b> ' + props.INTERNET.toFixed(0) + ' %' + '<br />' + 
        'Dependencia económica: ' + props.DEP_ECONO.toFixed(2) + '<br />' + 
        'Estrato: </b> ' + props.ESTRATO.toFixed(0)  + '<br />' +  '<br />' +  

        '<b>Salud</b>' + '<br />' +
        'Proximidad centros de salud: ' + props.P_SALUD.toFixed(0) + ' m' + '<br />' +
        'Proximidad hospitales: ' + props.P_SALUD1.toFixed(0) + ' m' + '<br />' +
        'Concentración de Pm10: ' + props.PM10.toFixed(2) + ' µg/m3' +  '<br />' +   
        'Contaminación residuos sólidos: ' + props.CON_SOL.toFixed(0) + ' %' + '<br />' + 
        'Esperanza de vida al nacer: ' + props.E_VIDA.toFixed(0) + ' años' + '<br />' +
        'Brecha género esperanza de vida al nacer: ' + props.B_E_VIDA.toFixed(2) + '<br />' +  '<br />' +  
        
        '<b>Educación, cultura y diversidad </b>' + '<br />' +
        'Proximidad equipamientos culturales: ' + props.P_BIB.toFixed(0) + ' m' + '<br />' +
        'Proximidad equipamientos educativos: ' + props.P_EDU.toFixed(0) + ' m' + '<br />' +
        'Diversidad ingresos: ' + props.MIX_EST.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad nivel educativo: ' + props.MIX_EDU.toFixed(2) + '/2.20' + '<br />' +
        'Diversidad edades: ' + props.MIX_EDAD.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad etnias y razas: ' + props.MIX_ETNIAS.toFixed(2) + '/1.61' +'<br />' + 
        'Brecha género años promedio educación: ' + props.PARIDAD.toFixed(2) + '<br />' +
        'Años promedio educación: ' + props.PRO_A_ESCO.toFixed(0) + ' años'+ '<br />' +  '<br />' +  
        
        '<b>Espacios públicos, seguridad y recreación </b>' + '<br />' +
        'Proximidad espacio público: ' + props.P_EP.toFixed(0) + ' m' + '<br />' +
        'M² per capita de espacio público: ' + props.M2_ESP_PU.toFixed(0) + ' m' + '<br />' +
        'Densidad residencial: ' + props.DENSIDAD.toFixed(2) + '<br />' +
        'Tasa de hurtos x 10mil habitantes: ' + props.HURTOS.toFixed(0) + '<br />' +
        'Tasa de homicidios x 10mil habitantes: ' + props.HOMICIDIOS.toFixed(0) + '<br />' +
        'Diversidad usos del suelo: ' + props.MIXTICIDAD.toFixed(2) + '/1.61' +'<br />' + '<br />' +

        '<b>Oportunidades económicas </b>' + '<br />' +
        'Proximidad zonas de interés económico (servicios y comercio): ' + props.P_COMSER.toFixed(0) + ' m' + '<br />' +
        'Desempleo: ' + props.T_DESEMPL.toFixed(0) + ' %' + '<br />' +
        'Empleo: ' + props.EMPLEO.toFixed(0) + ' %' + '<br />' +
        'Empleo informal estricto: ' + props.E_INFOR.toFixed(0) + ' %' + '<br />' +
        'Desempleo juvenil: ' + props.DESEM_JUV.toFixed(0) + ' %' + '<br />' +
        'Brecha género desempleo: ' + props.BRECHA_D.toFixed(2) : 'Seleccione una manzana');
};
info.addTo(map);

function stylel(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'red',
        fillOpacity: 0,
        clickable: false,

    };
}

var lim = L.geoJson(limiteven, {
    style: stylel,
    onEachFeature: popupText1,
}).addTo(map);


function getColor(d) {
    return d > 10 ? '#68e8ff' :
                      '#ffffff';
}

function stylec(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: getColor(feature.properties.Comuna),
        fillOpacity: 0,
        dashArray: '3',
    };
}

var comu = L.geoJson(comunas, {
    style: stylec,
    onEachFeature: popupText,
}).addTo(map);


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        dashArray: '',
        fillColor: false
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var manzanas;

function resetHighlight(e) {
    manzanas.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function style(feature) {
    return {
        weight: 0.6,
        opacity: 0.5,
        color: '#ffffff00',
        fillOpacity: 0,
    };
}


function changeLegend(props) {
    var _legend = document.getElementById('legend'); // create a div with a class "info"
    _legend.innerHTML = (props ?
        `<p style="font-size: 11px"><strong>${props.title}</strong></p>
            <p>${props.subtitle}</p>
            <p id='colors'>
                ${props.elem1}
                ${props.elem2}
                ${props.elem3}
                ${props.elem4}
                ${props.elem5}
                ${props.elem6}
                ${props.elem7}<br>
                <span style='color:#000000'>Fuente: </span>${props.elem8}<br>
            </p>` :
        `<p style="font-size: 12px"><strong>Área urbana</strong></p>
            <p id='colors'>
                <span style='color:#c3bfc2'>▉</span>Manzanas<br>
            </p>`);
}

var legends = {
    ZA_SALUD1: {
        title: "Proximidad equipamientos de salud",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, SISPRO",
    },
    ZA_EDUCA1: {
        title: "Proximidad equipamientos de educación",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, Google Maps",
    },
    ZA_BIBLIO1: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, Google Maps",
    },
    PRO_A_ESCO: {
        title: "Años promedio educación",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>16 - 18</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>14 - 15</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>12 - 13</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>9 - 11</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3 - 8</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIXTICIDAD: {
        title: "Diversidad usos del suelo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.06 - 1.67</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.79 - 1.05</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.54 - 0.78</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.30 - 0.53</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.29</div>',
        elem6: '',
        elem7: '',
        elem8: "Plan de Ordenamiento Territorial Cúcuta, Alcaldía de Villa del Rosario",
    },
    ZA_ESPPUB1: {
        title: "Proximidad espacio público",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>Fuertemente inclinada</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Escarpada</div>',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "Plan de Ordenamiento Territorial Cúcuta, Alcaldía de Villa del Rosario",
    },
    VIV_ADE: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>86 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>66 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>36 - 65</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>16 - 35</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 15</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    AGUA_MEJOR: {
        title: "Acceso a agua mejorada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>81 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>61 - 80</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>41 - 60</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 40</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 20</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    SANEAMIENT: {
        title: "Acceso a saneamiento",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>81 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>61 - 80</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>41 - 60</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 40</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 20</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },  
    DESEM_JUV: {
        title: "Desempleo juvenil",
        subtitle: "% de Personas entre 15 y 24 años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 10</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>11 - 26</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>27 - 41</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>42 - 58</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>59 - 90</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    INTERNET: {
        title: "Acceso a internet",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>86 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>52 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>33 - 51</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>14 - 32</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 13</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    T_DESEMPL: {
        title: "Tasa de desempleo",
        subtitle: "% de Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 6</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>7 - 14</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>15 - 24</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>25 - 41</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>42 - 92</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    PM10: {
        title: "Concentración Pm10",
        subtitle: "µg/m3",
        elem1: '<div><span  style= "color:#1a9641">▉</span>21 - 24</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>25 - 27</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>28 - 30</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>31 - 33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>34 - 36</div>',
        elem6: '',
        elem7: '',
        elem8: "CORPONOR",
    },
    MAX_RANGO: {
        title: "Edad probable de un habitante",
        subtitle: "Rango de edad mayoritario",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 9 años</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>10 - 24 años</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>25 - 39 años</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>40 - 54 años</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>55 - 84 años</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    HURTOS: {
        title: "Tasa de hurtos",
        subtitle: "Hurtos x 10mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Menor 107</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>108 - 179</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>180 - 270</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>271 - 435</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>436 - 1550</div>',
        elem6: '',
        elem7: '',
        elem8: "Policía Nacional 2019",
    },
    HOMICIDIOS: {
        title: "Tasa de homicidios",
        subtitle: "Homicidios x 10mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>6 - 10</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>11 - 15</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>16 - 18</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>19 - 23</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>24 - 51</div>',
        elem6: '',
        elem7: '',
        elem8: "Medicina Legal 2019",
    },
    VENEZOLANO: {
        title: "Población de origen Venezuela",
        subtitle: "Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1 - 5</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>6 - 25</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>26 - 77</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>78 - 100</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>100 - 205</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    ESTRATO: {
        title: "Estratificación socioeconómica",
        subtitle: "Máximo conteo",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Estrato 6</div>',
        elem2: '<div><span  style= "color:#82E0AA">▉</span>Estrato 5</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>Estrato 4</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>Estrato 3</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>Estrato 2</div>',
        elem6: '<div><span  style= "color:#d7191c">▉</span>Estrato 1</div>',
        elem7: '<div><span  style= "color:#c3bfc2">▉</span>Sin estrato</div>',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_ETNIAS: {
        title: "Diversidad etnias y razas",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.25 - 0.50</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.15 - 0.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.09 - 0.14</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.03 - 0.08</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.02</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDU: {
        title: "Diversidad nivel educativo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.56 - 1.98</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.34 - 1.55</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.08 - 1.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.47 - 1.07</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.46</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDAD: {
        title: "Diversidad edades",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.51 - 1.77</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.39 - 1.50</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.18 - 1.38</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.51 - 1.17</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.50</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EST: {
        title: "Diversidad ingresos",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.78 - 1.52</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.55 - 0.77</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.34 - 0.54</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.13 - 0.33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.12</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DENSIDAD: {
        title: "Densidad residencial",
        subtitle: "Población/ha", 
        elem1: '<div><span  style= "color:#a6d96a">▉</span>0 - 149</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>150 - 200</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>201 - 300</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>301 - 400</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Mayor 401</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    INDICE: {
        title: "Marcador potencial integración urbana",
        subtitle: "%", 
        elem1: '<div><span  style= "color:#FCF9BB">▉</span>71.13 - 80.85</div>',
        elem2: '<div><span  style= "color:#FE9D6C">▉</span>66.30 - 71.12</div>', 
        elem3: '<div><span  style= "color:#CA3E72">▉</span>60.89 - 66.29</div>',
        elem4: '<div><span  style= "color:#862781">▉</span>53.29 - 60.88</div>',
        elem5: '<div><span  style= "color:#2A115C">▉</span>35.98 - 53.28</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    ELECTRICI: {
        title: "Acceso a electricidad",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>90 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>74 - 89</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>44 - 73</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 43</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    HACINAMI: {
        title: "Espacio vital suficiente",
        subtitle: "% de Hogares",
        elem1: '<div><span  style= "color:#1a9641">▉</span>81 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>71 - 80</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>61 - 70</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>51 - 60</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>20 - 50</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    CON_SOL: {
        title: "Contaminación de residuos sólidos",
        subtitle: "% de viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 20</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>21 - 40</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>41 - 60</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>61 - 80</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>81 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    E_VIDA: {
        title: "Esperanza de vida al nacer",
        subtitle: "años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>74 - 78</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>72 - 73</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>70 - 71</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>68 - 69</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>39 - 67</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    B_E_VIDA: {
        title: "Brecha de género esperanza de vida al nacer",
        subtitle: "Relación esperanza de vida al nacer de mujeres y hombres",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.35 - 0.99</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>1.00 - 1.04</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.05 - 1.09</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.10 - 1.13</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>1.14 - 2.27</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    PARIDAD: {
        title: "Brecha de género años promedio de eduación",
        subtitle: "Relación años promedio educación de mujeres y hombres",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.90</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>0.91 - 1.06</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.07 - 1.20</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.21 - 1.91</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>1.92 - 8.33</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    M2_ESP_PU: {
        title: "M² per capita de espacio público",
        subtitle: "m²/habitante",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 2.29</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.85 - 2.28</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.27 - 0.84</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.21 - 0.26</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.20</div>',
        elem6: '',
        elem7: '',
        elem8: "Plan de Ordenamiento Territorial Cúcuta, Alcaldía de Villa del Rosario",
    }, 
    D_COM_SER: {
        title: "Proximidad unidades de servicios y comerciales",
        subtitle: "Distancia m",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 147</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>148 - 260</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>261 - 398</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>399 - 632</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Mayor 632</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    EMPLEO: {
        title: "Empleo",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>63 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>53 - 62</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>46 - 52</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>36 - 45</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 35</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    BRECHA_D: {
        title: "Brecha de género desempleo",
        subtitle: "Relación de desempleo mujeres y hombres",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.99</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>1.00 - 1.54</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.55 - 2.56</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>2.57 - 4.71</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>4.72 - 12.60</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    P_SALUD1: {
        title: "Proximidad centros de salud",
        subtitle: "Distancia en metros con factor de inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 11225</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía San José de Cúcuta, Alcaldía de Villa del Rosario",
    }, 
    P_SALUD: {
        title: "Proximidad hospitales",
        subtitle: "Distancia en metros con factor de inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 12982</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía San José de Cúcuta, Alcaldía de Villa del Rosario",
    }, 
    P_EDU: {
        title: "Proximidad equipamientos educativos",
        subtitle: "Distancia en metros con factor de inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 150</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>151 - 300</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>301 - 500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>501 - 1500</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>1501 - 3012</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía San José de Cúcuta, Alcaldía de Villa del Rosario",
    }, 
    P_BIB: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Distancia en metros con factor de inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 12269</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía San José de Cúcuta, Alcaldía de Villa del Rosario",
    }, 
    P_EP: {
        title: "Proximidad espacio público",
        subtitle: "Distancia en metros con factor de inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 150</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>151 - 500</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>501 - 1000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1001 - 2000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>2001 - 6747</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía San José de Cúcuta, Alcaldía de Villa del Rosario",
    }, 
    P_COMSER: {
        title: "Proximidad zonas de interés económico (servicios y comercio)",
        subtitle: "Distancia en metros con factor de inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 300</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>301 - 500</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>501 - 1000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1001 - 2000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>2001 - 3949</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    E_INFOR: {
        title: "Empleo informal estricto",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 0.85</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.86 - 2.98</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>2.99 - 5.10</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>5.11 - 9.63</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>9.64 - 100.00</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DEP_ECONO: {
        title: "Dependencia económica",
        subtitle: "Población/Población ocupada",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 1.56</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.57 - 2.31</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>2.32 - 3.09</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3.10 - 3.60</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3.61 - 48.00</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
}

var indi = L.geoJson(Manzana, {
    style: legends.DENSIDAD,
}).addTo(map);

var currentStyle = 'DENSIDAD';

manzanas = L.geoJson(Manzana, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


function setProColor(d) {
    if (currentStyle === 'VIV_ADE') {
        return d > 85 ? '#1a9641' :
            d > 65 ? '#a6d96a' :
                d > 35 ? '#f4f466' :
                    d > 15 ? '#fdae61' :
                        '#d7191c';
    }else if (currentStyle === 'AGUA_MEJOR') {
        return d > 80 ? '#1a9641' :
            d > 60 ? '#a6d96a' :
                d > 40 ? '#f4f466' :
                    d > 20 ? '#fdae61' :
                        '#d7191c';
    } 
    else if (currentStyle === 'SANEAMIENT') {
        return d > 80 ? '#1a9641' :
            d > 60 ? '#a6d96a' :
                d > 40 ? '#f4f466' :
                    d > 20 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'PRO_A_ESCO') {
        return d > 15 ? '#1a9641' :
            d > 13 ? '#a6d96a' :
                d > 11 ? '#f4f466' :
                    d > 8 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'MIXTICIDAD') {
        return d > 1.05 ? '#1a9641' :
            d > 0.78 ? '#a6d96a' :
                d > 0.53 ? '#f4f466' :
                    d > 0.29 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'DESEM_JUV') {
                        return d > 58 ? '#d7191c' :
                        d > 41 ? '#fdae61' :
                            d > 26 ? '#f4f466' :
                                d > 10 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'INTERNET') {
        return d > 85 ? '#1a9641' :
            d > 51 ? '#a6d96a' :
                d > 32 ? '#f4f466' :
                    d > 13 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'T_DESEMPL') {
        return d > 41 ? '#d7191c' :
                        d > 24 ? '#fdae61' :
                            d > 14 ? '#f4f466' :
                                d > 6 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'PM10') {
        return d > 33 ? '#d7191c' :
            d > 30 ? '#fdae61' :
                d > 27 ? '#f4f466' :
                    d > 24 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MAX_RANGO') {
        return d > 11 ? '#d7191c' :
            d > 8 ? '#fdae61' :
                d > 5 ? '#f4f466' :
                    d > 2 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'HURTOS') {
        return d > 435 ? '#d7191c' :
            d > 270 ? '#fdae61' :
                d > 179 ? '#f4f466' :
                    d > 107 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'HOMICIDIOS') {
        return d > 23 ? '#d7191c' :
            d > 18 ? '#fdae61' :
                d > 15 ? '#f4f466' :
                    d > 10 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'ESTRATO') {
        return d > 5 ? '#1a9641':
            d > 4 ? '#82E0AA'  :
            d > 3 ? '#a6d96a'  :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#fdae61' :
                    d > 0 ? '#d7191c':
                    '#c3bfc2';
    }
    else if (currentStyle === 'VENEZOLANO') {
        return d > 100 ? '#d7191c' :
            d > 77 ? '#fdae61' :
                d > 25 ? '#f4f466' :
                    d > 5 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MIX_ETNIAS') {
        return d > 0.24 ? '#1a9641' :
            d > 0.14 ? '#a6d96a' :
                d > 0.08 ? '#f4f466' :
                    d > 0.02 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDU') {
        return d > 1.55 ? '#1a9641' :
            d > 1.33 ? '#a6d96a' :
                d > 1.07 ? '#f4f466' :
                    d > 0.46 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EST') {
        return d > 0.77 ? '#1a9641' :
            d > 0.54 ? '#a6d96a' :
                d > 0.33 ? '#f4f466' :
                    d > 0.12 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDAD') {
        return d > 1.50 ? '#1a9641' :
            d > 1.38 ? '#a6d96a' :
                d > 1.17 ? '#f4f466' :
                    d > 0.50 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DENSIDAD') {
        return d > 400 ? '#d7191c' :
        d > 300? '#fdae61' :
            d > 200 ? '#f4f466' :
                d > 149 ? '#1a9641' :
                '#a6d96a';
    }
    else if (currentStyle === 'INDICE') {
        return d > 71.12 ? '#FCF9BB' :
            d > 66.29 ? '#FE9D6C' :
                d > 60.88 ? '#CA3E72' :
                    d > 53.28 ? '#862781' :
                    '#2A115C';
    }
    else if (currentStyle === 'ELECTRICI') {
        return d > 97 ? '#1a9641' :
             d > 89 ? '#a6d96a' :
                 d > 73 ? '#f4f466' :
                     d > 43 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'HACINAMI') {
        return d > 80 ? '#1a9641' :
             d > 70 ? '#a6d96a' :
                 d > 60 ? '#f4f466' :
                     d > 50 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'CON_SOL') {
        return d > 80 ? '#d7191c' :
             d > 60 ? '#fdae61' :
                 d > 40 ? '#f4f466' :
                     d > 20 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'E_VIDA') {
        return d > 73 ? '#1a9641' :
             d > 71 ? '#a6d96a' :
                 d > 69 ? '#f4f466' :
                     d > 67 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'B_E_VIDA') {
            return d > 1.13 ? '#fdae61' :
                    d > 1.09 ? '#f4f466' :
                        d > 1.04 ? '#a6d96a' :
                            d > 0.99 ? '#1a9641' :
                            '#d7191c';
    }
    else if (currentStyle === 'PARIDAD') {
        return d > 1.91 ? '#fdae61' :
                d > 1.20 ? '#f4f466' :
                    d > 1.06 ? '#a6d96a' :
                        d > 0.90 ? '#1a9641' :
                        '#d7191c';
    }
    else if (currentStyle === 'M2_ESP_PU') {
        return d > 2.28 ? '#1a9641' :
            d > 0.84 ? '#a6d96a' :
                d > 0.26 ? '#f4f466' :
                    d > 0.20 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'D_COM_SER') {
        return d > 632 ? '#d7191c' :
                d > 398 ? '#fdae61' :
                    d > 260 ? '#f4f466' :
                        d > 147 ? '#a6d96a' :
                       '#1a9641';
    }
    else if (currentStyle === 'EMPLEO') {
        return d > 62 ? '#1a9641' :
            d > 52 ? '#a6d96a' :
                d > 45 ? '#f4f466' :
                    d > 35 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'BRECHA_D') {
        return d > 4.71 ? '#fdae61' :
            d > 2.56 ? '#f4f466' :
                d > 1.54 ? '#a6d96a' :
                    d > 0.99 ? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'P_SALUD1') {
        return d > 5000 ? '#d7191c' :
                d > 3000 ? '#fdae61' :
                    d > 1000 ? '#f4f466' :
                        d > 500 ? '#a6d96a' :
                       '#1a9641';
    }
    else if (currentStyle === 'P_SALUD') {
        return d > 5000 ? '#d7191c' :
                d > 3000 ? '#fdae61' :
                    d > 1000 ? '#f4f466' :
                        d > 500 ? '#a6d96a' :
                       '#1a9641';
    }
    else if (currentStyle === 'P_EDU') {
        return d > 1500 ? '#d7191c' :
                d > 500 ? '#fdae61' :
                    d > 300 ? '#f4f466' :
                        d > 150 ? '#a6d96a' :
                       '#1a9641';
    }
    else if (currentStyle === 'P_BIB') {
        return d > 5000 ? '#d7191c' :
                d > 3000 ? '#fdae61' :
                    d > 1000 ? '#f4f466' :
                        d > 500 ? '#a6d96a' :
                       '#1a9641';
    }
    else if (currentStyle === 'P_EP') {
        return d > 2000 ? '#d7191c' :
                d > 1000 ? '#fdae61' :
                    d > 500 ? '#f4f466' :
                        d > 150 ? '#a6d96a' :
                       '#1a9641';
    }
    else if (currentStyle === 'P_COMSER') {
        return d > 2000 ? '#d7191c' :
                d > 1000 ? '#fdae61' :
                    d > 500 ? '#f4f466' :
                        d > 300 ? '#a6d96a' :
                       '#1a9641';
    }
    else if (currentStyle === 'E_INFOR') {
        return d > 9.63 ? '#d7191c' :
        d > 5.10 ? '#fdae61' :
            d > 2.98 ? '#f4f466' :
                d > 0.85 ? '#a6d96a':
                '#1a9641';
    }
    else if (currentStyle === 'DEP_ECONO') {
        return d > 3.60 ? '#d7191c' :
                        d > 3.09 ? '#fdae61' :
                            d > 2.31 ? '#f4f466' :
                                d > 1.56 ? '#a6d96a':
                                '#1a9641';
    }
    else {
        return d > 4 ? '#d7191c' :
            d > 3 ? '#fdae61' :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#a6d96a' :
                         d > 0 ? '#1a9641':
                         '#c3bfc2';
    }

}

function fillColor(feature) {
    return {
        fillColor:  setProColor(feature.properties[currentStyle]),
        weight: 0.6,
        opacity: 0.1,
        color: (currentStyle) ? '#ffffff00' : '#c3bfc2', 
        fillOpacity: (currentStyle) ? 0.9 : 0.5,
    };
}

function changeIndi(style) {
    currentStyle = style.value;
    indi.setStyle(fillColor);
    changeLegend((style.value && legends[style.value]) ? legends[style.value] :
        {
            
        });
}

var baseMaps = {
    'Esri Satellite': esriAerial,
    'Open Street Map': opens

};

// Defines the overlay maps. For now this variable is empty, because we haven't created any overlay layers
var overlayMaps = {
    //'Comunas': comu,
    //'Límite fronterizo con Venezuela': lim
};

// Adds a Leaflet layer control, using basemaps and overlay maps defined above
var layersControl = new L.Control.Layers(baseMaps, overlayMaps, {
    collapsed: true,
});
map.addControl(layersControl);
changeIndi({value: 'DENSIDAD'});

function popupText(feature, layer) {
    layer.bindPopup(feature.properties.MUN + '<br />')
}

function popupText1(feature, layer) {
    layer.bindPopup('<strong>Límite fronterizo <br /> con Venezuela</strong>')
}
