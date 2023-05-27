import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { API_KEY } from 'src/env';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  protected mapIsReady!: Observable<boolean>

  @ViewChild(GoogleMap) protected theMap!: GoogleMap
  @ViewChild(MapInfoWindow) protected infoWindow!: MapInfoWindow
  @ViewChild(MapMarker) protected googleMapMarker!: MapMarker

  options: google.maps.MapOptions = {
    center: {lat: 37.774546, lng: -122.433523},
    zoom: 15
  }
  markerPos?: google.maps.LatLng

  heatMapOptions: google.maps.visualization.HeatmapLayerOptions = {
    radius: 20
  }
  heatMapData = new BehaviorSubject<google.maps.visualization.WeightedLocation[]>([])

  tempData: any
  

  
  constructor (private httpClient: HttpClient) {
    this.mapIsReady = this.httpClient.jsonp(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=visualization`,
      'callback').pipe(
      map(() => {
        import('../fake-heatmap').then(m => {
          this.heatMapData.next(m.generateHeatMapData(100,37.774546,-122.433523,5))
        })
        return true
      }),
      catchError(() => of(false))
    );
    this.heatMapData.subscribe(x=> x.forEach(loc => console.log(loc.location?.lat(),loc.location?.lng())))
  }

  setMarker(event: google.maps.MapMouseEvent) {
    this.markerPos = event.latLng!
    setTimeout(() => this.infoWindow.open(this.googleMapMarker),1000)
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker)   
  }
}