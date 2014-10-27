###
@TODO

@namespace Atoms.Atom
@class Leaflet

@author Julen Garcia Leunda @hicom150
###
"use strict"

class Atoms.Atom.Leaflet extends Atoms.Class.Atom

  @version  : "1.0.1"

  @template : """
    <div id="{{id}}" {{#if.style}}class="{{style}}"{{/if.style}}>
      <span class="icon loading-config"></span>
    </div>"""

  @base     : "Leaflet"

  @events   : ["touch", "query", "marker"]

  @default  :
    id: "leaflet"

  _map      : null
  _markers  : []
  _query    : []
  _tileUrl  : "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  output: ->
    super
    console.log "leaflet", @attributes.id
    if Atoms.$("[data-extension=leaflet]").length > 0 and L?
      do @__init
    else
      url = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet"
      Hope.chain([ =>
        Atoms.resource "leaflet", "link", "#{url}.css"
      , =>
        Atoms.resource "leaflet", "script", "#{url}.js"
      ]).then (error, value) =>
        unless error
          do @__init
        else
          console.error "Atoms.App.Leaflet error loading resources"

  # Methods Instance
  center: (position, zoom_level = 8) ->
    latLng = L?.latLng position.latitude, position.longitude
    @_map.setView latLng, zoom_level

  zoom: (level) ->
    @_map.setZoom level

  query: (value) ->
    @_query = []
    __geocode(value).then (error, results) =>
      @_query = (__parseAddress result for result in results)
      @bubble "query", @_query
    true

  marker: (attributes) ->
    latLng = L?.latLng attributes.latitude, attributes.longitude
    markerOptions =
      icon      : __markerIcon attributes.icon
      clickable : true
      id        : attributes.id
    marker = new L?.marker latLng, markerOptions
    @_map.addLayer marker
    if attributes.id
      marker.on "click", (event) => @bubble "marker", id: event.target.options.id
    @_markers.push marker
    true

  clean: ->
    @_map.removeLayer marker for marker in @_markers
    @_markers = []

  # Privates
  __init: =>
    mapOptions =
      center     : [43.256963, -2.923441]
      zoom       : 1
      zoomControl: false
    tileUrl = @attributes.tile ? @_tileUrl
    tileOptions =
      attribution: '&copy;
        <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    @_map = L?.map @attributes.id, mapOptions
    L?.tileLayer(tileUrl, tileOptions).addTo(@_map)

    if "touch" in (@attributes.events or [])
      @_map.on "click", (e) =>
        @bubble "touch", latitude: e.latlng.lat, longitude: e.latlng.lng

# ==============================================================================
__markerIcon = (icon) ->
  if icon
    iconOptions =
      iconUrl   : icon.url
      iconSize  : [icon.size_x, icon.size_y]
      iconAnchor: [icon.anchor_x, icon.anchor_y]
    L?.icon iconOptions
  else
    new L?.Icon.Default()

__queryPlace = (value) ->
  if value.latitude? and value.longitude?
    value = L?.latLng value.latitude, value.longitude
  else
    value = null
  value

__parseAddress = (address) ->
  address : address.display_name
  type    : address.type
  position:
    latitude  : address.lat
    longitude : address.lon

__geocode = (value) ->
  promise = new Hope.Promise()
  ajax = $$.ajax or $.ajax
  ajax
    url     : "http://nominatim.openstreetmap.org/search"
    data    : {q:value, format:'json'}
    success : (response) =>
      promise.done null, response
    error   : (response, error) =>
      promise.done error, null
  promise
