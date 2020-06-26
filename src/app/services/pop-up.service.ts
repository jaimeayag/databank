import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/common/app-settings';


@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  // this is test ()
  makeCapitalPopup(data: any): string {
    return '' +
      '<div>Capital: ' + data.name + '</div>' +
      '<div>State: ' + data.state + '</div>' +
      '<div>Population: ' + data.population + '</div>';
  }

  // traffic incident here
  trafficIncidentPopup(data: any, api_url): string {

    // variables here
    let html = "";
    let popup_message = "";

    //
    // console.log(data);

    // check if message is set here (global class - AppSettings)
    if (AppSettings.POPUP_API_URL.indexOf(api_url) > -1) {

      // check url here
      if (api_url == "TrafficIncidents") {
        // append here
        html = html.concat('<div class="popup-message" style="padding-bottom: 10px;">' + data.Message + '</div>');
        html = html.concat('<div>Type: ' + data.Type + '</div>');
        // html = html.concat('<div>Latitude: ' + data.Latitude + '</div>');
        // html = html.concat('<div>Longitude: ' + data.Longitude + '</div>');
      }

      // check url here
      if (api_url == "Taxi-Availability") {
        // append here
        // html = html.concat('<div>Latitude: ' + data.Latitude + '</div>');
        // html = html.concat('<div>Longitude: ' + data.Longitude + '</div>');
        html = html.concat('<div class="popup-content-custom" style="width: 250px; min-height: 22px;">Loading...</div>');
      }
    }

    return html;
  }
}
