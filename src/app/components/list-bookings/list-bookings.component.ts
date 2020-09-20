import { Component, OnInit } from '@angular/core';
import { Bookins } from '../../models/bookins';
import { BookingService } from '../../services/booking.service';
import { IBooking } from '../../interfaces/ibooking';
import { error } from 'protractor';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {

  public listBookins: IBooking[];
  public laodgBookings: boolean;
  constructor(
    private bookingService: BookingService,
    private authService:AuthService,
    private router:Router
  ) { 
    this.listBookins = [];
    this.laodgBookings = false;
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.bookingService.getBookings().subscribe(list=>{
        
        this.listBookins = list;
        this.laodgBookings = true;
      }, error =>{
        console.log("No se ha podido recuperar las reservas: "+ error);
        this.laodgBookings = true;
      })
      
    }else{
      this.router.navigate(['/add-booking']);
      
    }
  }

}
