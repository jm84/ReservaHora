import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bookins } from '../models/bookins';
import { Observable } from 'rxjs';
import { IBooking } from '../interfaces/ibooking';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookings(): Observable<IBooking[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json' );

    const url = 'https://reserva-e5a01.firebaseio.com/booking.json';
    return this.http.get<IBooking[]>(url,{ headers:headers }).pipe(
      map( data =>{
        let bookings = [];
        if (data) {
          const today = new Date();
          _.forEach(_.keys(data), key => {
            const booking = new Bookins(data[key]);
            const bookingDate = new Date(booking.date);
            if (bookingDate.getTime() >= today.getTime()) {
              
              bookings.push(booking);
            }

          });
          bookings = _.orderBy(bookings, b=> b.date);
          return bookings;
        }

      })
    )
  }

  addBooking(booking : Bookins){

    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json' );

    const url = 'https://reserva-e5a01.firebaseio.com/booking.json';

    const body = JSON.stringify(booking.getData());

    return this.http.post(url, body, {headers: headers});
  }
}
