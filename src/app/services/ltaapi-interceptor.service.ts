import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';

// query here
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LtaapiInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    // clear markers here
    $(".leaflet-marker-icon").remove();
    $(".leaflet-popup").remove();
    $(".leaflet-marker-shadow").remove();

    //
    return next.handle(req);
  }
}