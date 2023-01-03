import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ReservationDeleteComponent } from './delete/reservation-delete.component';
import { ReservationDetailComponent } from './detail/reservation-detail.component'; 
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [ReservationDetailComponent],
  imports: [CommonModule, FormsModule],
})
export class ReservationModule {}
