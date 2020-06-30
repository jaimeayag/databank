import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';
import { AppSettings } from 'src/app/common/app-settings';

// query here
declare var $: any;

// dannel key
//8UkDsWdsRcWd67LAEd6NoQ==

// jaime key
// L6vpRzLNTKe/JWDvdqjYNQ==
const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'AccountKey': 'L6vpRzLNTKe/JWDvdqjYNQ=='
  })
};

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  // variables here
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient, private popupService: PopUpService) {
  }

  static ScaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  // remove markers here
  removeMArkers() {
    // remove markers
    $(".leaflet-marker-icon").remove();
    $(".leaflet-popup").remove();
    $(".leaflet-marker-shadow").remove();
  }

  // get traffic incidents
  genericTrafficMarkers(map: L.map, api_url): void {

    // variables here
    let marker_icon;
    let event_flag;
    let current_loc_marker;

    // set timer here
    switch (api_url) {
      case ("TrafficIncidents"):
        marker_icon = "assets/alert.svg";
        event_flag = false;
        break;
      case ("Taxi-Availability"):
        marker_icon = "assets/taxi.svg";
        event_flag = true;
        break;
      default:
        marker_icon = "assets/marker-icon.png";
        event_flag = false;
        break;
    }

    //
    var marker_option = L.icon({
      iconUrl: marker_icon,
      iconSize: [25, 41]
    });

    // api request here
    this.http.get("ltaodataservice/" + api_url, httpOptions).subscribe((res: any) => {

      // remove markers here
      this.removeMArkers();

      // loop through data here
      for (const c of res.value) {
        const lat = c.Latitude;
        const lon = c.Longitude;
        const marker = L.marker([lat, lon], { icon: marker_option });

        // check event_flag here
        if (event_flag) {
          // add event here
          marker.on('click', this.reverseGeocode, this);
        }

        // check if message is set here (global class - AppSettings)
        if (AppSettings.POPUP_API_URL.indexOf(api_url) > -1) {
          // bind popup here
          marker.bindPopup(this.popupService.trafficIncidentPopup(c, api_url));
        }

        // add to map
        marker.addTo(map);
      }

      // locate current position here
      map.locate({ setView: true, watch: true, maxZoom: 19 }) /* This will return map so you can do chaining */
        .on('locationfound', function (e) {
          var current_loc_marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
          // var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
          //     weight: 1,
          //     color: 'blue',
          //     fillColor: '#cacaca',
          //     fillOpacity: 0.2
          // });
          // map.addLayer(current_loc_marker);
          // map.addLayer(circle);
        })
        .on('locationerror', function (e) {
          // console.log(e);
          // alert("Location access denied.");
        });

    });
  }

  // reverse geocode here
  reverseGeocode(e, map: L.map) {

    // variables here
    var opencage_api = "https://api.opencagedata.com/geocode/v1/json?q=" + e.latlng.lat + "+" + e.latlng.lng + "&key=282637ea31194caa8e7bfa166d0acac8";
    var arcgis_api = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=" + e.latlng.lng + "," + e.latlng.lat;

    var openstreetmap_api = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng + "&zoom=16&addressdetails=1";

    // api request here
    this.http.get(openstreetmap_api).subscribe((res: any) => {

      // variables here
      // var str_location = res.results[0].formatted;
      // var str_location = res.address.Match_addr;

      // openstreet map
      var str_location = res.display_name;

      // var request_remaining = res.rate.remaining;

      // set content here
      $(".popup-content-custom").html(str_location);
      // $(".leaflet-popup-content").css("width", "300px");

    });
  }

  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {

      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]).addTo(map);

        marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        // add it here
        marker.addTo(map);
      }
    });
  }

  makeCapitalCircleMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {

      // Find the maximum population to scale the radii by.
      const maxVal = Math.max(...res.features.map(x => x.properties.population), 0);

      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        // const circle = L.circleMarker([lon, lat]).addTo(map);

        const circle = L.circleMarker([lon, lat],
          {
            radius: MarkerService.ScaledRadius(c.properties.population, maxVal)
          }
        );

        // bind popup here
        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        // add to map here
        circle.addTo(map);
      }
    });
  }
}
