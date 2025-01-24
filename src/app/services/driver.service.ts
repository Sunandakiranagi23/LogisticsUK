import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';
import { Driver, ResponseData } from '../models/drivers.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private readonly url: string = 'assets/data/drivers.json';

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    return this.http
      .get<ResponseData>(this.url)
      .pipe(map((response: ResponseData) => response.data));
  }
}
