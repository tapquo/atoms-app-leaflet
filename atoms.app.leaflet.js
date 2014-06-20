/* atoms v0.06.20
   http://atoms.tapquo.com
   Copyright (c) 2014 Tapquo S.L. - Licensed MIT */
(function(){"use strict";var __geocode,__loadScript,__markerIcon,__parseAddress,__queryPlace,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Atoms.Atom.Leaflet=function(_super){function Leaflet(){return this.__init=__bind(this.__init,this),Leaflet.__super__.constructor.apply(this,arguments)}return __extends(Leaflet,_super),Leaflet.template='<div id=leaflet {{#if.style}}class="{{style}}"{{/if.style}}></div>',Leaflet.base="Leaflet",Leaflet.events=["query"],Leaflet.prototype._map=null,Leaflet.prototype._markers=[],Leaflet.prototype._query=[],Leaflet.prototype._route=null,Leaflet.prototype.output=function(){var exists;return Leaflet.__super__.output.apply(this,arguments),exists=Atoms.$("[data-extension=leaflet]").length>0,exists?this.__init():__loadScript(this.__init)},Leaflet.prototype.center=function(position,zoom_level){var latLng;return null==zoom_level&&(zoom_level=8),latLng=L.latLng(position.latitude,position.longitude),this._map.setView(latLng,zoom_level)},Leaflet.prototype.zoom=function(level){return this._map.setZoom(level)},Leaflet.prototype.query=function(value){return"string"==typeof value&&(this._query=[],__geocode(value).then(function(_this){return function(error,results){var result;return _this._query=function(){var _i,_len,_results;for(_results=[],_i=0,_len=results.length;_len>_i;_i++)result=results[_i],_results.push(__parseAddress(result));return _results}(),_this.bubble("query",_this._query)}}(this))),!0},Leaflet.prototype.marker=function(position,icon,animate){var latLng,marker,markerOptions;return null==animate&&(animate=!1),latLng=L.latLng(position.latitude,position.longitude),markerOptions={icon:__markerIcon(icon)},marker=new L.marker(latLng,markerOptions),this._map.addLayer(marker),this._markers.push(marker),!0},Leaflet.prototype.clean=function(){var marker,_i,_len,_ref;for(_ref=this._markers,_i=0,_len=_ref.length;_len>_i;_i++)marker=_ref[_i],this._map.removeLayer(marker);return this._markers=[]},Leaflet.prototype.__init=function(){return setTimeout(function(_this){return function(){var mapOptions,tileOptions,tileUrl;return mapOptions={center:[43.256963,-2.923441],zoom:1,zoomControl:!1},tileUrl="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",tileOptions={attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'},_this._map=L.map("leaflet",mapOptions),L.tileLayer(tileUrl,tileOptions).addTo(_this._map)}}(this),1e3)},Leaflet}(Atoms.Class.Atom),__loadScript=function(callback){var script;return window.google={maps:{}},script=document.createElement("script"),script.type="text/javascript",script.src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js",script.setAttribute("data-extension","leaflet"),script.onload=function(){return null!=callback?callback.call(this):void 0},document.body.appendChild(script)},__loadScript(),__markerIcon=function(icon){var iconOptions;return icon?(iconOptions={iconUrl:icon.url,iconSize:[icon.size_x,icon.size_y],iconAnchor:[icon.anchor_x,icon.anchor_y]},L.icon(iconOptions)):new L.Icon.Default},__queryPlace=function(value){return value=null!=value.latitude&&null!=value.longitude?L.latLng(value.latitude,value.longitude):null},__parseAddress=function(address){return{address:address.display_name,type:address.type,position:{latitude:address.lat,longitude:address.lon}}},__geocode=function(value){var promise;return promise=new Hope.Promise,$$.ajax({url:"http://nominatim.openstreetmap.org/search",data:{q:value,format:"json"},success:function(){return function(response){return promise.done(null,response)}}(this),error:function(){return function(response,error){return console.error(error),promise.done(error,null)}}(this)}),promise},Atoms.Organism.Leaflet=function(_super){function Leaflet(){return Leaflet.__super__.constructor.apply(this,arguments)}return __extends(Leaflet,_super),Leaflet["extends"]=!0,Leaflet.template='<section {{#if.id}}id="{{id}}"{{/if.id}}></section>',Leaflet.available=["Atom.Input","Atom.Button","Atom.Leaflet","Molecule.Form"],Leaflet.events=["menu"],Leaflet["default"]={style:"menu form",children:[{"Atom.Leaflet":{id:"instance",events:["query"]}},{"Atom.Button":{icon:"navicon",style:"small"}},{"Molecule.Form":{events:["submit"],children:[{"Atom.Input":{name:"address",placeholder:"Type a address",required:!0}},{"Atom.Button":{icon:"search",text:"Search",style:"fluid accept"}}]}}]},Leaflet.prototype.onFormSubmit=function(event,form){return event.preventDefault(),this.instance.query(form.value().address),!1},Leaflet.prototype.onLeafletQuery=function(places){var zoom;return this.instance.clean(),places.length>0&&(this.instance.marker(places[0].position),this.instance.center(places[0].position,zoom=16)),!1},Leaflet.prototype.onButtonTouch=function(event){return event.preventDefault(),this.bubble("menu",event),!1},Leaflet}(Atoms.Organism.Section)}).call(this);