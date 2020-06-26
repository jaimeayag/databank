import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker.service';
import { LtaapiService } from 'src/app/services/ltaapi.service';
import { AppSettings } from 'src/app/common/app-settings';

// jquery here
declare var $: any;

// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// // const iconUrl = 'assets/warning.svg';
// // const iconUrl = 'assets/taxi.svg';
// const shadowUrl = 'assets/marker-shadow.png';

// revised here (C:\Dev\github\angular-workspace\jad\src\assets\images\leaflet\)
const iconRetinaUrl = 'assets/images/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/images/leaflet/marker-icon.png';
// const iconUrl = 'assets/warning.svg';
// const iconUrl = 'assets/taxi.svg';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // variables here
  private map;
  private interval_timer;

  constructor(private markerService: MarkerService, private _ltaapiService: LtaapiService) { }

  ngOnInit(): void {

    // initialize here
    this.initMap();
    // Taxi-Availability / TrafficIncidents
    let default_category = "Taxi-Availability";

    // -------------------------------------------------------------
    // traffic incidents
    // this.markerService.genericTrafficMarkers(this.map, "TrafficIncidents");

    // Taxi-Availability
    this.markerService.genericTrafficMarkers(this.map, "Taxi-Availability");

    // interval here
    this.interval_timer = setInterval(
      () => {
        //
        this.markerService.genericTrafficMarkers(this.map, "Taxi-Availability");
      }
      , AppSettings.TRAFFIC_INCIDENTS_INTERVAL);

    // -------------------------------------------------------------
  }

  // terminate timer here
  terminateTimer() {
    // clear interval here
    clearInterval(this.interval_timer);
  }

  // call from api here
  categorySelect(value) {

    // variables here
    let interval = 5000;

    // terminate timer here
    this.terminateTimer();
    //
    this.markerService.genericTrafficMarkers(this.map, "" + value);

    // set timer here
    switch (value) {
      case ("TrafficIncidents"):
        interval = AppSettings.TRAFFIC_INCIDENTS_INTERVAL;
        break;
      case ("Taxi-Availability"):
        interval = AppSettings.TAXIS_INTERVAL;
        break;
      default:
        interval = 5000;
        break;
    }

    // interval here
    this.interval_timer = setInterval(
      () => {
        //
        this.markerService.genericTrafficMarkers(this.map, "" + value);
      }
      , interval);
  }

  // initialize map here
  private initMap(): void {

    // set center location manually
    // this.map = L.map('map', {
    //   center: [1.3521, 103.8198],
    //   // center: [ 39.8282, -98.5795 ],
    //   zoom: 12
    // });

    // locate current position using location here
    this.map = L.map('map', {
      doubleClickZoom: false,
      // zoom: 11,
      minZoom : 11
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // add to map here
    tiles.addTo(this.map);

    // create html element here
    var legend = L.control({ position: 'topright' });
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = '<select id="category-select"><option value="TrafficIncidents" >Traffic Incidents</option><option value="Taxi-Availability">Available Taxis</option></select>';
      div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
      return div;
    };

    // legend.addTo(this.map);
  }

  // list here
  listTrafficIncidents() {
    this._ltaapiService.getTrafficIncidents().subscribe(

      // render here
      data => {
        // this.obj_entries = data;
        // this.dt_flag = true;
        console.log(data);
      }
    );
  }
}
