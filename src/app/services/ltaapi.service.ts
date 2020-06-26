import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import {AppSettings} from 'src/app/common/app-settings';

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
export class LtaapiService {

  constructor(private http: HttpClient) { }

  // get traffic incidents
  getTrafficIncidents() {

    // get response here
    return this.http.get("ltaodataservice/TrafficIncidents", httpOptions).pipe(catchError(this.handleError));
  }

  // error handling here
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
