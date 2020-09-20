// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// module
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/calendar';

// component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateService } from './services/translate.service';
import { AddBookingComponent } from './components/add-booking/add-booking/add-booking.component';
// Pipes
import { TranslatePipe } from './pipes/translate.pipe';
import { LoginComponent } from './components/header/login/login.component';
import { ListBookingsComponent } from './components/list-bookings/list-bookings.component';


export function translateFactory(provider: TranslateService){
 return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TranslatePipe,
    AddBookingComponent,
    LoginComponent,
    ListBookingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory ,
      deps: [TranslateService],
      multi: true
    }
  ],
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
