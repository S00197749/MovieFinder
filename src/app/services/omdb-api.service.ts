import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOMDBResponse } from '../omdbresponse';
import { catchError, tap }from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class OmdbApiService {

  private _siteURL ="https://www.omdbapi.com/";
  private _key="?apikey=72bb3e34&t=";

  constructor(private _http:HttpClient) { }

  getMovieData(movieName): Observable<IOMDBResponse>{
    return this._http.get<IOMDBResponse>(this._siteURL + this._key + movieName)
    .pipe(
      tap(data => console.log('Moviedata/error' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    
    );
  }

  private handleError(err:HttpErrorResponse){
    console.log('OmdbApiService: ' + err.message);
    return Observable.throw(err.message);
  }
}
