import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {icon, latLng, Map, MapOptions, Marker, marker, MarkerClusterGroup, markerClusterGroup, tileLayer} from 'leaflet';
import {ILatLng} from '../models/latlng.model';
import {IData} from '../models/data.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() markerClusterData: IData[];
  @Input() selectedData: IData;
  @Output() latLng = new EventEmitter<ILatLng>();
  map: Map;
  mapOptions: MapOptions;
  markerClusterGroup: MarkerClusterGroup;
  markerIcon = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };
  myMarker: any;
  markerGroup = new MarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false
  });
  markerClusterOptions: L.MarkerClusterGroupOptions;
  constructor() { }

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  onMapReady(map: Map): void {
    this.map = map;
  }

  markerClusterReady(group: MarkerClusterGroup): void {
    this.markerClusterGroup = group;

  }

  private initializeMapOptions(): void {
    this.markerClusterGroup = markerClusterGroup({removeOutsideVisibleBounds: true});
    this.mapOptions = {
      center: latLng(51.505, 0),
      zoom: 3,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedData) {
      this.clearMarker();
      this.addMarker(this.selectedData);
      this.flyToMarker(this.selectedData);
    }

    if (changes['markerClusterData'] && changes['markerClusterData'].previousValue != changes['markerClusterData'].currentValue ){
      this.generateClusters(this.markerClusterData);
    }
  }
  clearMarker(): void {
    if(this.myMarker){
      this.map.removeLayer(this.myMarker);
    }

  }
  addMarker(data: IData): void{
    this.myMarker = new Marker([data.Location.Latitude, data.Location.Longitude])
      .setIcon(
        icon({
          iconSize: [0, 0],
          iconAnchor: [0, 0],
          iconUrl: 'assets/marker-icon.png'
        }));
    this.myMarker.addTo(this.map);
  }
  flyToMarker(data: IData): void{
    this.map.flyTo([data.Location.Latitude, data.Location.Longitude], 12);
  }

  generateClusters(data: IData[]): void{
    const clusterData: any[] = [];
    data.forEach(item => {
      clusterData.push(marker([item.Location?.Latitude, item.Location?.Longitude], {icon: this.markerIcon.icon, title: item.position?.toString()}));
    });

    this.markerClusterData = clusterData;
    this.clickWatcher(clusterData);
  }
  clickWatcher(clusterData): void{
    clusterData.forEach(el => {
      el.on('click', (e) => {
          this.latLng.emit({lat: e.latlng.lat, lng: e.latlng.lat, position: Number(e.target.options.title)});
        }
      );
    });
  }
  ngAfterViewInit(): void {

  }
}
