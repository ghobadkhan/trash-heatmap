import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface CurrentLocation {
  lat: number,
  lng: number
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  private currentLocation = new Subject<CurrentLocation>()

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.currentLocation.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          this.currentLocation.error(this.handleLocationError(true));
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.currentLocation.error(this.handleLocationError(false));
    }
    return this.currentLocation
  }

  private handleLocationError(
    browserHasGeolocation: boolean
  ) {
    return browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
  }
  
}
