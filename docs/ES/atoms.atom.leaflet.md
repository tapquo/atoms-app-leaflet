## Atom.Leaflet
Es el elemento básico de esta extensión, en este átomo encontrarás todas las funcionalidades necesarias para crear y gestionar un mapa. Dispones de atributos para definir el tamaño del mapa asi como de métodos y eventos que te facilitarán el trabajo con la libreria Leaflet de OpenStreetMaps

### Attributes
```
id    : [REQUIRED]
style : small|big [OPTIONAL]
```

### Methods
#### .center()
Este método sirve para centrar un mapa en una determinada latitud y longitud, además podemos establecer un nivel de zoom (1 minimo, 16 máximo).

**Parameters**

```
position : Object {latitude, longitude}
zoom     : Number (1 to 16) [OPTIONAL]
```
**Example**

```
gmap_instance.center({latitude: 43.25, longitude:  -2.92}, 7);
```

#### .zoom()
Este método sirve para establecer el zoom del mapa (1 minimo, 16 máximo).

**Parameters**

```
level:  Number (1 to 16) [OPTIONAL]
```
**Example**

```
gmap_instance.zoom(5);
```

#### .query()
Este método sirve para buscar puntos localizados utilizando el servicio de geoposición de Google. Debes utilizar una cadena de texto como elemento de búsqueda, el retorno se devuelve mediante el evento `query` y contiene un array de resultados.

**Parameters**

```
value:  String
```
**Example**

```
var bilbao = gmap_instance.query("Bilbao, ES");
```

**Return**

```
address  : String
type     : String
location : Object {latitude, longitude}
```

#### .marker()
Este método sirve para representar un *"pushpin"* en el mapa, debes indicar su latitud y longitud además de que en el caso de que lo necesites modificar el icono por defecto que ofrece este servicio. En este método existe un atributo opcion, `id`, el cual activará el evento `marker` que se instanciará cuando pulsemos sobre el marker creado.

**Parameters**

```
latitude : Number
longitude: Number
icon     : Object {url, size_x, size_y, anchor_x, anchor_y} [OPTIONAL]
id       : String [OPTIONAL]
```
**Example**

```
gmap_instance.marker({
  latitude : 43.25, 
  longitude:  -2.92,
  id       : "02934asdasd930111"
});
```

#### .clean()
Este método sirve para resetear la instancia del mapa actual.
**Example**

```
gmap_instance.clean();
```

### Events

#### onLeafletTouch
Este método se desplegará cuando pulsemos sobre el mapa. Devuelve como resultado un objeto con los atributos `latitude` y `longitude`.

#### onLeafletQuery
Este método se desplegará cuando el método `query` devuelva resultados.

#### onLeafletMarker
Este método se desplegará cuando pulsemos sobre un determinado `marker`, devolviendo el `id` del mismo.