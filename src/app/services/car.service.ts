import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl = 'http://localhost:3000/cars';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor( private httpClient: HttpClient) { }

  // get all cars 
  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.baseUrl)
    .pipe(
      retry(2), catchError(this.handleError))
  }


  // get car for id
  getCarById(id: number): Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.baseUrl + '/' + id)
    .pipe(retry(2), catchError(this.handleError))
  }

  // save car in api
  saveCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(this.baseUrl, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(2), catchError(this.handleError)
      )
  }

  // update car api 
  updateCar(car: Car): Observable<Car[]> {
    return this.httpClient.put<Car[]>(this.baseUrl + '/' + car.id, JSON.stringify(car), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  // delete car
  deleteCar(car: Car): Observable<Car[]> {
    return this.httpClient.delete<Car[]>(this.baseUrl + '/' + car.id, this.httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  // error manipulation
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      // error client side
      errorMessage = error.error.message;
    } else {
      errorMessage = `Code of error: ${error.status}, ` + `message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
